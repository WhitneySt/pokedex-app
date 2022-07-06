import React, { useEffect, useState } from "react";
import { Button, Avatar, Tooltip, Card, Empty, Drawer, Menu } from "antd";
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
  errorSync,
  fillAsync,
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
  } = useSelector((store) => store.pokemonStore);
  const { displayName } = useSelector((store) => store.loginStore);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (!pokemons || pokemons.length === 0) {
      loadPokemons();
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

  const isFavorite = (pokemonId) => {
    return favorites.find((favorite) => favorite.id === pokemonId)
      ? true
      : false;
  };

  const items = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Profile", "2", <UserOutlined />),
    getItem("Poke ball", "3", <AliwangwangOutlined />),
    getItem("Logout", "4", <LogoutOutlined />),
  ];

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 10,
          margin: 10,
        }}
      >
        {pokemons && pokemons.length ? (
          pokemons.map((item, index) => (
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
                  style={{ color: isFavorite(item.id) ? "red" : "" }}
                  onClick={() => handleFavorites(item.id)}
                  key="favorites"
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

export default Home;
