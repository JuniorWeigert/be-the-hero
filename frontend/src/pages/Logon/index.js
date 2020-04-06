import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function logonHandler(event){
    event.preventDefault();

    try{
      const response = await api.post('sessions', {id});
      console.log(response.data.name);
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
        history.push('/profile');
    } catch(err){
      alert(`Opss, Não foi possivel efetuar o Login`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Logo Be The Hero"/>
        <form onSubmit={logonHandler}>
          <h1>Faca seu Logon</h1>
          <input
          placeholder="Seu ID"
          value={id}
          onChange={e=> setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heros"/>
    </div>
  )
}