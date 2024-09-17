import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const OverlayDark = () => {
    const {
        displayMode,
        setDisplayMode
    } = useContext(ShoppingCartContext)

    return (
        <div className={`${displayMode === 'hidden' ? 'hidden' : 'flex fixed inset-0 z-40 top-0 h-full cursor-pointer bg-gray-400 opacity-55 lg:hidden'}`}
        onClick={() =>{setDisplayMode('hidden')}}/>
    )
}

export { OverlayDark }