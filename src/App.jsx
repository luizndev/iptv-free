import { Routes, Route } from 'react-router-dom';
import Home from './Acesso/Acesso.jsx'; 
import Login from './Login/Login.jsx'; 
import Menu from './Menu/Menu.jsx'; 
import Radio from './Radio/Radio.jsx';
import Series from './Series/Series.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="" element={<Home />} /> 
        <Route path="/acesso" element={<Home />} /> 
        <Route path="/radio" element={<Radio />} /> 
        <Route path="/series" element={<Series />} /> 
        <Route path="/menu" element={<Menu />} /> 
      </Routes>
    </div>
  );
}

export default App;
