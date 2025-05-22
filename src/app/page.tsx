import dynamic from "next/dynamic"

const DynamicHomeClient = dynamic(() => import('@/app/page-client'), {
    ssr: false,
    loading: () => <div>Loading...</div>
})

export default function HomePage() {
    return <DynamicHomeClient />
}