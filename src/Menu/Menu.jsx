import { IoIosRadio } from "react-icons/io";
import { BsCameraReelsFill } from "react-icons/bs";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { MdAccountCircle, MdLocalMovies } from "react-icons/md"; 
import { IoMdLogOut } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

function Menu() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();

      setCurrentTime(`${hours}:${minutes}`);
      setCurrentDate(`${day} de ${month} de ${year}`);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='containerScreen'>
      <header className='headerContainer'>
        <img src="https://www.imagensempng.com.br/wp-content/uploads/2021/10/04.png" alt="Logo" />
        <div className="optionsContainer">
          <span className="horario">{currentTime}</span>
          <span className="data">{currentDate}</span>
          <button title="Suporte Online"><IoCall /></button>
          <button title="Conta"><MdAccountCircle /></button>
          <button title="Logout"><IoMdLogOut /></button>
        </div>
      </header>
      <section className='containerSectionMenu'>
        <Link to={'/acesso'}><PiTelevisionSimpleFill /> Live TV</Link>
        <Link><BsCameraReelsFill /> Series</Link>
        <Link><MdLocalMovies /> Filmes</Link>
        <Link><IoIosRadio /> Radio</Link>
      </section>
      <footer>
        <h1>Expira em: 10/09/2024</h1>
      </footer>
    </div>
  );
}

export default Menu;
