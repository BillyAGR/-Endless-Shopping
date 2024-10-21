import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { Layout } from '../../Components/Layout'

function SignIn() {
    const {
        account,
        setAccount,
        accountsUsers,
    } = useContext(ShoppingCartContext)

    const [errors, setErrors] = useState({ email: '', password: '', auth: '' })

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validatePassword = (password) => {
        return password?.length >= 6
    }

    const handleEmailChange = (e) => {
        const email = e.target.value
        setAccount({ ...account, email })
        setErrors({
            ...errors,
            email: validateEmail(email) ? '' : 'Please enter a valid email address'
        })
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value
        setAccount({ ...account, password })
        setErrors({
            ...errors,
            password: validatePassword(password) ? '' : 'Password must be at least 6 characters long'
        })
    }

    const authenticateUser = (e) => {
        e.preventDefault()
        const user = Array.isArray(accountsUsers) && accountsUsers.find(accountUser =>
            accountUser.email === account.email && accountUser.password === account.password
        )

        if (!user) {
            setErrors({
                ...errors,
                auth: 'User or password are not valid'
            })
        } else {
            setErrors({ email: '', password: '', auth: '' })
            console.log('Authenticated successfully')
        }
    }

    const isFormValid = account && validateEmail(account.email) && validatePassword(account.password)

    return (
        <Layout>
            <div className='flex items-center justify-center min-h-screen -mt-20'>
                <form className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center' onSubmit={authenticateUser}>
                    <h1 className='font-medium text-3xl mb-6'>Shopi</h1>

                    <label htmlFor='email' className='self-start mb-2'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        onChange={handleEmailChange}
                        required
                        placeholder='Email@dominio.com'
                        className={`rounded-lg border w-80 p-3 mb-4 focus:outline-none ${errors.email ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.email && <span className='text-red-500 mb-2'>{errors.email}</span>}

                    <label htmlFor='password' className='self-start mb-2'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        onChange={handlePasswordChange}
                        required
                        placeholder='Password'
                        className={`rounded-lg border w-80 p-3 mb-4 focus:outline-none ${errors.password ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.password && <span className='text-red-500 mb-2'>{errors.password}</span>}

                    <button
                        type='submit'
                        className='bg-black py-3 text-white w-full rounded-lg mb-4 hover:bg-gray-700'
                        disabled={!isFormValid}
                    >
                        Log in
                    </button>

                    {errors.auth && <span className='text-red-500 mb-4'>{errors.auth}</span>}

                    <a href='#' className='text-blue-500 mb-4'>Forgot my password?</a>

                    <Link to='/' className='w-full'>
                        <button
                            className='bg-gray-400 py-3 text-white w-full rounded-lg hover:bg-gray-500'
                        >
                            Sign up
                        </button>
                    </Link>
                </form>
            </div>
        </Layout>
    )
}

export { SignIn }
