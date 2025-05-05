import dynamic from "next/dynamic"

const DynamicHomeClient = dynamic(() => import('./client-page'), {
    ssr: false,
    loading: () => <div>Loading...</div>
})

export default function Home() {
    return <DynamicHomeClient />
}