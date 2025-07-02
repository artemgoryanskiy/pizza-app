import Heading from '../../components/Headling/Heading.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import {PREFIX} from '../../helpers/API.ts';
import type {IProduct} from '../../types/product.type.ts';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import MenuList from '../../layout/Menu/MenuList/MenuList.tsx';


function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const getMenu = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get<IProduct[]>(`${PREFIX}/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    return <>
        <div className={styles.head}>
            <Heading>Меню</Heading>
            <Search placeholder="Введите блюдо или состав"/>
        </div>
        <div>
            {error && <>{error}</>}
            {!isLoading && <MenuList products={products}/>}
            {isLoading && <>Загружаем продукты...</>}

        </div>

    </>;
}

export default Menu;



