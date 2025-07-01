import Heading from '../../components/Headling/Heading.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';

function Menu() {
    return <>
        <div className={styles.head}>
            <Heading>Меню</Heading>
            <Search placeholder="Введите блюдо или состав"/>
        </div>
        <div>
            <ProductCard
                id={1}
                title={'Наслаждение'}
                description={'Салями, руккола, помидоры, оливки'}
                image={'/image.png'}
                price={300}
                rate={4.5}
            />
        </div>

    </>;
}

export default Menu;