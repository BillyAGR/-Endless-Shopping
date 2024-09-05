import { ChevronRightIcon, CalendarDaysIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { dateFormatte } from '../../utils'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props

    return (

        <div className='flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80' >
            <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                    <div className='flex gap-1'>
                        <CalendarDaysIcon className='h-6 w-6 text-black cursor-pointer' />
                        <span className='font-light'>{dateFormatte()}</span>
                    </div>
                    <div className='flex gap-1'>
                        <ShoppingBagIcon className='h-6 w-6 text-black cursor-pointer' />
                        <span className='font-light'>{totalProducts} articles</span>
                    </div>
                </div>
                <p className='flex items-center gap-2'>
                    <span className='font-medium text-2xl'>${totalPrice} </span>
                    <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
                </p>
            </div>
        </div>

    )
}

export { OrdersCard }