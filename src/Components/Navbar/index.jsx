
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import { routes } from './Routes.jsx'

const Navbar = () => {
    const { cartProducts, setSearchByCategory} = useContext(ShoppingCartContext);
    const routesA = routes.filter((filter) => filter.section === 1)
    const routesB = routes.filter((filter) => filter.section === 2)
    const activeStyle = "underline underline-offset-4"

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
            <ul className="flex items-center gap-3">
                {routesA.map((route) => (
                    <li
                        key={route.to}
                        className={route.to === "/" ? "font-semibold text-lg" : ''}
                        onClick={route.to === "/" ? () => setSearchByCategory(null)  : null}
                    >
                        <NavLink
                            to={route.to}
                            className={({ isActive }) => isActive ? activeStyle : ''}
                            onClick={route.to !== "/" ? () => setSearchByCategory(route.title)  : null}
                        >
                            {route.title}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <ul className="flex justify-center gap-3">
                <li className="text-black/60">
                    user@dominio.com
                </li>
                {routesB.map((route) => (
                    <li key={route.to}>
                        <NavLink
                            to={route.to}
                            className={({ isActive }) => isActive ? activeStyle : ''}
                        >
                            {route.title}
                        </NavLink>
                    </li>
                ))}
                <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6 w-6 text-black' />
                    <div>
                        {cartProducts.length}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export { Navbar }
