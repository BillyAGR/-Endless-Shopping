import { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { Layout } from '../../Components/Layout'

function MyAccount() {
    const {
        account,
        setAccount,
        setAccountsUsers,
        setSignOut
    } = useContext(ShoppingCartContext)

    const [errors, setErrors] = useState({ email: '', password: '', auth: '' })
    const navigate = useNavigate()
    const form = useRef(null)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validatePassword = (password) => {
        return password?.length >= 6
    }

    const handleEmailChange = (e) => {
        const email = e.target.value
        setErrors({
            ...errors,
            email: validateEmail(email) ? '' : 'Please enter a valid email address'
        })
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value
        setErrors({
            ...errors,
            password: validatePassword(password) ? '' : 'Password must be at least 6 characters long'
        })
    }

    const editUser = (e) => {
        e.preventDefault()

        const formData = new FormData(form.current)
        const updateData = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        setAccount({ email: updateData.email, password: updateData.password })

        setAccountsUsers((prevAccounts) =>
            prevAccounts.map((userAccount) =>
                userAccount.email === account.email ? { ...userAccount, ...updateData } : userAccount
            )
        )
    }

    const logOut = () => {
        setSignOut(false)
        setAccount({ email: '', password: '' })
        navigate('/')
    }

    const isFormValid = account && validateEmail(account.email) && validatePassword(account.password)

    return (
        <Layout>
            <div className='flex items-center justify-center min-h-screen -mt-20'>
                <form ref={form} className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center' onSubmit={editUser}>

                    <h1 className='font-medium text-3xl mb-6'> Account </h1>

                    <label htmlFor='email' className='self-start mb-2'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        defaultValue={account?.email || ''}
                        onChange={handleEmailChange}
                        required
                        placeholder='Email@dominio.com'
                        className={`rounded-lg w-80 p-3 mb-4  ${errors.email ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.email && <span className='text-red-500 mb-2'>{errors.email}</span>}

                    <label htmlFor='password' className='self-start mb-2'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        defaultValue={account?.password || ''}
                        onChange={handlePasswordChange}
                        required
                        placeholder='Password'
                        className={`rounded-lg w-80 p-3 mb-4 ${errors.password ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.password && <span className='text-red-500 mb-2'>{errors.password}</span>}

                    <button
                        type='submit'
                        className='bg-black py-3 text-white w-full rounded-lg mb-4 hover:bg-gray-700'
                        disabled={!isFormValid}
                    >
                        Save
                    </button>

                    {errors.auth && <span className='text-red-500 mb-4'>{errors.auth}</span>}

                    <a href='#' className='text-blue-500 mb-4' onClick={logOut}>Log out</a>
                </form>
            </div>
        </Layout>
    )
}

export { MyAccount }
