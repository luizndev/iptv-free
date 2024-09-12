import "./Login.css"
import React, { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='containerLogin'>
      <img src="https://www.imagensempng.com.br/wp-content/uploads/2021/10/04.png" alt="Logo IPTV" />
      
      <div className="formLogin">
        <input type="text" name="user" id="user" placeholder="Usuário" />
        
        <div className="passwordField">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            id="password" 
            placeholder="Senha" 
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type='submit'>Entrar</button>
      </div>
    </div>
  );
}

export default Login;
