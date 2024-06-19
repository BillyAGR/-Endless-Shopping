import { useState, useEffect } from 'react'
import { Layout } from '../../Components/Layout'
import { Card } from '../../Components/Card'
import { ProductDetail } from '../../Components/ProductDetail'

function Home() {
    const [items, setItems] = useState([])
    const [loaiding, setLoaiding] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetcData = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                if (!response.ok) {
                    throw new Error(`HTTPS Error! status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoaiding(false);
            }
        }
        fetcData();
    }, [])

    if (loaiding) {
        return (<Layout>
            <div>
                Loading...
            </div>
        </Layout>)
    }

    if (error) {
        return (<Layout>
            <div>
                Error: {error}
            </div>
        </Layout>)
    }

    return (
        <Layout>
            Home
            <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
                {
                    items?.map(item => (
                        item.images?.length > 0 && !item.images[0]?.startsWith("[") && (
                            <Card key={item.id} data={item} />
                        )
                    ))
                }
            </div>
            <ProductDetail />
        </Layout>
    )
}

export { Home }