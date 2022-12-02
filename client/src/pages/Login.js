import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import style from '../styles/login.module.css';

function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handelSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div className={`${style.login}`}>
            <form onSubmit={handelSubmit} className={`${style.loginForm}`}>
                <header className={style.header}>
                    <h2>Login</h2>
                    <p>To Do Task</p>
                </header>
                <label className='form-label' htmlFor='email'>Email</label>
                <input 
                    className={`form-control`} 
                    name='email' 
                    type='email' 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className='form-label' htmlFor='password'>Password</label>
                <input 
                    className={`form-control`} 
                    name='password' 
                    type='password' 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <section className={`${style.links}`}>
                    <Link to='/signup'>Don't have an account?</Link>
                    <Link to=''>Forget your password?</Link>
                </section>
                { error && <p className='error'>{error}</p> }
                <input className={`btn ${style.btn}`} name='submit' type='submit' value='Login' disabled={isLoading} />
            </form>
        </div>
    )
}

export default Login;