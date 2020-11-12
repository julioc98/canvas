import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import coverRegister from '../../assets/cover-register.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img className="logoRegister" src={logoImg} alt="Canvas Projeto de Vida" />
                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nome Completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="E-Mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <input
                            placeholder="Senha"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <input
                            placeholder="Confirmar Senha"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <button className="button" type="submit">Cadastrar</button>
                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#ff6583" />
                        Já tenho cadastro
                    </Link>
                    </form>
                </section>
            </div>

            <div className="register-cover">
                <img src={coverRegister} alt="Canvas Projeto de Vida" />
            </div>
        </div>
    );
}