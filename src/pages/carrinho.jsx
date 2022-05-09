import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delCart, addCart, removeCart }  from '../redux/action/index';

export default function Carrinho() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const addProduto = (product) => {
      dispatch(addCart(product))
  }
  const delProduto = (product) => {
    dispatch(delCart(product))
}
  const handleClose = (item) => {
    dispatch(removeCart(item))
  }
  
  const cartItems = (cartItem) => {
    return(
      <div className="flex justify-between items-center pt-6 mt-6 border-t" key={cartItem.id}>
      <div className="flex  items-center">
        <img src={cartItem.image} width="60"  alt={cartItem.title} />

        <div className="flex flex-col ml-3 ">
          <span className="text-md font-medium w-auto">{cartItem.title}</span>
          <span className="text-xs font-light text-gray-400">Variantes</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pr-8 flex">
          <span className="font-semibold cursor-pointer" onClick={() => delProduto(cartItem)}>-</span>
          <input type="text" className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" value={cartItem.qty} />
          <span className="font-semibold cursor-pointer" onClick={() => addProduto(cartItem)}>+</span>
        </div>
        <div className="pr-8">
          
          <span className="text-xs font-medium">R$ {cartItem.price}</span>
        </div>
        <div>
          <button onClick={() => handleClose(cartItem)}> X </button>
        </div>
      </div>
    </div>
    )
  }

  const emptyCart = () => {
    return(
      <>
        <h1 className="text-xl font-medium p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex">
           O carrinho está vazio
        </h1>
      </>
    )
  }

  const button = () => {
    return (
      <button className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600">Finalizar Compra</button>

    )
  }
  var total = 0
 const valorItems = (item) => {
  
  total = total + item.price * item.qty;
    
 }
 
 var zero = 0;
  return (
    <div>
        <div className=" w-full flex justify-center items-center">
	        <div className="py-12">      
            <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg  md:max-w-6xl">
                <div className="md:flex ">
                    <div className="w-full p-4 px-5 py-5">
                      <div className="md:grid md:grid-cols-3 gap-2 ">
                        <div className="col-span-2 p-5">
                          <h1 className="text-xl font-medium ">Carrinho de compra</h1>
                          {state.length === 0 && emptyCart()}
                          {state.length !== 0 && state.map(cartItems)}
                          {state.map(valorItems)}
                          
                        </div>
                        <div className=" p-5 bg-gray-800 rounded overflow-visible">
                          <div className="flex justify-between">
                          <span className="text-xl font-medium text-gray-100 block pb-3">Total</span>
                          <span className="text-xl font-medium text-gray-100 block pb-3">R$ {(zero) = state.length === 0 ? 0 : total.toLocaleString('de-DE')}</span>
                          </div>
                          <span className="text-xs text-gray-400 ">Cartão</span>
                          <div className="overflow-visible flex justify-between items-center mt-2">
                            <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                              <span className="italic text-lg font-medium text-gray-200 underline">VISA</span>
                              <div className="flex justify-between items-center pt-4 ">
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-xs  text-gray-200">Nome do prorpietario</span>
                                <span className="text-xs  text-gray-200">MM/AA</span>
                              </div>                              
                            </div>
                            <div className="flex justify-center  items-center flex-col">
                              <img src="https://img.icons8.com/color/96/000000/mastercard-logo.png" width="40" className="relative right-5" />
                              <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">mastercard.</span>
                            </div>
                          </div>

                          <div className="flex justify-center flex-col pt-3">
                            <label className="text-xs text-gray-400 ">Nome do prorpietario</label>
                            <input type="text" className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4" placeholder="Digita o nome do proprietario" />
                          </div>

                          <div className="flex justify-center flex-col pt-3">
                            <label className="text-xs text-gray-400 ">Numero do cartão</label>
                            <input type="text" className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4" placeholder="****     ****      ****      ****" />
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                            <div className="col-span-2 ">
                              <label className="text-xs text-gray-400">Data de Validade</label>
                              <div className="grid grid-cols-2 gap-2">

                                <input type="text" className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4" placeholder="mm" />
                                <input type="text" className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4" placeholder="yyyy" />
                                
                              </div>
                            </div>
                            <div className="">
                              <label className="text-xs text-gray-400">CVV</label>
                              <input type="text" className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4" placeholder="XXX" />
                            </div>
                          </div>
                          {state.length !== 0 && button()}
                        </div>            		
                      </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}
