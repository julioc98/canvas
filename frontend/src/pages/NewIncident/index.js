import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const selectedCanvas = localStorage.getItem('selectedCanvas');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile',
            {
                headers: {
                    Authorization: ongId,
                },
            }
        ).then(response => {
            const canvas = response.data.filter(canva => canva.id == selectedCanvas);
            if (canvas[0] !== undefined) {
                setTitle(canvas[0].title);
                setDescription(canvas[0].description);
                setValue(canvas[0].value);
                setIncidents(canvas[0].id);
                setVisible(true)
            }
        });
    }, [ongId]);

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data,
                {
                    headers: {
                        Authorization: ongId,
                    },
                });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`,
                {
                    headers: {
                        Authorization: ongId,
                    },
                }
            );

            //setIncidents(incidents.filter(incident => incident !== id))

            history.push('/profile');
        } catch (error) {
            alert('Erro ao deletar Canvas, tente novamente', error);
        }
    }
      
      
    return (
        <div className="new-incident-container">
            <section>
                <img className="logoIncident" src={logoImg} alt="Be The Hero" />
                <input
                    placeholder="Título do Canvas"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </section>
            <div className="content">
                <form onSubmit={handleNewIncident}>
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
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="canvas-div azul">
                                    <p>Quais meus valores?</p>
                                    <textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="canvas-div rosa">
                                <p>Quem sou eu? (características, interesses e hobbies e de onde eu venho)</p>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="canvas-line1-div">
                                <div className="canvas-div roxo">
                                    <p>Quem eu conheço? (rede de relações pessoais, acadêmicas e profissionais)</p>
                                    <textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="canvas-div roxo">
                                    <p>Como eu me expresso? Quais canais uso? (redes sociais/blogs/etc) Quais linguagens uso? (oral, escrita, desenho, outras)</p>
                                    <textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="canvas-div cinza">
                            <p>Quais novos recursos eu preciso construir ou reforçar para ajudar a viabilizar meus sonhos?</p>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="canva-footer">
                        <Link className="back-link link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                             Voltar para Home
                        </Link>
                            <button  style={{ display: (visible ? 'block' : 'none') }} className="button deletar" onClick={() => handleDeleteIncident(incidents)} type="button">Descartar Canvas</button>
                        <button className="button salvar" type="submit">Salvar Canvas</button>
                    </div>
                </form>
            </div>
        </div>
    );
}