import { Link } from 'react-router-dom'
import { Layout } from '../../Components/Layout'

function SignIn() {
    return (
        <form>
            <Layout>
                <div className='flex items-center justify-center relative w-80 mb-4'>
                    <h1 className='font-medium text-3xl'>Shopi</h1>
                </div>
                <label htmlFor="email">Email:</label>
                <input
                    type='email'
                    id='email'
                    required
                    placeholder='Email@dominio.com'
                    className='rounded-lg border border-black w-80 p-3 mb-4 focus:outline-none'
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className='rounded-lg border border-black w-80 p-3 mb-4 focus:outline-none'
                    required
                    placeholder="Password"
                /> 
                <Link to='/my-orders/last'>
                    <button className='bg-black py-3 text-white w-80 rounded-lg' >Log in</button>
                </Link>
                <div className='p-3'>
                    <a href='*'>Forgot my password?</a>
                </div>
                <Link to='/my-orders/last'>
                    <button className='bg-gray-400 py-3 text-white w-80 rounded-lg' >Sign up</button>
                </Link>
            </Layout>
        </form>
    )
}

export { SignIn }
