import Heading from '../../components/Headling/Heading.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import {PREFIX} from '../../helpers/API.ts';
import type {IProduct} from '../../types/product.type.ts';
import {type ChangeEvent, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import MenuList from '../../layout/Menu/MenuList/MenuList.tsx';


function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter)
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const {data} = await axios.get<IProduct[]>(`${PREFIX}/products`, {params: {name}});
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

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }



    return <>
        <div className={styles.head}>
            <Heading>Меню</Heading>
            <Search placeholder="Введите блюдо или состав" onChange={updateFilter}/>
        </div>
        <div>
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products}/>}
            {isLoading && <>Загружаем продукты...</>}
            {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
        </div>

    </>;
}

export default Menu;



