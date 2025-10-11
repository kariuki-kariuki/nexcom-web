import OrderDescriptionCard from '@/components/Orders/OrderDescriptionCard/OrderDescriptionCard';
import { sampleOders } from '@/components/Orders/Orders';
import React from 'react'

interface PageProps {
    props: Promise<{ id: string }>
}
const page = async ({ params }: { params: { id: string } }) => {
    return (
        <OrderDescriptionCard id={params.id} />
    )
}

export default page