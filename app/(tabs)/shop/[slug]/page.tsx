import HeroPage from '@/components/Shop/Products/HeroPage';
import { CategoryWithProducts, ProductWithShop } from '@/lib/@types/shop';
import { datasource } from '@/lib/common/datasource';
import { Text } from '@mantine/core';
import React from 'react';

interface Props {
    params: {
        slug: string
    }
}
async function Page({ params }: Props) {
    const { data } = await datasource.get<CategoryWithProducts[]>('categories/all')
    if (!data) return <Text>No products</Text>
    const current = data.filter((item) => {
        if (params.slug === 'all') return true;
        const normalizedName = item.name.toLowerCase().replace(/\s+/g, '-');
        return normalizedName === params.slug;
    });
    return <HeroPage categories={current} tag={params.slug} />;
}

export default Page;
