import {NavLink, Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {getProfile, userActions} from '../../store/user.slice.ts';
import {useEffect} from 'react';

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const profile = useSelector((state: RootState) => state.user.profile);
    const items = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return <div className={styles.layout}>
        <div className={styles.sidebar}>
            <div className={styles.user}>
                <img className={styles.avatar} src="/avatar.png" alt="Иконка аватара"/>
                <div className={styles.name}>{profile?.name}</div>
                <div className={styles.email}>{profile?.email}</div>
            </div>
            <div className={styles.menu}>
                <NavLink to="/" className={({isActive}) => (cn(styles.link, {
                    [styles.active]: isActive,
                }))}>
                    <img src="/menu-icon.svg" alt="Иконка меню"/>
                    Меню
                </NavLink>
                <NavLink to="/cart" className={({isActive}) => (cn(styles.link, {
                    [styles.active]: isActive,
                }))}>
                    <img src="/cart-icon.svg" alt="Иконка корзины"/>
                    Корзина
                    <span className={styles.cartCount}>{items.reduce((acc, item) => acc + item.count, 0)}</span>
                </NavLink>
            </div>
            <Button className={styles.exit} onClick={logout}>
                <img src="/exit-icon.svg" alt="Иконка кнопки выхода"/>
                Выход
            </Button>
        </div>
        <div className={styles.content}>
            <Outlet/>
        </div>
    </div>;
}

export default Layout;