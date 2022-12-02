import axios from 'axios';
import { useEffect } from 'react';
import { Modal } from 'bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/header.module.css';

const classification = [ "Do First", "Do Later", "Delegate", "Don't Do" ]

function Header () {
    const { user } = useAuthContext();

    const handelSubmit = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const classification = e.target.classification.value;
        const date = e.target.date.value;

        axios.post('http://localhost:5000/api/task/createTask', {
            title,
            classification,
            date,
            state: 'NOT Checked',
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => {
            console.log(res.data)
        })
        
    }

    const shoxSide = () => {
        const side = document.getElementById('side');

        side.style.cssText = 'visibility: visible;'
    }

    useEffect(() => {
        new Modal(document.getElementById('exampleModal'), {
            focus: true
        })
    }, [])

    return (
        <header className={style.header}>
            <section className={style.sectionBars}>
                <FontAwesomeIcon onClick={shoxSide} icon={faBarsStaggered} />
                <h3>Hello {user.name}!</h3>
            </section>

            <section className={style.buttons}>
                <button type="button" id='myInput' className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create Task
                </button>
            </section>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${style.modal}`}>
                        <div className="modal-header">
                            <h1 className={`modal-title fs-5 ${style.modalHeader}`} id="exampleModalLabel">Create Task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className={`${style.formCreate}`} onSubmit={handelSubmit}>
                                <label className='form-label' htmlFor='classification'>Classification</label>
                                <select className="form-select" name='classification' aria-label="Default select example">
                                    {
                                        classification.map((e, i) => {
                                            return (
                                                <option key={i}>{e}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className='form-label' htmlFor='title'>Title</label>
                                <input className='form-control' type='text' name='title' required  />
                                <label className='form-label' htmlFor='date'>Date</label>
                                <input className='form-control' type='date' name='date' required  />
                                <input type="submit" className={`btn ${style.btn}`} value='Save'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header;