import Heading from '../../components/Headling/Heading.tsx';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link} from 'react-router-dom';
import styles from './Register.module.css';
import {type FormEvent, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {register, userActions} from '../../store/user.slice.ts';

export type TRegisterForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    },
    name: {
        value: string;
    },
}

function Register() {
    const navigate = useNavigate();
    const {jwt, registerErrorMessage} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & TRegisterForm;
        const {email, password, name} = target;
        dispatch(register({email: email.value, password: password.value, name: name.value}));
    };
    return (
        <div className={styles.login}>
            <Heading>Регистрация</Heading>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" placeholder="Email" name="email" type="email"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" type="password" name="password" placeholder="Пароль"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input id="name" name="name" placeholder="Имя"/>
                </div>
                <Button appearance="big">Зарегистрироваться</Button>
            </form>
            <div className={styles.links}>
                <div>Есть аккаунт?</div>
                <Link to="/auth/login">
                    Войти
                </Link>
            </div>
        </div>
    );
}

export default Register;