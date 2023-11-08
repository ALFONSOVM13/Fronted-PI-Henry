import React from 'react';
import loader from '../../assets/loader.gif';

const Loading = () => {
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyles = {
    objectFit: 'cover',
    width: '100%',
    background: 'none', // Cambiar el ancho de la imagen
  };

  return (
    <div style={containerStyles}>
      <img src={loader} alt="Loader.." style={imageStyles} />
    </div>
  );
};

export default Loading;

