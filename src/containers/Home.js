import React, { useEffect, useState } from 'react';
import { Button, Avatar, Tooltip, Card, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogoutAsyn } from '../redux/actions/actionLogin';
import { UserOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { actionClearSync } from '../redux/actions/actionRegister';
import { fillAsync } from '../redux/actions/actionPokemon';

const { Meta } = Card;

const Home = () => {
    const dispatch = useDispatch();
    const { pokemons } = useSelector(store => store.pokemonStore)
    const { displayName } = useSelector(store => store.loginStore);

    useEffect(() => {
        loadPokemons();
    }, []);


    const loadPokemons = async () => {
        dispatch(fillAsync());
    }

    const onClick = () => {
        dispatch(actionLogoutAsyn());
        dispatch(actionClearSync());
    }

    const identifyEvolution = (evolutions = [], pokemonName) => {
        const index = evolutions.findIndex(evolution => evolution.species_name === pokemonName);
        console.log({ evolutions, index, pokemonName });
        return index - 1 < 0 ? "isn't an evolution" : `${evolutions[index - 1].species_name} evolution`;
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <Button type="link" size={'large'} onClick={onClick}>
                Logout
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title="user" color='#2BE7E8'>
                        <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Avatar icon={<UserOutlined />} /></Button>
                    </Tooltip>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Hi!</span>
                        <span>{displayName}</span>
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: 10, margin: 10 }}>
                {pokemons && pokemons.length ? pokemons.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="example" src={item.sprites.front_default || ''} />}
                        actions={[
                            <EyeOutlined key="details" />,
                            <StarOutlined key="favorites" />
                        ]}
                    >
                        {/* reemplazar el item.id por item.name cuando se vaya a usar el api real */}
                        <Meta title={item.name} description={item.evolutions && item.evolutions.length ? identifyEvolution(item.evolutions, item.name) : ""} />
                    </Card>
                )) : <Empty />}
            </div>
        </div>
    );
}

export default Home