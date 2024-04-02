import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h1>백엔드에서 가져온 데이터입니다</h1>
            <table>
                <thead>
                <tr>
                    <th>사원번호</th>
                    <th>이름</th>
                    <th>직책</th>
                    <th>급여</th>
                </tr>
                </thead>
                <tbody>
                {elist.map(emp => (
                    <tr key={emp.empno}>
                        <td>{emp.empno}</td>
                        <td>{emp.ename}</td>
                        <td>{emp.job}</td>
                        <td>{emp.sal}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;