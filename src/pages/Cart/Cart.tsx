import Heading from '../../components/Headling/Heading.tsx';
import {useSelector} from 'react-redux';
import type {RootState} from '../../store/store.ts';
import CartItem from '../../components/CartItem/CartItem.tsx';
import {useEffect, useState} from 'react';
import type {IProduct} from '../../types/product.type.ts';
import axios from 'axios';
import {PREFIX} from '../../helpers/API.ts';


function Cart() {
    const [cartProducts, setCartProducts] = useState<IProduct[]>([])
    const items = useSelector((state: RootState) => state.cart.items);

    const getItem = async (id: number) => {
        const {data} = await axios.get<IProduct>(`${PREFIX}/products/${id}`)
        return data;
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(item => getItem(item.id)));
        setCartProducts(res)
    }

    useEffect(() => {
        loadAllItems()
    }, [items]);

    return <>
        <Heading>Корзина</Heading>
        {items.map(item => {
            const product = cartProducts.find(p => p.id === item.id);
            if (!product) {
                return;
            }
            return <CartItem count={item.count} {...product}/>
        })}
    </>;
}

export default Cart;