import { Layout } from '../Layout'

const SearchSkeleton = () => {

    return (
        <Layout>
            <div className='bg-gray-100 w-44 h-1 p-3 m-3 rounded-lg animate-pulse dark:bg-gray-300' />
            <div className='bg-gray-100 w-80  h-16 rounded-lg shadow-xl animate-pulse dark:bg-gray-300' />
        </Layout>)
}

export { SearchSkeleton }