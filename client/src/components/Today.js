import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/list.module.css';
import axios from 'axios';

function Today () {
    const [list, setList] = useState(null);
    const { user } = useAuthContext();

    const handelChecked = (e) => {
        const parent = e.target.parentElement.parentElement;

        if (parent.classList.contains('list_checked__h3SFW')) {
            parent.classList.remove('list_checked__h3SFW');
            axios.patch('http://localhost:5000/api/task/updateStateTask', {
                id: +parent.id,
                state: 'NOT Checked'
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => console.log(res))
        } else {
            parent.classList.add('list_checked__h3SFW');
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
        
        axios.delete(`http://localhost:5000/api/task/deleteTaskToday/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res.data)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/task/getAllTasksToday`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            setList(res.data)
        })
    }, [user])

    return (
        <article className={`${style.list}`}>
            <header>
                <h2>Today</h2>
            </header>
            <section className={`${style.tasks} card`}>
                {
                    list &&
                    list.map((e, i) => {
                        return (
                            <article className={
                                `${style.task} ${
                                    e.state === "NOT Checked" ? ' ' : style.checked
                                }`
                                } key={e.id} id={e.id} >
                                <section>
                                    <p>{e.title}</p>
                                    <p className={style.date}>{new Date(e.date).toDateString()}</p>
                                </section>
                                <section>
                                    <FontAwesomeIcon icon={faTrash} onClick={deleteTask} />
                                    <input defaultChecked={e.state === "NOT Checked" ? false : true} type='checkbox' name='check' className={`${style.check}`} onChange={handelChecked} />
                                </section>
                            </article>
                        )
                    })
                }
                {
                    !list && <p>Do not have tasks</p>
                }
            </section>
        </article>
    );
}

export default Today;