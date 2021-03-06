import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile',
            {
                headers: {
                    Authorization: ongId,
                },
            }
        ).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleEditCanvas(id) {
        try {
            localStorage.setItem('selectedCanvas', id);
            history.push('/canvas');
        } catch (error) {
            alert('Erro ao selecionar este canvas, tente novamente');
        }
    }

    async function handleCleanCanvas() {
        try {
            localStorage.setItem('selectedCanvas', '');
            history.push('/canvas');
        } catch (error) {
            alert('Erro ao cadastrar novo canvas, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Canvas Projeto de Vida" />
                <span>Bem vindo(a), {ongName}</span>

                <Link className="button" onClick={handleCleanCanvas} to="/canvas">Cadastrar novo canvas</Link>
                <button onClick={handleLogout} type="button" alt="Sair">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Meus Canvas</h1>
            <section>
                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Título:</strong>
                            <p>{incident.title}</p>

                            <button onClick={() => handleEditCanvas(incident.id)} type="button">
                                <FiEdit size={20}  />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
}