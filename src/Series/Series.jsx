import { IoMdReturnLeft } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import ChannelList from '../Components/ChannelList.jsx';
import './Series.css';
import iptvData from './iptv.json';
import { Link } from 'react-router-dom';

function Series() {
  const [iframeSrc, setIframeSrc] = useState('');
  const [expira, setExpira] = useState('10/09/2024');
  const [currentTime, setCurrentTime] = useState('');
  const [displayButton, setDisplayButton] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [pageTitle, setPageTitle] = useState('EZY IPTV | O Melhor sistema de IPTV do Brasil!');
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeStyles, setIframeStyles] = useState({});
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  
  // Atualiza o título da página
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // Atualiza a data e hora atuais
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

  // Atualiza a fonte do iframe
  useEffect(() => {
    if (selectedEpisode) {
      console.log('Atualizando iframeSrc para:', selectedEpisode.Link); // Verificar URL
      setIframeSrc(selectedEpisode.Link);
      setDisplayButton(true);
      if (!fullscreen) {
        setIframeStyles({ width: '100%', height: '500px', position: 'relative' });
      }
    }
  }, [selectedEpisode, fullscreen]);

  // Função para alternar o modo de tela cheia
  const handleFullscreenToggle = () => {
    if (fullscreen) {
      setIframeStyles({ width: '100%', height: '500px', position: 'relative' });
    } else {
      setIframeStyles({ width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0' });
    }
    setFullscreen(!fullscreen);
  };

  // Lida com o clique em um canal
  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setSelectedEpisode(null); // Reset selected episode when a new channel is clicked
  };

  // Lida com o clique em um episódio
  const handleEpisodeClick = (episode) => {
    console.log('Episódio selecionado:', episode); // Verificar objeto do episódio
    setSelectedEpisode(episode);
  };

  return (
    <div className='containerScreen'>
      <header className='headerContainer'>
        <img src="logotipo.svg" alt="Logotipo" />
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
        {selectedChannel && !selectedEpisode && (
          <div className="episodeList">
            <h3>{selectedChannel.Nome}</h3>
            <img src={selectedChannel.Imagem} alt={selectedChannel.Nome} />
            <div className="episodeCards">
              {selectedChannel.Episodios && selectedChannel.Episodios.map((episode, index) => (
                <div key={index} className="episodeCard" onClick={() => handleEpisodeClick(episode)}>
                  <h4>{episode.Nome}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
        {iframeSrc && (
          <div className={`iframeContainer ${fullscreen ? 'fullscreen' : ''}`}>
            <iframe
              id="manIframe"
              src={iframeSrc}
              title="Episódio"
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

export default Series;
