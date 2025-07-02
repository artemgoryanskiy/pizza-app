import {useLoaderData} from 'react-router-dom';
import type {IProduct} from '../../types/product.type.ts';

function Product() {
    const data = useLoaderData() as IProduct

    return <>{data.name}</>;
}

export default Product;