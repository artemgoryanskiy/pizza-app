import Heading from '../../components/Headling/Heading.tsx';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import {type FormEvent, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {login, userActions} from '../../store/user.slice.ts';

export type TLoginForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    }
}

function Login() {
    const navigate = useNavigate();
    const {jwt, loginErrorMessage } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({email, password}))
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & TLoginForm;
        const {email, password} = target;
        await sendLogin(email.value, password.value);
    };
    return (
        <div className={styles.login}>
            <Heading>Вход</Heading>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" placeholder="Email" name="email" type="email"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" type="password" name="password" placeholder="Пароль"/>
                </div>
                <Button appearance="big">Вход</Button>
            </form>
            <div className={styles.links}>
                <div>Нет акканута?</div>
                <Link to="/auth/register">
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    );
}

export default Login;