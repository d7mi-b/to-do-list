import style from '../styles/side.module.css';
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTableCellsLarge, 
    faFire, 
    faCalendarDays, 
    faUserPlus, 
    faCircleXmark, 
    faCalendarDay,
    faCircleInfo,
    faXmark,
    faGear
} from '@fortawesome/free-solid-svg-icons';

function Side () {
    const { logout } = useLogout();

    const handelLogout = () => {
        logout();
    }

    const hiddenSide = () => {
        const side = document.getElementById('side');

        side.style.cssText = 'visibility: hidden;'
    }

    return (
        <aside className={style.side} id='side' >
            <header className={style.header} >
                <h1>To Do</h1>
                <FontAwesomeIcon className={style.cancelBtn} onClick={hiddenSide} icon={faXmark} size='xl' />
            </header>

            <ul className={`list-group-flush ${style.list}`}>

                <li className='list-group-item'>
                    <p className={style.list}>
                        <FontAwesomeIcon icon={faCalendarDay} />
                        <Link to='/'>Today</Link>
                    </p>
                </li>

                <li className='list-group-item'>
                    <header>
                        <p>Eisenhower Matrix</p>
                    </header>
                    <ul className={`list-group-flush ${style.list}`}>
                        <li className='list-group-item'>
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                            <Link to='/overview'>Overview</Link>
                        </li>
                        <li className='list-group-item'>
                            <FontAwesomeIcon icon={faFire} />
                            <Link to='/do-first'>Do First</Link>
                        </li>
                        <li className='list-group-item'>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <Link to='/do-later'>Do Later</Link>
                        </li>
                        <li className='list-group-item'>
                        <FontAwesomeIcon icon={faUserPlus} />
                            <Link to='/delegate'>Delegate</Link>
                        </li>
                        <li className='list-group-item'>
                            <FontAwesomeIcon icon={faCircleXmark} />
                            <Link to='/dont-do'>Don't Do</Link>
                        </li>
                    </ul>
                </li>

                <li className={`list-group-item ${style.listAbout}`}>
                    <p className={style.list}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <Link to='/about'>About Eisenhower Matrix</Link>
                    </p>
                </li>

                <li className='list-group-item'>
                    <p className={style.list}>
                        <FontAwesomeIcon icon={faGear} />
                        <Link to='/setting'>Setting</Link>
                    </p>
                </li>

            </ul>

            <button className='btn' onClick={handelLogout}>Log out</button>

            <footer className={style.footer}>
                <p><a href='https://twitter.com/d7mii_b'>Abdulrahman</a> &copy; 2022</p>
            </footer>
        </aside>
    )
}

export default Side;