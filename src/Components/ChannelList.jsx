import React from 'react';
import './Style.css'

function ChannelList({ channels, onChannelClick }) {
  return (
    <div className='containerList'>
      {channels.map((channel, index) => (
        <div className='listItem'
          key={index}
          onClick={() => onChannelClick(channel.Link)}
        >
        <div className="image">
          <img
            src={channel.Imagem}
            alt={channel.Nome}
          />
        </div>
          <h3>{channel.Nome}</h3>
        </div>
      ))}
    </div>
  );
}

export default ChannelList;
