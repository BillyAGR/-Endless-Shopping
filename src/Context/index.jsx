import { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {

    //My Account
    const [account, setAccount] = useLocalStorage('account', {})

    //singOut 
    const [signOut, setSignOut] = useLocalStorage('sign-out', false) 
    
    // Shopping Cart - Increment quantity
    const [count, setCount] = useState(0)

    // Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    // Product Detail - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail - show product
    const [productToShow, setProductToShow] = useState({})

    // Shopping Cart - Add products to car
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart - Order
    const [order, setOrder] = useState([])

    // Get products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    // Get loading 
    const [loading, setLoading] = useState(true)

    // Get Error
    const [error, setError] = useState(null)

    // Initial displayMode to 'hidden'
    const [displayMode, setDisplayMode] = useState('hidden')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                if (!response.ok) {
                    throw new Error(`HTTPS Error! status : ${response.status}`);
                }

                const data = await response.json();
                setItems(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    // Filter functions
    const filterItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, title, searchByCategory) => {
        if (searchByCategory === 'All') return items
        return items?.filter(item => item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterItemsByTitleAndCategory = (items, title, category) => {
        return filteredItemsByCategory(items, title, category).filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
    };

    // Filter by
    const filterBy = {
        BY_TITLE: (items, title) => filterItemsByTitle(items, title),
        BY_CATEGORY: (items, title, category) => filteredItemsByCategory(items, title, category),
        BY_TITLE_AND_CATEGORY: (items, title, category) => filterItemsByTitleAndCategory(items, title, category)
    };

    // Apply filters
    useEffect(() => {
        if (searchByTitle || searchByCategory) {
            const searchType = searchByTitle && searchByCategory ? 'BY_TITLE_AND_CATEGORY'
                : searchByTitle ? 'BY_TITLE' : 'BY_CATEGORY'
            setFilteredItems(filterBy[searchType](items, searchByTitle, searchByCategory))
        } else {
            setFilteredItems(items)
        }
    }, [items, searchByTitle, searchByCategory]);

    return (
        <ShoppingCartContext.Provider value={{
            account,
            setAccount,
            signOut,
            setSignOut,
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
            filteredItems,
            searchByTitle,
            setSearchByTitle,
            searchByCategory,
            setSearchByCategory,
            loading,
            error,
            displayMode,
            setDisplayMode
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}