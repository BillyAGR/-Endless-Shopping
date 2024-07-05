import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context'

const Card = ({ data }) => {
    const context = useContext(ShoppingCartContext)
    const { id, category, images, title, price } = data || {}
    const { name } = category ? category : ''
    const imageUrl = images ? images[0] : ''

    const showProduct = () => {
        context.openProductDetail()
        context.setProductToShow(data)
    }

    const addProductsToCart = (e) => {
        e.stopPropagation()
        context.setCount(prev => prev + 1)
        context.setCartProducts([...context.cartProducts, data])
        context.openCheckoutSideMenu(data)
        context.closeProductDetail()
    }

    const isInCart = context.cartProducts.some(product => product.id === id);

    return (
        <div className='bg-white cursor-pointer w-56 h-60 rounded-lg'
            onClick={showProduct}>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={imageUrl} alt={title} />
                <div className={`absolute top-0 right-0 flex justify-center items-center ${isInCart ? 'bg-black' : 'bg-white'} w-6 h-6 rounded-full m-2 p-1`}
                    onClick={!isInCart ? addProductsToCart : undefined}>
                    {isInCart ? <CheckIcon className='h-6 w-6 text-white' /> : <PlusIcon className='h-6 w-6 text-black' />}
                </div>
            </figure>
            <p className='flex justify-between'>
                <span className='text-sm font-light'>{title}</span>
                <span className='text-lg font-medium'>{price}</span>
            </p>
        </div>
    )
}

export { Card } 