import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [description4, setDescription4] = useState('');
    const [description5, setDescription5] = useState('');
    const [description6, setDescription6] = useState('');
    const [description7, setDescription7] = useState('');
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
                setDescription2(canvas[0].description);
                setDescription3(canvas[0].description);
                setDescription4(canvas[0].description);
                setDescription5(canvas[0].description);
                setDescription6(canvas[0].description);
                setDescription7(canvas[0].description);
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
            description2,
            description3,
            description4,
            description5,
            description6,
            description7,
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
            alert('Erro ao cadastrar o Canvas, tente novamente.')
        }

    }

    async function handleDeleteCanvas(id) {
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
            alert('Erro ao deletar Canvas, tente novamente');
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
                            <button  style={{ display: (visible ? 'block' : 'none') }} className="button deletar" onClick={() => handleDeleteCanvas(incidents)} type="button">Descartar Canvas</button>
                        <button className="button salvar" type="submit">Salvar Canvas</button>
                    </div>
                </form>
            </div>
        </div>
    );
}