import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Favorites.css';
import Pagination from '../Pagination/Pagination.jsx';
import Swal from 'sweetalert2';

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [filterType, setFilterType] = useState('id');
  const [filters, setFilters] = useState({ gender: [], species: [] });
  const [currentPage, setCurrentPage] = useState(1); // Definir el estado de la página actual
  const charactersPerPage = 12;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
    setFavoriteList(storedFavorites);
  }, []);

  const handleOnClose = (id) => {
    const updatedList = favoriteList.filter((character) => character.id !== id);
    setFavoriteList(updatedList);
    localStorage.setItem('favoriteCharacters', JSON.stringify(updatedList));
  };

  const handleFavoriteChange = (id) => {
    const updatedList = favoriteList.map((character) => {
      if (character.id === id) {
        return { ...character, isFavorite: !character.isFavorite };
      }
      return character;
    });
    setFavoriteList(updatedList);
    localStorage.setItem('favoriteCharacters', JSON.stringify(updatedList));
  };

  const handleSort = () => {
    const sortedList = [...favoriteList].sort((a, b) => {
      if (filterType === 'name') {
        if (isAscendingOrder) {
          return a[filterType].localeCompare(b[filterType]);
        } else {
          return b[filterType].localeCompare(a[filterType]);
        }
      } else {
        if (isAscendingOrder) {
          return a[filterType] - b[filterType];
        } else {
          return b[filterType] - a[filterType];
        }
      }
    });
    setFavoriteList(sortedList);
    setIsAscendingOrder(!isAscendingOrder);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterCheckboxChange = (filter, value) => {
    const updatedFilters = { ...filters };
    updatedFilters[filter] = value;
    setFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];
    setFavoriteList(storedFavorites);
    setFilterType('id');
    setIsAscendingOrder(true);
    setFilters({ gender: [], species: [] });
  };

  const applyFilters = (character) => {
    if (
      (filters.gender.length === 0 || filters.gender.includes(character.gender)) &&
      (filters.species.length === 0 || filters.species.includes(character.species))
    ) {
      return true;
    }
    return false;
  };

  // Define la función `paginate` que actualizará el estado de `currentPage`
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = favoriteList.filter(applyFilters).slice(indexOfFirstCharacter, indexOfLastCharacter);

  const handleClearAllFavorites = () => {
    // Show a SweetAlert to confirm before deleting all favorites
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete all your favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete all favorites from localStorage and update the state to an empty array
        localStorage.removeItem('favoriteCharacters');
        setFavoriteList([]);
        Swal.fire('Deleted', 'All your favorites have been deleted', 'success');
      }
    });
  };

  return (
    <div className="favorites-container">

      <div className='Filtros'>
        <div className='header'>
          <h1 className='title'>Filters</h1>
        </div>
        <div className="filter-section">
          <label htmlFor="filterType" className="filter-label">Select Filter Type:</label>
          <select id="filterType" onChange={handleFilterChange} value={filterType} className="filter-select">
            <option value="id">ID</option>
            <option value="name">Name</option>
            {/* Agrega más opciones según los campos disponibles */}
          </select>
          <div className="button-container">
            <button onClick={handleSort} className="sort-button">{isAscendingOrder ? 'Sort Descending' : 'Sort Ascending'}</button>
          </div>
        </div>
        <div className="filter-section">
          <label className="filter-label">Filter by Gender:</label>
          <div className="filter-checkboxes">
            <label>
              <input
                type="checkbox"
                value="Male"
                checked={filters.gender.includes('Male')}
                onChange={(e) =>
                  handleFilterCheckboxChange('gender', e.target.checked ? [...filters.gender, e.target.value] : filters.gender.filter((item) => item !== e.target.value))
                }
              />
              Male
            </label>
            <label>
              <input
                type="checkbox"
                value="Female"
                checked={filters.gender.includes('Female')}
                onChange={(e) =>
                  handleFilterCheckboxChange('gender', e.target.checked ? [...filters.gender, e.target.value] : filters.gender.filter((item) => item !== e.target.value))
                }
              />
              Female
            </label>
          </div>
        </div>
        <div className="filter-section">
          <label className="filter-label">Filter by Species:</label>
          <div className="filter-checkboxes">
            <label>
              <input
                type="checkbox"
                value="Human"
                checked={filters.species.includes('Human')}
                onChange={(e) =>
                  handleFilterCheckboxChange('species', e.target.checked ? [...filters.species, e.target.value] : filters.species.filter((item) => item !== e.target.value))
                }
              />
              Human
            </label>
            <label>
              <input
                type="checkbox"
                value="Alien"
                checked={filters.species.includes('Alien')}
                onChange={(e) =>
                  handleFilterCheckboxChange('species', e.target.checked ? [...filters.species, e.target.value] : filters.species.filter((item) => item !== e.target.value))
                }
              />
              Alien
            </label>
          </div>
        </div>
        <div className="clear-all-favorites">
          <button onClick={handleClearAllFavorites} className="clear-all-button">
            Clear All Favorites
          </button>
          <button onClick={handleResetFilters} className="reset-button">Reset Filters</button>

        </div>


      </div>
      
      <div className="contenedor-2">
        {favoriteList.length > 0 ? (
          <div className="favorite-cards">
            
            {currentCharacters.map((character) => (
              <Card
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                image={character.image}
                origin={character.origin}
                isFavorite={true}
                onClose={handleOnClose}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30px',marginLeft: '100px', color: 'white', fontSize: '38px' }}>
            No cards to display. Please add some cards.
          </div>
        )}

        {favoriteList.length > 8 && (
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            totalItems={favoriteList.length}
            itemsPerPage={charactersPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;






