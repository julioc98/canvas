import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Lottie from 'react-lottie';
import animationData from '../../assets/leaf.json';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import coverRegister from '../../assets/cover-register.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setpassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const history = useHistory();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            password,
            passwordConfirm,
        };

        try {
            if(data.password !== data.passwordConfirm) {
                alert(`As senhas não conferem`);
            } else {
                const response = await api.post('ongs', data);
                alert(`Cadastrado(a) com sucesso!`);
                history.push('/');
            }
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
                            id="name"
                            type="name"
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="E-Mail"
                            value={email}
                            type="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <input
                            placeholder="WhatsApp"
                            value={whatsapp}
                            type="number" 
                            id="phone" 
                            data-politespace data-grouplength="3,3,4" 
                            onChange={e => setWhatsapp(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Senha"
                            value={password}
                            type="password"
                            id="password"
                            onChange={e => setpassword(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Confirmar Senha"
                            value={passwordConfirm}
                            type="password"
                            onChange={e => setPasswordConfirm(e.target.value)}
                            required
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
            <Lottie className="animation"
                        options={defaultOptions}
                        height={300}
                        width={300}
            />
                <img src={coverRegister} alt="Canvas Projeto de Vida" />
            </div>
        </div>
    );
}