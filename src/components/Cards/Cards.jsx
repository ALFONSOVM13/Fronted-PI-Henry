import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Card from "../Card/Card";
import '../../sass/Card.scss';
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti';

export default function Cards({ characters, onClose, onSearch, onClearAll, onAddRandom }) {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12;
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      onSearch(searchValue);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter an ID to search',
      });
    }
  };

  const handleAddRandom = () => {
    onAddRandom();
  };

  const handleOnClose = (id) => {
    onClose(id);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(characters.length / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  const showPageNumbers = [currentPage - 1, currentPage, currentPage + 1]
    .filter(page => page > 0 && page <= Math.ceil(characters.length / charactersPerPage));

  if (characters.length === 0) {
    return <div>
      <div className = 'searchbar'>
        <input
          type="search"
          placeholder="Search by ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className='searchbar__search' onClick={handleSearch}>Search</button>
        <button onClick={handleAddRandom}>Add Random</button>
        <button onClick={onClearAll}>Clear All</button>
      </div>
    </div>

  }

  return (
    <div>
      <div className = 'searchbar'>
        <input
          type="search"
          placeholder="Search by ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className='searchbar__search' onClick={handleSearch}>Search</button>
        <button onClick={handleAddRandom}>Add Random</button>
        <button onClick={onClearAll}>Clear All</button>
      </div>
      <div className='card-container'>
        {currentCharacters.map((character) => (
          <div key={character.id}>
            <Card
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              image={character.image}
              origin={character.origin.name}
              isFavorite={character.isFavorite}
              onClose={handleOnClose}
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className='pagination__button' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <TiArrowLeftOutline />
        </button>
        {showPageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className={`pagination__button ${currentPage === number ? 'active' : 'page-number'}`}>
            {number}
          </button>
        ))}
        <button className='pagination__button' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(characters.length / charactersPerPage)}>
          <TiArrowRightOutline />
        </button>
      </div>
    </div>
  );
}
