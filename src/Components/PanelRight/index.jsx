import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { CheckoutSideMenu } from '../CheckoutSideMenu'
import { ProductDetail } from '../ProductDetail'
import './styles.css'

const PanelRight = () => {

    const {
        isCheckoutSideMenuOpen,
        isProductDetailOpen
    } = useContext(ShoppingCartContext)

    return (
        <aside className={`flex panel-right flex-col fixed top:1 right-0 border border-black rounded-lg bg-white 
            transition-transform duration-300 transform ${isCheckoutSideMenuOpen || isProductDetailOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {isCheckoutSideMenuOpen ? (<CheckoutSideMenu />) : isProductDetailOpen ? (<ProductDetail />) : null}
        </aside>
    )
}

export { PanelRight }