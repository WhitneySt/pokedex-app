import React, { useEffect } from "react";
import { Card, Empty, Tag, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  StarOutlined,
  EyeOutlined
} from "@ant-design/icons";
import {
  addPokemonAsync,
  clearSearch,
  errorSync,
  fillAsync,
  selectPokemon,
} from "../redux/actions/actionPokemon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomMenu from "../components/CustomMenu";

const { Meta } = Card;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    pokemons,
    error: favoritesError,
    favorites,
    selected: selectedItem
  } = useSelector((store) => store.pokemonStore);

  useEffect(() => {
    if (!pokemons || pokemons.length === 0) {
      dispatch(fillAsync());
    }
  }, [pokemons, dispatch]);


  const identifyEvolution = (evolutions = [], pokemonName) => {
    const index = evolutions.findIndex(
      (evolution) => evolution.species_name === pokemonName
    );
    return index - 1 < 0
      ? "isn't an evolution"
      : `${evolutions[index - 1].species_name} evolution`;
  };

  const handleFavorites = (pokemonId) => {
    const pokemon = pokemons.find((p) => p.id === pokemonId);
    dispatch(addPokemonAsync(pokemon));
  };

  if (favoritesError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Datos de login incorrectos",
    }).then(() => {
      dispatch(errorSync({ error: undefined }));
    });
  } else {
    if (favoritesError === false) {
      Swal.fire({
        icon: "success",
        title: "Congratulations.",
        text: "Pokemon has been added in the pokeball!",
      }).then(() => {
        dispatch(errorSync({ error: undefined }));
      });
    }
  }

  const isFavorite = (list, pokemonId) => {
    return list && list.find((favorite) => favorite.id === pokemonId)
      ? true
      : false;
  };

  const onSelect = (name) => {
    dispatch(selectPokemon({ name }));
  }

  const onClear = async () => {
    dispatch(clearSearch());
  }

  const renderCards = (selected, list) => {
    let items = list;
    if (selected && selected.length) {
      items = selected;
    }

    return items && items.length ? (
      items.map((item, index) => (
        <Card
          key={index}
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img alt="pokemon" src={item.sprites.front_default || ""} />
          }
          actions={[
            <EyeOutlined
              onClick={() => navigate(`/pokemon/${item.name}`)}
              key="details"
            />,
            <StarOutlined
              style={{ color: isFavorite(favorites, item.id) ? "red" : "" }}
              onClick={() => handleFavorites(item.id)}
              key="favorites"
            />,
          ]}
        >
          <Meta
            title={
              <span style={{ textTransform: "capitalize" }}>
                {`${item.name} #${item.id}`}
              </span>
            }
            description={
              <>
                <p>
                  {item.evolutions && item.evolutions.length
                    ? identifyEvolution(item.evolutions, item.name)
                    : ""}
                </p>
                <p>
                  Types: {item.types.map((item, index) => (
                    <Tag key={index}>{item.type.name}</Tag>
                  ))}
                </p>
              </>
            }
          />
        </Card>
      ))
    ) : (
      <Empty />
    )
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em", margin: '1em' }}>
      <CustomMenu selectedItem={"1"} />
      <div style={{ margin: '1em' }}>
        <AutoComplete
          onClear={onClear}
          allowClear
          filterOption
          options={pokemons && pokemons.length ? pokemons.map(p => ({
            label: p.name,
            value: p.name
          })) : []}
          style={{
            width: 400,
          }}
          onSelect={onSelect}
          placeholder="Search"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 10,
          margin: 10,
        }}
      >
        {renderCards(selectedItem, pokemons)}
      </div>
    </div>
  );
};

export default Home;
