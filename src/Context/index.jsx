import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {

    // Shopping Cart - Increment quantity
    const [count, setCount] = useState(0)

    //Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Product Detail - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Product Detail - show product
    const [productToShow, setProductToShow] = useState({})

    //Shopping Cart - Add products to car
    const [cartProducts, setCartProducts] = useState([])

    //Shopping Cart - Order
    const [order, setOrder] = useState([])

    // Get products
    const [items, setItems] = useState([])

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Get loading 
    const [loading, setLoaiding] = useState(true)

    // get Error
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

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            loading,
            error
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}