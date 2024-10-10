import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) { //Hook user
    const [item, setItem] = useState(() => {
        try {
            const storedItem = localStorage.getItem(key)
            return storedItem ? JSON.parse(storedItem) : initialValue
        } catch (error) {
            console.error('Error reading localStorage', error)
            return initialValue
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(item))
        } catch (error) {
            console.error('Error saving to localStorage', error)
        }
    }, [key, item])

    return [item, setItem]
}

export { useLocalStorage }
