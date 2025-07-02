import {Outlet} from 'react-router-dom';
import styles from './Auth.layout.module.css'

function AuthLayout() {
    return <div className={styles.layout}>
        <div className={styles.logo}>
            <img src="/logo.svg" alt="Изображение логотипа"/>
        </div>
        <div className={styles.content}>
            <Outlet/>
        </div>
    </div>;
}

export default AuthLayout;