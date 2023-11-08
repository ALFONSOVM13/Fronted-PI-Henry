import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import './Details.css'
import arrowImage from '../../assets/atras.png'
const API_KEY = 'pi-alfonsovm13';
import Loading from '../Loading/Loading';

const Details = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    

    const activeStyle = {
        transform: 'translateY(2px)', // Adjust the transformation as needed
      };

    useEffect(() => {
        axios(`https://rym2.up.railway.app/api/character/${id}?key=${API_KEY}`)
            .then(({ data }) => {
                if (data.name) {
                    setCharacter(data);
                    console.log(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                }
            })
            .catch(error => {
                console.error('Error fetching character details:', error);
                window.alert('Hubo un error al obtener los detalles del personaje.');
            })
            .finally(() => {
                // Después de 3 segundos, se oculta el mensaje de carga
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            });

        return () => {
            setCharacter({}); // Limpiar el personaje al desmontar el componente
        };
    }, [id]);

return (
    isLoading ? (
        <Loading/>
    ) : (
        <div className='contenedorPrincipal'>
            <div className='contenedor1' >
                <div className='contenedor-padre'>
                    <img className='imagen-personaje' src={character.image} alt={character.name} />
                    <h2 className='h2'>{character.name}</h2>
                    <div>
                        <h3 className='h3'>Status: {character.status}</h3>
                        <h3 className='h3'>Species: {character.species}</h3>
                        <h3 className='h3'>Gender: {character.gender}</h3>
                        <h3 className='h3'>Origin: {character.origin && character.origin.name}</h3>
                    </div>
                    <div className='contenedor2'>
                        <NavLink to="/home">
                            <img src={arrowImage} alt="Go back" style={{ width: '40px', height: '40px' }} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
);}


export default Details;



