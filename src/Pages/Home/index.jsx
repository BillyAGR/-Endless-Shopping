import { useContext } from 'react'
import { Layout } from '../../Components/Layout'
import { Card } from '../../Components/Card'
import { ProductDetail } from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {

    const {
        items,
        loading,
        error,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        filteredItems } = useContext(ShoppingCartContext)

    const renderView = () => {

        const itemsRender = (searchByTitle?.length > 0 || searchByCategory?.length > 0) ? filteredItems : items

        if (itemsRender.length > 0) {
            return (itemsRender?.map(item => (
                <Card key={item.id} data={item} />
                // item.images?.length > 0 && !item.images[0]?.startsWith("[") && (
                //     <Card key={item.id} data={item} />
                // )
            )))
        } else {
            return (
                <div>
                    No Results Found.
                </div>
            )
        }
    }

    if (loading) {
        return (
            <Layout>
                <div>
                    Loading...
                </div>
            </Layout>)
    }

    if (error) {
        return (
            <Layout>
                <div>
                    Error: {error}
                </div>
            </Layout>)
    }

    return (
        <Layout>
            <div className='flex items-center justify-center relative w-80 mb-4'>
                <h1 className='font-medium text-xl'>Exclusive Products</h1>
            </div>
            <input
                type="text"
                placeholder='Search a product'
                className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                onChange={(event) => setSearchByTitle(event.target.value)}
            />
            <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
                {renderView()}
            </div>
            <ProductDetail />
        </Layout>
    )
}

export { Home }