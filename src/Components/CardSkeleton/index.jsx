import { Layout } from '../Layout'

const CardSkeleton = () => {

    return (
        <Layout>
            <div className='bg-gray-100 w-56 h-60 rounded-lg shadow-sm animate-pulse dark:bg-gray-300' />
        </Layout>)
}

export { CardSkeleton }