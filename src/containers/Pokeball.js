import React, { useEffect, useState } from "react";
import { Button, Avatar, Tooltip, Card, Empty, Drawer, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutAsyn } from "../redux/actions/actionLogin";
import {
  UserOutlined,
  EyeOutlined,
  LogoutOutlined,
  AliwangwangOutlined,
  HomeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { actionClearSync } from "../redux/actions/actionRegister";
import {
  deletePokemonAsync,
  fillFavoritesAsync,
} from "../redux/actions/actionPokemon";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { Meta } = Card;

const Pokeball = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: favoritesError, favorites } = useSelector(
    (store) => store.pokemonStore
  );
  const { displayName } = useSelector((store) => store.loginStore);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      loadPokeball();
    }
  }, [favorites]);

  const loadPokeball = async () => {
    dispatch(fillFavoritesAsync());
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
