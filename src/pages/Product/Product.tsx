import {useLoaderData} from 'react-router-dom';
import type {IProduct} from '../../types/product.type.ts';
import styles from './Product.module.css';
import Heading from '../../components/Headling/Heading.tsx';
import Button from '../../components/Button/Button.tsx';
import {useNavigate} from 'react-router';

function Product() {
    const data = useLoaderData() as IProduct;
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <button className={styles.button} onClick={() => {navigate(-1)}}><img src="/arrow-icon.svg" alt="Иконка стрелки"/></button>
                <Heading>{data.name}</Heading>
                <Button className={styles.cartButton}><img src="/cart-icon-button.svg" alt=""/>В корзину</Button>
            </div>
            <div className={styles.body}>
                <img className={styles.image} src={data.image} alt={data.name}/>
                <div className={styles.description}>
                    <div className={styles.line}>
                        <p className={styles.text}>Цена</p>
                        <p className={styles.price}>{data.price} <span className={styles.currency}>&nbsp;₽</span></p>
                    </div>
                    <div className={styles.line}>
                        <p className={styles.text}>Рейтинг</p>
                        <div className={styles.rate}>
                            {data.rating}&nbsp;
                            <img src="/rate-icon.svg" alt="Иконка рейтинга"/>
                        </div>
                    </div>
                    <div className={styles.ingredients}>
                        <p className={styles.ingredientsText}>Состав:</p>
                        <ul>
                            {data.ingredients.map((ingredient, index) => (
                                <li className={styles.ingredientsDesc} key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;