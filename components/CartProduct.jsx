import React from 'react'
import { urlFor } from '../lib/client';
import { decrementQuantity, incrementQuantity, removeCartItem } from '../store/reducers/cartReducer';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
// import useFormattedAmount from '../hooks/useCurrencyFormatter';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';

export default function CartProduct({item}) {
  const formatCurrency = useCurrencyFormatter("NGN")
  
//   console.log(formattedAmount, item)
 const handleRemoveFromCart = (product) => {
    dispatch(removeCartItem({ product }));
  };
    const dispatch = useDispatch()
  return (
    <div>
         <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="w-[150px] h-auto rounded-lg" />
              <div className="w-full  flex flex-col gap-2">
                <div className="flex flex-col w-full gap-2 items-start justify-between">
                  <p className='text-md'>{item?.name}</p>
                  <p className='text-md'>{formatCurrency(item?.price)}</p>
                </div>
                <div className="flex justify-between items-center   ">
                <div className="quantity-desc grid grid-cols-3  items-center w-2/3 ">
              <p className="px-3 minus cursor-pointer" onClick={() => dispatch(decrementQuantity({ id: item?._id })) }><AiOutlineMinus /></p>
              <p className="px-3 num">{item?.quantity}</p>
              <p className="px-3 plus cursor-pointer" onClick={() => dispatch(incrementQuantity({ id: item?._id })) }><AiOutlinePlus /></p>
            </div>
                
                  <button
                    type="button"
                    className="remove-item"
                    onClick={()=> handleRemoveFromCart(item)}
                  
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
    </div>
  )
}
