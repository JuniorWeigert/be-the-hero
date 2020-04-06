import React, {useState, useEffect } from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'
import './styles.css'

export default function Profile(){
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response =>{
      setIncidents(response.data.incidents);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try{
      api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch(err){
      alert('erro ao tentar deletar incidente');
    }
  }


  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="profile-container">
      <header>
          <img src={logoImg} alt="Logo Be The Hero"/>
          <span>Bem vinda, {ongName}</span>
        
          <Link to="/incidents/new" className="button">Cadastrar Caso</Link>
          <button type="submit" className="logout" onClick={handleLogout}>
            <FiPower size={18} color="#e02041"/>
          </button>
      </header>
      <h1>Casos Cadastrados</h1>

      <ul>
      {incidents.map(incident=>(
         <li key={incident.id}>
         <strong>CASO:</strong>
         <p>{incident.title}</p>
         <strong>DESCRIÇÃO:</strong>
         <p>{incident.description}</p>
         <strong>VALOR:</strong>
         <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

         <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
           <FiTrash2 size={20} color="#a8a8b3"/>
         </button>
       </li>
       ))}
      </ul>
    </div>
  )
}