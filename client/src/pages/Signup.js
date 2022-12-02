import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import style from '../styles/login.module.css';

function Signup () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handelSubmit = async (e) => {
        e.preventDefault();

        await signup(name, email, password);
    }

    return (
        <div className={`${style.login}`}>
            <form onSubmit={handelSubmit} className={`${style.loginForm}`}>
                <header className={style.header}>
                    <h2>Sign Up</h2>
                    <p>To Do Task</p>
                </header>
                <label className='form-label' htmlFor='name'>Name</label>
                <input 
                    className={`form-control`} 
                    name='name' 
                    type='text' 
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
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
                    <Link to='/'>Do you have an account? Login</Link>
                    <Link to=''>Forget your password?</Link>
                </section>
                { error && <p className='error'>{error}</p> }
                <input className={`btn ${style.btn}`} name='submit' type='submit' value='Sign up' disabled={isLoading} />
            </form>
        </div>
    )
}

export default Signup;