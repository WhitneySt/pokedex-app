import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Modal, Button, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getPokemonByNameFromDatabase } from "../modules/helpers";
import { fillAbilitiesAsync, updatePokemonAsync } from "../redux/actions/actionPokemon";

const { Option } = Select;

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

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, action } = useParams();
  const { pokemons, abilities, favorites } = useSelector((store) => store.pokemonStore);
  const [isModalVisible] = useState(true);
  const [canEdit] = useState(action === 'edit' ? true : false);

  let pokemon = null;
  if (action) {
    pokemon = favorites.find((f) => f.name === name);
  } else {
    pokemon = pokemons.find((p) => p.name === name);
  }

  const pokemonAbilities = pokemon.abilities.map(({ ability }) => ({ name: ability.name, url: ability.url }));

  const [height, setHeight] = useState(pokemon.height);
  const [weight, setWeight] = useState(pokemon.weight);
  const [selectedAbilities, setSelectedAbilities] = useState(pokemonAbilities);

  useEffect(() => {
    if (abilities.length === 0) {
      getAbilities();
    }
  }, [abilities]);

  const getAbilities = async () => {
    try {
      dispatch(fillAbilitiesAsync());
    } catch (error) {
      console.log(error);
    }
  }

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
        footer={
          <>
            <Button onClick={() => navigate(-1)}>Back</Button>
            {canEdit && (
              <Button onClick={async () => {
                const dbPokemon = await getPokemonByNameFromDatabase(pokemon.name);
                dispatch(updatePokemonAsync({
                  firestoreId: dbPokemon.firestoreId,
                  height: parseInt(height),
                  weight: parseInt(weight),
                  abilities: selectedAbilities
                }));
              }}>Save</Button>
            )}
          </>
        }
      >
        <div>
          <h2>Profile</h2>
          <Form
            name="profile"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              height: pokemon.height,
              weight: pokemon.weight
            }}
            onChange={(event) => {
              const value = event.target.value;
              const inputName = event.target.id;
              if (inputName === 'profile_height') {
                setHeight(value);
              }

              if (inputName === 'profile_weight') {
                setWeight(value);
              }
            }}
          >
            <Form.Item label="Height" name="height">
              <Input style={styles.input} readOnly={!canEdit} />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input style={styles.input} readOnly={!canEdit} />
            </Form.Item>
            <Form.Item label="Abilities">
              <Select
                disabled={!canEdit}
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                defaultValue={pokemonAbilities.map((ab) => (
                  <Option key={ab.name}>{ab.name}</Option>
                ))}
                onChange={(values) => {
                  const selectedAbilities = abilities.filter(({ ability }) => values.includes(ability.name));
                  setSelectedAbilities(selectedAbilities);
                }}
              >
                {abilities.map(({ ability }) => (
                  <Option key={ability.name}>{ability.name}</Option>
                ))}
              </Select>
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
            <h2 style={styles.h2}>{pokemon.evolutions[0].species_name} Last Evolution</h2>
            <img src={pokemon.sprites.front_default} alt="" />
          </div>
        )}
      </Modal>
    );
  };

  return <div style={styles.container}>{renderDetailsModal()}</div>;
};

export default Details;
