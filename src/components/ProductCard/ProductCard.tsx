import styles from './ProductCard.module.css';
import type {ProductCardProps} from './ProductCard.props.ts';
import {Link} from 'react-router-dom';

function ProductCard(props: ProductCardProps) {
    return (
        <Link to={`product/${props.id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.head} style={{backgroundImage: `url(${props.image})`}}>
                    <div className={styles.price}>
                        {props.price}&nbsp;
                        <span className={styles.currency}>₽</span>
                    </div>
                    <button className={styles['add-to-cart']}>
                        <img src="/cart-icon-button.svg" alt="Иконка корзины"/>
                    </button>
                    <div className={styles.rate}>
                        {props.rate}&nbsp;
                        <img src="/rate-icon.svg" alt="Иконка рейтинга"/>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <div className={styles.description}>
                        {props.description}
                    </div>
                </div>

            </div>
        </Link>

    );
}

export default ProductCard;