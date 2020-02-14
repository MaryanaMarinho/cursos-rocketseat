import React, {useEffect, useState} from 'react';
import api from "./services/api";

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');

            setDevs(response.data);
        }

        loadDevs();
    }, []);

    async function handleAddDev(data) {

        const response = await api.post('/devs', data);

        // assim que se faz uma adiçao dentro de um array no js
        // ...devs - ta copiando os devs existentes
        // response.data - ta acidionando o novo dev
        setDevs([...devs, response.data]);
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}/>
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev}/>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;


// Tudo é basido nesses 3 conceitos
// Componente: é um bloco isolado de html, css, e js, o qual nao interfere no restante da aplicacao
// Propriedade: informaçoes que o componente PAI passa para o componente FILHO
// Estado: informaçoes mantidas pelo componete (lembrar: imutabilidade)
