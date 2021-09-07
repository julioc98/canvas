import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('users/signin', {}, { 
                auth: {
                    username: email,
                    password: id,
                }
             });
             localStorage.setItem('token', response.data.token);
             localStorage.setItem('name', response.data.name);

             history.push('/profile');
            } catch (err) {
                alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className='back'>
            <div className='cover'>
                <img src={heroesImg} alt="Heroes" />
            </div>
            <div className="logon-container">
                <section className="form">
                    <img className="logo" src={logoImg} alt="Be The Hero" />

                    <form onSubmit={handleLogin}>
                        <input
                            placeholder="E-Mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            id="email"
                        />
                        <input
                            placeholder="Senha"
                            value={id}
                            type="password"
                            onChange={e => setId(e.target.value)}
                            required
                        />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#ff6682" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
            </div>
        </div>
    );
}