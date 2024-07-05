import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { Layout } from '../../Components/Layout';
import { OrderCard } from '../../Components/OrderCard';

function MyOrder() {
    const { order } = useContext(ShoppingCartContext);
    const { id } = useParams();
    const indexOrderPath = Number(id);

    // Determines the index of the order to display
    const orderIndex = isNaN(indexOrderPath) ? order?.length - 1 : indexOrderPath;

    // Gets the list of products for the current order
    const products = order?.[orderIndex]?.products || [];

    return (
        <Layout>
            <div className='flex items-center justify-center relative w-80 mb-6'>
                <Link to='/my-orders' className='absolute left-0'>
                    <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
                </Link>
                <h1 className='font-medium text-xl' >My Order</h1>
            </div>

            <div className="flex flex-col w-80">
                {products.length > 0 ? (
                    products.map((product) => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images[0]}
                            price={product.price}
                        />
                    ))
                ) : (
                    <p>No products found in this order.</p>
                )}
            </div>
        </Layout>
    );
}

export { MyOrder };
