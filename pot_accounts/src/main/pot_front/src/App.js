import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUp from './pages/signup/Signup';
import Routers from './Routers';
import Login from './pages/login/Login';
import Header from './pages/layout/Header';

function App() {
    const [elist, setElist] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9596/emp')
            .then(response => {
                setElist(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <Routers />
        </div>
    );
}

export default App;