import Heading from '../../components/Headling/Heading.tsx';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import CartItem from '../../components/CartItem/CartItem.tsx';
import {useEffect, useState} from 'react';
import type {IProduct} from '../../types/product.type.ts';
import axios from 'axios';
import {PREFIX} from '../../helpers/API.ts';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button.tsx';
import {useNavigate} from 'react-router';
import {cartActions} from '../../store/cart.slice.ts';

const DELIVERY_PRICE = 169;

function Cart() {
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const {items} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const jwt = useSelector((state: RootState) => state.user.jwt);
    const navigate = useNavigate();
    const total = items.map(item => {
        const product = cartProducts.find(p => p.id === item.id);
        if (!product) {
            return 0;
        }
        return item.count * product.price;
    }).reduce((acc, item) => acc + item, 0);

    const getItem = async (id: number) => {
        const {data} = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(item => getItem(item.id)));
        setCartProducts(res);
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch(cartActions.clean());
        navigate('/success');
    }

    return <>
        <Heading className={styles.head}>Корзина</Heading>
        {items.map(item => {
            const product = cartProducts.find(p => p.id === item.id);
            if (!product) {
                return;
            }
            return <CartItem key={item.id} count={item.count} {...product}/>;
        })}
        <div className={styles.line}>
            <div className={styles.text}>Итог</div>
            <div className={styles.price}>
                {total}<span className={styles.currency}>&nbsp;₽</span>
            </div>
        </div>
        <hr className={styles.hr}/>
        <div className={styles.line}>
            <div className={styles.text}>Доставка</div>
            <div className={styles.price}>{DELIVERY_PRICE}<span className={styles.currency}>&nbsp;₽</span></div>
        </div>
        <hr className={styles.hr}/>
        <div className={styles.line}>
            <div className={styles.text}>Итог <span className={styles.totalCount}>({items.length})</span></div>
            <div className={styles.price}>{total + DELIVERY_PRICE}<span className={styles.currency}>&nbsp;₽</span></div>
        </div>
        <div className={styles.checkout}>
            <Button appearance='big' onClick={checkout}>Оформить</Button>
        </div>
    </>;
}

export default Cart;