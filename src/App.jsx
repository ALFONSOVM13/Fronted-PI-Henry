import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import About from './components/About/About.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import Footer from './components/Footer.jsx';
import Error404 from './components/404/404.jsx'
import Form from './components/Form/Form.jsx';
import axios from "axios";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Details from './components/Details/Details';



const API_KEY = 'pi-alfonsovm13';

function App() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [access, setAccess] = useState(false);
  const location = useLocation();
  const [apiCharacters, setApiCharacters] = useState([]);
  const EMAIL = 'alfonsovengoechea@gmail.com';
  const PASSWORD = '12345678';

  const login = (userData) => {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      sessionStorage.setItem('access', 'true'); // Store the session in sessionStorage
      navigate('/home');
    } else {
      // Show an alert with SweetAlert if the credentials are incorrect
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect email or password. Please try again.'
      });
    }
    setUserEmail(userData.email);
  };


  useEffect(() => {
    const sessionAccess = sessionStorage.getItem('access');

    if (
      !['/', '/home', '/favorites', '/detail/:id', '/about'].includes(location.pathname)
    ) {
      return;
    }
    if (sessionAccess === 'true') {
      setAccess(true);
    } else {
      sessionStorage.removeItem('access');
      navigate('/');
    }
  }, [location.pathname, navigate]);



  const handleLogout = () => {
    setAccess(false); // Cerrar la sesión estableciendo el estado de acceso a falso
    sessionStorage.removeItem('access'); // Limpiar la sesión almacenada en el sessionStorage
    navigate('/'); // Redirigir al usuario a la página de inicio o login
  };



  function onSearch(id) {
    axios(`https://rym2.up.railway.app/api/character/${id}?key=${API_KEY}`)
      .then(({ data }) => {
        if (data.name) {
          const findObj = apiCharacters.find((character) => character.name === data.name);
          if (!findObj) {
            setApiCharacters([...apiCharacters, data]);
            Swal.fire({
              icon: 'success',
              title: 'New card added!',
              text: 'A new card has been successfully added.',
              showConfirmButton: false,
              timer: 1000 // Adjust the timer or other options as needed
            });
          } else {
            Swal.fire({
              title: 'ID already exists!',
              text: 'Please use a different ID.',
              icon: 'warning',
            });
          }
        } else {
          Swal.fire({
            title: 'Character ID out of range!',
            text: 'Please input an ID between 1 and 826.',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  }


  function onClose(id) {
    setApiCharacters(apiCharacters.filter((character) => character.id !== Number(id)));
  }

  const handleAddRandom = () => {
    axios.get(`https://rym2.up.railway.app/api/character/${getRandomCharacterId()}?key=${API_KEY}`)
      .then(response => {
        const newCharacter = response.data;
        setApiCharacters([...apiCharacters, newCharacter]);
  
        // Show a SweetAlert notification upon successful addition of a new card
        Swal.fire({
          icon: 'success',
          title: 'New card added!',
          text: 'A new card has been successfully added.',
          showConfirmButton: false,
          timer: 1000 // Adjust the timer or other options as needed
        });
      })
      .catch(error => {
        console.error("Error fetching random character:", error);
      });
  };

  const getRandomCharacterId = () => {
    return Math.floor(Math.random() * 826) + 1;
  };

  function onClearAll() {
    // Show a SweetAlert confirmation dialog before clearing the cards
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete all the searched cards?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'No, keep them'
    }).then((result) => {
      if (result.isConfirmed) {
        setApiCharacters([]);
        // Additional actions upon confirmation to clear the cards
        // You can add further logic here if needed after clearing the cards
      }
    });
  }

  return (
    <div className='background-img'>

      {(location.pathname === '/home' || location.pathname === '/favorites' || location.pathname === '/about') && !location.pathname.includes('/detail/') && (
        <Navbar
        userEmail={userEmail}
        handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route path='/' element={<Form login={login} />} />
        <Route path='/home' element={<Cards
          characters={apiCharacters}
          onClose={onClose}
          onSearch={onSearch}
          onClearAll={onClearAll}
          onAddRandom={handleAddRandom} />} />
        <Route path='/favorites' element={<Favorites characters={apiCharacters} />} />
        <Route path='/detail/:id' element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      {(location.pathname === '/home' || location.pathname === '/favorites' || location.pathname === '/about') && !location.pathname.includes('/detail/') && <Footer />}    </div>
  );
}

export default App;