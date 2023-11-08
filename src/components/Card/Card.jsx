import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../sass/Card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Card = (props) => {


  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
    const isFavorited = favoriteCharacters.find((character) => character.id === props.id);

    setIsFavorite(!!isFavorited); // Establecer el estado de isFavorite basado en si se encontró el personaje en favoritos
  }, [props.id]);

  const handleOnClose = () => {
    props.onClose(props.id);

    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
    const updatedFavorites = favoriteCharacters.filter((character) => character.id !== props.id);
    localStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];

    if (isFavorite) {
      const updatedFavorites = favoriteCharacters.filter((character) => character.id !== props.id);
      localStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));
    } else {
      // Si se marca como favorito, añadir toda la información del personaje a la lista
      const newFavorite = {
        id: props.id,
        name: props.name,
        status: props.status,
        species: props.species,
        gender: props.gender,
        image: props.image,
        origin: props.origin
        // Agrega aquí otras propiedades que desees almacenar
      };
      favoriteCharacters.push(newFavorite);
      localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));
    }
  };

  const getStatusIcon = () => {
    if (props.status === 'Alive') {
      return <span className="status-icon green-dot">🟢</span>;
    } else if (props.status === 'Dead') {
      return <span className="status-icon red-dot">🔴</span>;
    } else {
      return <span className="status-icon question-mark">❓</span>;
    }
  };

  return (
    <div className="card">

      <p className='card__number'>#{props.id}</p>
      <Link to={`/detail/${props.id}`}>
        <h2 className="card__name"> {props.name}</h2>
      </Link>
      <div className='card__circle'></div>
      <img src={props.image} alt={props.name} className="card__img" />
      <button className="card__delete-button" onClick={handleOnClose}>
        X
      </button>
      <button className="card__favorite-button" onClick={handleFavoriteClick}>
        <FontAwesomeIcon icon={isFavorite ? faSolidStar : farStar} style={{ color: isFavorite ? 'green' : 'white' }} />
      </button>
      {getStatusIcon()}

    </div>

  );
};

export default Card;
