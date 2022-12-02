import Side from '../components/Side';
import Header from '../components/Header';
import style from '../styles/setting.module.css';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

function Sitting () {
    const { user } = useAuthContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const chackPassword = () => {
        
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/checkPassword', {
            password: oldPassword,
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => {
            if (res.status === 200 && newPassword === reNewPassword) {
                axios.post('http://localhost:5000/api/user/changePassword', {
                    password: reNewPassword,
                }, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }).then(result => {
                    console.log(result.data)
                })
            }
        })
    }

    return (
        <div className={`page home`}>
            <Side />
            <div className='container'>
                <Header />
                <section className={`${style.setting}`}>
                    <header>
                        <h2>Setting</h2>
                    </header>
                    <section className={`${style.changePasswordSec}`}>
                        <header>
                            <h4>Change Password</h4>
                        </header>
                        <form className={`${style.changePasswordForm}`} onSubmit={handelSubmit}>
                            <input 
                                className={`form-control`} 
                                type='text' 
                                required 
                                placeholder='old password'
                                onChange={(e) => setOldPassword(e.target.value)}
                                value={oldPassword}
                            />
                            <input 
                                className={`form-control`} 
                                type='text' 
                                required 
                                placeholder='new password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                            <input 
                                className={`form-control`} 
                                type='text' 
                                required 
                                placeholder='repete new password'
                                onChange={(e) => setReNewPassword(e.target.value)}
                                value={reNewPassword}
                            />
                            <input className={`btn`} name='submit' type='submit' value='Change' />
                        </form>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default Sitting;