import { Layout } from '../Layout'

const CardSkeleton = () => {

    return (
        <Layout>
            <div className='w-56 h-60 rounded-lg shadow-sm  bg-gray-100 animate-pulse dark:bg-gray-300' />
        </Layout>)
}

export { CardSkeleton }