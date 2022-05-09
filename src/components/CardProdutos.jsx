import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton';
import Link from "next/link";

export default function CardProdutos(params) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componenteMounted = true;
     
    useEffect(() => {
        const getProduto = async () => {
            setLoading(true);
            const resposta = await fetch("https://fakestoreapi.com/products");
            if(componenteMounted){
                setData(await resposta.clone().json());
                setFilter(await resposta.json());
                setLoading(false);
            }
            return () => {
                componenteMounted = false
            }
        }
        getProduto();
       
    }, []);
    const Loading = () => {
        return (
            <div>
                <div className='m-3'>
                    <Skeleton  height={350}/>
                </div>
                <div className='m-3'>
                    <Skeleton  height={350}/>
                </div>
                <div className='m-3'>
                    <Skeleton  height={350}/>
                </div>
            </div>
        )
    }
    const filterProduto = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }
    const ShowProdutos = () => {
        return (
            <div className='container flex flex-col w-full items-center justify-center'>
                <div>
                    <button onClick={() => setFilter(data)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2'> Todos</button>
                    <button onClick={() => filterProduto("men's clothing")} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2'> Masculino</button>
                    <button onClick={() => filterProduto("women's clothing")} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2'> Feminino</button>
                    <button onClick={() => filterProduto("jewelery")} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2'> Joias</button>
                    <button onClick={() => filterProduto("electronics")} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2'> Eletronicos</button>

                </div>
                <div className='flex flex-row container w-full flex-wrap items-center justify-center'>
                    {filter.map((produto) => {
                    return(
                    
                            <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 m-4 min-h-96 produtos"  key={produto.id}>
                                <img
                                    src={produto.image}
                                    alt={produto.title}
                                />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{produto.title.substring(0,12)}</div>
                                    <p className="text-grey-darker text-base">
                                    R$ {produto.price}
                                    </p>
                                </div>
                                <div className="px-6 py-4 w-full">
                                    <Link href={`/produto/${produto.id}`}>
                                        <a class="w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                            Ver Produto
                                        </a>
                                    </Link>
                                   
                                </div>
                            </div>                    
                    )
                })}
            </div>
            </div>

        )
    }
    return (
        
        <div className="container w-full flex flex-col justify-center items-center">
            {loading ? <Loading /> : <ShowProdutos />}
            
        </div>
    )
}