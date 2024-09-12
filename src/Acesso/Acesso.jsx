import { IoMdReturnLeft } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import ChannelList from '../Components/ChannelList.jsx';
import './Acesso.css';
import iptvData from './iptv.json';
import { Link } from 'react-router-dom';

function Acesso() {
  const [iframeSrc, setIframeSrc] = useState('');
  const [expira, setExpira] = useState('10/09/2024');
  const [currentTime, setCurrentTime] = useState('');
  const [displayButton, setDisplayButton] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [pageTitle, setPageTitle] = useState('EZY IPTV | O Melhor sistema de IPTV do Brasil!');
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeStyles, setIframeStyles] = useState({});

  const handleChannelClick = (link) => {
    if (link !== 'about:blank') { 
      setIframeSrc(link);
      setDisplayButton(true);
      if (!fullscreen) {
        setIframeStyles({ width: '100%', height: '500px', position: 'relative' }); 
      }
    }
  };

  const handleFullscreenToggle = () => {
    if (fullscreen) {
      setIframeStyles({ width: '200%', height: '500px', position: 'relative' }); 
    } else {
      setIframeStyles({ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0' });
    }
    setFullscreen(!fullscreen);
  };

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

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest('a');
      if (target && target.tagName === 'A') {
        event.preventDefault();
        if (target.href && target.href !== 'about:blank') {
          setIframeSrc(target.href);
          setPageTitle(`Assistindo: ${target.href}`);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const originalWindowOpen = window.open;

    window.open = function(url, name, specs) {
      if (url !== 'about:blank') {
        alert('Tentativa de abrir uma nova janela foi bloqueada!');
      }
      return null;
    };

    return () => {
      window.open = originalWindowOpen;
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        alert('O uso da tecla "Backspace" foi desativado!');
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    document.title = pageTitle; 
  }, [pageTitle]);

  return (
    <div className='containerScreen'>
      <header className='headerContainer'>
        <img src="logotipo.svg" alt="" />
        <div className="optionsContainer">
          <span className="horario">{currentTime}</span>
          <span className="data">{currentDate}</span>
          <button title="Suporte Online"><IoCall /></button>
          <button title="Conta"><MdAccountCircle /></button>
          <button title="Logout"><IoMdLogOut /></button>
          <Link to={'/menu'} title="Back" className="back"><IoMdReturnLeft /> Go Back</Link>
        </div>
      </header>
      <section className='containerSection'>
        <ChannelList channels={iptvData} onChannelClick={handleChannelClick} />
        {iframeSrc && (
          <div className={`iframeContainer ${fullscreen ? 'fullscreen' : ''}`}>
            <iframe
              id="manIframe"
              src={iframeSrc}
              title="Canal"
              style={iframeStyles}
            ></iframe>
            {displayButton && (
              <button onClick={handleFullscreenToggle} className="fullscreenButton">
                {fullscreen ? 'Voltar' : 'Tela Cheia'}
              </button>
            )}
          </div>
        )}
      </section>
      <footer>
        <h1>Expira em: {expira}</h1>
      </footer>
    </div>
  );
}

export default Acesso;
