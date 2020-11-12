import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import Lottie from 'react-lottie';
import animationData from '../../assets/heart.json';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className='back'>
            <div className='cover'>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                <img src={heroesImg} alt="Heroes" />
            </div>
            <div className="logon-container">
                <section className="form">
                    <img className="logo" src={logoImg} alt="Be The Hero" />

                    <form onSubmit={handleLogin}>
                        <input
                            placeholder="E-Mail"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <input
                            placeholder="Senha"
                            value={id}
                            onChange={e => setId(e.target.value)}
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