import React, { useEffect } from "react";
import { Card, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  deletePokemonAsync,
  fillFavoritesAsync,
} from "../redux/actions/actionPokemon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomMenu from "../components/CustomMenu";

const { Meta } = Card;

const Pokeball = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector(
    (store) => store.pokemonStore
  );

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      dispatch(fillFavoritesAsync());
    }
  }, [favorites, dispatch]);

  const identifyEvolution = (evolutions = [], pokemonName) => {
    const index = evolutions.findIndex(
      (evolution) => evolution.species_name === pokemonName
    );
    return index - 1 < 0
      ? "isn't an evolution"
      : `${evolutions[index - 1].species_name} evolution`;
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em", margin: "1em" }}>
      <CustomMenu selectedItem={"2"} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 10,
          margin: 10,
        }}
      >
        {favorites && favorites.length ? (
          favorites.map((item, index) => (
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
                  onClick={() => navigate(`/pokemon/${item.name}/view`)}
                  key="details"
                />,
                <EditOutlined key={'edit'} onClick={() => navigate(`/pokemon/${item.name}/edit`)} />,
                <DeleteOutlined
                  onClick={() => {
                    Swal.fire({
                      title: "Do you want to leave free this pokemon?",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deletePokemonAsync({ id: item.firestoreId }));
                        Swal.fire("Pokemon released!", "", "success");
                      }
                    });
                  }}
                  key="remove"
                />,
              ]}
            >
              <Meta
                title={
                  <span style={{ textTransform: "capitalize" }}>
                    {item.name}
                  </span>
                }
                description={
                  item.evolutions && item.evolutions.length
                    ? identifyEvolution(item.evolutions, item.name)
                    : ""
                }
              />
            </Card>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default Pokeball;
