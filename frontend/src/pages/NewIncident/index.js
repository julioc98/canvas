import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name'); //pega do banco corretamente
    const selectedCanvas = localStorage.getItem('selectedCanvas');
    
    const [title, setTitle] = useState(name+' '+dataAtualFormatada());
    const [description, setDescription] = useState(''); 
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [description4, setDescription4] = useState('');
    const [description5, setDescription5] = useState('');
    const [description6, setDescription6] = useState('');
    const [description7, setDescription7] = useState('');
    const [visible, setVisible] = useState(false);

    const history = useHistory();

    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

    useEffect(() => {
        if(token) {
            api.get(`canvas/${selectedCanvas}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => {
                const canvas = response.data
                if (canvas) {
                    setTitle(canvas.title);
                    setDescription(canvas.description);
                    setDescription2(canvas.description2);
                    setDescription3(canvas.description3);
                    setDescription4(canvas.description4);
                    setDescription5(canvas.description5);
                    setDescription6(canvas.description6);
                    setDescription7(canvas.description7);
                    setVisible(true)
                }
            });
        } else {
            history.push('/login');
        }
    }, [token, selectedCanvas, history]);

    async function handleNewIncident(e, selectedCanvas) {
        e.preventDefault();

        const data = {
            title, 
            description,
            description2,
            description3,
            description4,
            description5,
            description6,
            description7,
        };

        try {
            if(selectedCanvas) {
                await api.put(`canvas/${selectedCanvas}`, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                await api.post('canvas', data,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
            }
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o Canvas, tente novamente.')
        }

    }

    async function handleDeleteCanvas(selectedCanvas) {
        try {
            await api.delete(`canvas/${selectedCanvas}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            history.push('/profile');
        } catch (error) {
            alert('Erro ao deletar Canvas, tente novamente');
        }
    }


    return (
        <div className="new-incident-container">
            <section>
                <img className="logoIncident" src={logoImg} alt="Canvas Projeto de Vida" />
                <div className="group-title title">
                    {name}
                </div>
                <button className="button pdf" onClick={() => {
                    document.title=name+' '+dataAtualFormatada();window.print() }}>
                        Exportar Canvas
                </button>
            </section>
            <div className="content">
                <form onSubmit={e => handleNewIncident(e, selectedCanvas)}>
                    <div className="canvas-content">
                        <div className="canvas-line1">
                            <div className="canvas-div laranja">
                                <p>O que eu sei fazer? (Formação, habilidades, experiências, projetos)</p>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="canvas-line1-div">
                                <div className="canvas-div azul">
                                    <p>Quais meus sonhos?</p>
                                    <textarea
                                        value={description2}
                                        onChange={e => setDescription2(e.target.value)}
                                    />
                                </div>
                                <div className="canvas-div azul">
                                    <p>Quais meus valores?</p>
                                    <textarea
                                        value={description3}
                                        onChange={e => setDescription3(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="canvas-div rosa">
                                <p>Quem sou eu? (características, interesses e hobbies e de onde eu venho)</p>
                                <textarea
                                    value={description4}
                                    onChange={e => setDescription4(e.target.value)}
                                />
                            </div>
                            <div className="canvas-line1-div">
                                <div className="canvas-div roxo">
                                    <p>Quem eu conheço? (rede de relações pessoais, acadêmicas e profissionais)</p>
                                    <textarea
                                        value={description5}
                                        onChange={e => setDescription5(e.target.value)}
                                    />
                                </div>
                                <div className="canvas-div roxo">
                                    <p>Como eu me expresso? Quais canais uso? (redes sociais/blogs/etc) Quais linguagens uso? (oral, escrita, desenho, outras)</p>
                                    <textarea
                                        value={description6}
                                        onChange={e => setDescription6(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="canvas-div cinza">
                            <p>Quais novos recursos eu preciso construir ou reforçar para ajudar a viabilizar meus sonhos?</p>
                            <textarea
                                value={description7}
                                onChange={e => setDescription7(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="canva-footer">
                        <Link className="back-link link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                             Voltar para Home
                        </Link>
                        <div className="group-button">
                        { visible ? 
                            <button  className="button deletar" onClick={() => handleDeleteCanvas(selectedCanvas)} type="button">
                                Descartar Canvas
                            </button> 
                        : null }
                            <button className="button salvar" type="submit">Salvar Canvas</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}