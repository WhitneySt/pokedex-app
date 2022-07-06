import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Modal, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const Details = () => {
  const styles = {
    container: {
      margin: "3em",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    h2: {
      textTransform: "capitalize",
    },
    input: {
        border: 'none'
    }
  };

  const navigate = useNavigate();
  const { name } = useParams();
  const { pokemons } = useSelector((store) => store.pokemonStore);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const pokemon = pokemons.find((p) => p.name === name);
  const abilities = pokemon.abilities.map(({ ability }) => ability.name).join();

  const getEvolutionImages = (currentPokemon, allPokemons) => {
    if (!currentPokemon || !currentPokemon.evolutions) return null;

    const index = currentPokemon.evolutions.findIndex(
      (pe) => pe.species_name === currentPokemon.name
    );

    if (index < 0) return null;

    const numberOfEvolutions = currentPokemon.evolutions.length - 1 - index;

    if (numberOfEvolutions === 0) return null;

    const nextEvolution = currentPokemon.evolutions[index + 1];
    if (nextEvolution) {
      const nextEvolutionFound = allPokemons.find(
        (p) => p.name === nextEvolution.species_name
      );
      if (!nextEvolutionFound) return null;

      return {
        currentPokemonImage: pokemon.sprites.front_default,
        nextEvolutionImage: nextEvolutionFound.sprites.front_default,
        nextEvolutionName: nextEvolutionFound.name,
      };
    }
  };

  const evolution = getEvolutionImages(pokemon, pokemons);

  const renderDetailsModal = () => {
    return (
      <Modal
        closable={false}
        title={<h2 style={styles.h2}>{`${pokemon.name ? pokemon.name : ""} #${pokemon.id}`}</h2>}
        visible={isModalVisible}
        footer={<Button onClick={() => navigate(-1)}>Back</Button>}
      >
        <div>
          <h2>Profile</h2>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              height: pokemon.height,
              weight: pokemon.weight,
              abilities,
            }}
          >
            <Form.Item label="Height" name="height">
              <Input style={styles.input} readOnly />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input style={styles.input} readOnly />
            </Form.Item>
            <Form.Item label="Abilities" name="abilities">
              <Input style={{ ...styles.input, textTransform: 'capitalize' }} readOnly />
            </Form.Item>
          </Form>
        </div>
        {evolution ? (
          <div>
            <h2 style={styles.h2}>Evolves to {evolution.nextEvolutionName}</h2>
            <img src={evolution.currentPokemonImage} alt="" />
            <ArrowRightOutlined />
            <img src={evolution.nextEvolutionImage} alt="" />
          </div>
        ) : (
          <div>
            <h2 style={styles.h2}>Last Evolution</h2>
            <img src={pokemon.sprites.front_default} alt="" />
          </div>
        )}
      </Modal>
    );
  };

  return <div style={styles.container}>{renderDetailsModal()}</div>;
};

export default Details;
