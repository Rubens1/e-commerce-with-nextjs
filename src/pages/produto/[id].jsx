import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/action';

export default function Product() {
    const {query} = useRouter();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const id = query.id;

    const dispatch = useDispatch();
    const addProduto = (product) => {
        dispatch(addCart(product))
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct( await res.json());
            setLoading(false);

        }
        getProduct();
    }, []);
    const Loading = () => {
        return (
            <div>
                <p className='text-lg font-semibold text-slate-900'>Carregando...</p>
            </div>
        )
    }
    const ShowProduct = () => {
        return(
            <div className="flex font-sans w-4/5">
                <div className="flex-none w-96 relative">
                    <img src={product.image} alt={product.title} className=" inset-0 w-full h-full object-cover" />
                </div>
                <form className="flex-auto p-6">
                    <div className="flex flex-col flex-wrap">
                        <p>{product.category}</p>
                    <h1 className="flex-auto text-lg font-semibold text-slate-900">
                    {product.title}
                    </h1>
                    <div className="text-lg font-semibold text-slate-500">
                        $ {product.price}
                    </div>
                    </div>
                    <div className="flex space-x-4 mb-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <button type="button" className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={() => addProduto(product)}>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-700">
                        Entrega em todo lugar do Brasil
                    </p>
                </form>
            </div>

        );
    }
    return (
        <div className='container max-auto flex flex-col justify-center items-center'>
           {loading ? <Loading /> : <ShowProduct />}
        </div>
    )
}