import React, { useEffect, useState } from "react";
import { Button, Avatar, Tooltip, Card, Empty, Drawer, Menu, Tag, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutAsyn } from "../redux/actions/actionLogin";
import {
  UserOutlined,
  StarOutlined,
  EyeOutlined,
  LogoutOutlined,
  AliwangwangOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { actionClearSync } from "../redux/actions/actionRegister";
import {
  addPokemonAsync,
  clearSearch,
  errorSync,
  fillAsync,
  selectPokemon,
} from "../redux/actions/actionPokemon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const { displayName } = useSelector((store) => store.loginStore);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!pokemons || pokemons.length === 0) {
      loadPokemons()
    }
  }, [pokemons]);

  const loadPokemons = async () => {
    dispatch(fillAsync());
  };

  const onClick = () => {
    dispatch(actionLogoutAsyn());
    dispatch(actionClearSync());
  };

  const identifyEvolution = (evolutions = [], pokemonName) => {
    const index = evolutions.findIndex(
      (evolution) => evolution.species_name === pokemonName
    );
    return index - 1 < 0
      ? "isn't an evolution"
      : `${evolutions[index - 1].species_name} evolution`;
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

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

  const items = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Profile", "2", <UserOutlined />),
    getItem("Poke ball", "3", <AliwangwangOutlined />),
    getItem("Logout", "4", <LogoutOutlined />),
  ];

  const onSelect = (name) => {
    dispatch(selectPokemon({ name }));
  }

  const onClear = async () => {
    dispatch(clearSearch());
  }

  const onChange = (value) => {
    // if (!value || value === '' || value.trim() === '') {
    //   loadPokemons();
    // }
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Drawer
        title={`Hi, ${displayName}!`}
        placement={"left"}
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        key={"left"}
      >
        <Menu
          onClick={(e) => {
            const key = parseInt(e.key);
            if (key === 1) {
              navigate("/home");
            }

            if (key === 3) {
              navigate("/pokeball");
            }

            if (key === 4) {
              dispatch(actionLogoutAsyn());
              dispatch(actionClearSync());
            }
          }}
          style={{ width: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Drawer>
      <div style={{ display: "flex", justifyContent: "space-between", margin: '1em' }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip title="user" color="#2BE7E8">
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => setDrawerVisible(true)}
            >
              <Avatar icon={<UserOutlined />} />
            </Button>
          </Tooltip>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Hi!</span>
            <span>{displayName}</span>
          </div>
        </div>
      </div>
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
          onChange={onChange}
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
