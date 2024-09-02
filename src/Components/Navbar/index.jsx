import { ShoppingBagIcon, Bars4Icon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import { routes } from './Routes.jsx'

const Navbar = () => {
    const {
        cartProducts,
        setSearchByCategory,
        openProductDetail,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        closeProductDetail,
        displayMode,
        setDisplayMode
    } = useContext(ShoppingCartContext);

    const routesA = routes.filter(route => route.section === 1)
    const routesB = routes.filter(route => route.section === 2)
    const activeStyle = 'underline underline-offset-4'
    const inactiveStyle = 'hover:bg-gray-200 rounded-full p-1'

    const handleProductClick = (e) => {
        e.stopPropagation()
        openCheckoutSideMenu()
        openProductDetail()
        setDisplayMode('hidden')
    }

    const toggleDisplayMode = (e) => {
        e.stopPropagation()
        setDisplayMode(prevMode => (prevMode === 'hidden' ? 'flex' : 'hidden'))
        closeCheckoutSideMenu()
        closeProductDetail()
    }

    const renderNavLink = (route, onClick) => (
        <li key={route.to} className={route.to === '/' ? 'font-semibold text-lg' : ''} onClick={onClick}>
            <NavLink
                to={route.to}
                className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
                {route.title}
            </NavLink>
        </li>
    )
    
    const renderShopping = (display, ml) => (
        <li className={`${display} items-center ${ml} cursor-pointer lg:flex`} onClick={handleProductClick}>
            <ShoppingBagIcon className='h-6 w-6 text-black'  />
            <div>{cartProducts.length}</div>
        </li>
    )

    return (
        <nav>
            <div className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white lg:hidden'>
                <ul className='flex w-full'>
                    <li>
                        <Bars4Icon
                            className='h-6 w-6 cursor-pointer'
                            onClick={toggleDisplayMode}
                        />
                    </li>
                    {renderShopping('flex', 'ml-auto')}
                </ul>
            </div>

            <div className={`${displayMode} flex-col justify-between items-center fixed top-14 z-10 w-50 h-full py-5 px-8 text-sm font-light bg-gray-100 rounded-lg
            lg:top-0 lg:flex lg:flex-row lg:w-full lg:h-auto lg:bg-white`}>
                <ul className='flex flex-col items-start gap-3 lg:flex-row lg:items-center'>
                    {routesA.map(route => renderNavLink(route, route.to === '/' ? () => setSearchByCategory(null) : () => setSearchByCategory(route.title)))}
                </ul>

                <ul className='flex flex-col gap-3 py-12 lg:flex-row lg:justify-center lg:py-0'>
                    <li className='text-black/60'>user@dominio.com</li>
                    {routesB.map(route => renderNavLink(route))}
                    {renderShopping('hidden', '')}
                </ul>
            </div>
        </nav>
    )
}

export { Navbar }
