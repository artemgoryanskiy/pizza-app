import Button from '../../components/Button/Button.tsx';
import {useNavigate} from 'react-router';
import styles from './Success.module.css';

function Success() {
    const navigate = useNavigate();
    return (
        <div className={styles.success}>
            <img src="/success.png" alt="Изображение пиццы"/>
            <div className={styles.text}>Ваш заказ успешно оформлен!</div>
            <Button appearance='big' onClick={() => navigate('/')}>Сделать новый</Button>
        </div>
    );
}

export default Success;