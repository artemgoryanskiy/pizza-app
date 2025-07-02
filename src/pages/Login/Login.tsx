import Heading from '../../components/Headling/Heading.tsx';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import type {FormEvent} from 'react';

function Login() {
    const submit = (e: FormEvent) => {
        e.preventDefault()
        console.log(e);
    }
    return (
        <div className={styles.login}>
            <Heading>Вход</Heading>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" placeholder="Email" type="email"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" type="password" placeholder="Пароль"/>
                </div>
                <Button appearance="big">Вход</Button>
            </form>
            <div className={styles.links}>
                <div>Нет акканута?</div>
                <Link to='auth/register'>
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    );
}

export default Login;