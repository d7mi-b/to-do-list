import style from '../styles/overview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Side from '../components/Side';
import Header from '../components/Header';
import axios from 'axios';


let classification = [
    {
        id: 1,
        title: "Do First",
        tasks: []
    },
    {
        id: 2,
        title: "Do Later",
        tasks: []
    },
    {
        id: 3,
        title: "Delegate",
        tasks: []
    },
    {
        id: 4,
        title: "Don't Do",
        tasks: []
    },
]

function Overview (props) {
    const [tasks, setTasks] = useState(null);
    const { user } = useAuthContext();

    const handelChecked = (e) => {
        const parent = e.target.parentElement.parentElement;
        if (parent.classList.contains('overview_checked__W5Tlx')) {
            parent.classList.remove('overview_checked__W5Tlx');
            axios.patch('http://localhost:5000/api/task/updateStateTask', {
                id: +parent.id,
                state: 'NOT Checked'
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => console.log(res))
        } else {
            parent.classList.add('overview_checked__W5Tlx');
            axios.patch('http://localhost:5000/api/task/updateStateTask', {
                id: +parent.id,
                state: 'Checked'
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => console.log(res))
        }
    }

    const deleteTask = (e) => {
        const taskId = e.target.parentElement.parentElement.parentElement.id;
        
        axios.delete(`http://localhost:5000/api/task/deleteTask/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/task/getAllTasks`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            setTasks(res.data)
        })
    }, [user])

    return (
        <div className={`page home`}>
            <Side />
            <div className="container">
                <Header />
                <article className={style.overview}>
                    <header>
                        <h3>Overview</h3>
                    </header>
                    <section className={style.matrix}>
                        {
                            classification.map(e => {
                                return (
                                    <article className={`card ${style.card}`} key={e.id}>
                                        <header>
                                            <h3>{e.title}</h3>
                                        </header>
                                        <section className={`${style.tasks}`}>
                                            {
                                                tasks &&
                                                tasks.filter(ele => e.title === ele.classification)
                                                .map(ele => {
                                                    return (
                                                        <article className={`${style.task}`} key={ele.id} id={ele.id} >
                                                            <p>{ele.title}</p>
                                                            <section>
                                                                <FontAwesomeIcon icon={faTrash} onClick={deleteTask} />
                                                                <input type='checkbox' name='check' className={`${style.check}`} onClick={handelChecked} />
                                                            </section>
                                                        </article>
                                                    );
                                                })
                                            }
                                        </section>
                                    </article>
                                );
                            })
                        }
                    </section>
                </article>
            </div>
        </div>
    )
}

export default Overview;