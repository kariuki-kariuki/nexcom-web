import { Product } from '@/lib/@types/shop'
import { datasource } from '@/lib/common/datasource'
import { siteMetadata } from '@/lib/data/siteMetadata'
import { url } from 'inspector'
import type { MetadataRoute } from 'next'
 
export default async function sitemap() {
  const { data } = await datasource.get<Product[]>('products')

  const sitemaps = [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${siteMetadata.siteUrl}/images/og.png`],
    },
    {
      url: siteMetadata.siteUrl + '/chat',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: .9,
    },
    {
      url: siteMetadata.siteUrl + '/dashboard',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: .7,
    },
    {
      url: siteMetadata.siteUrl + '/business',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: .9,
    },
    {
      url: siteMetadata.siteUrl + '/products',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: .9,
    },
    {
      url: siteMetadata.siteUrl + '/auth/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: .8,
    }
  ]
  if(data) {
    data.forEach((product) => {
      sitemaps.push({
        url: siteMetadata.siteUrl + `/business/product/${product.id}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: 'yearly',
        priority: .6,
      })
    })
  }
  return sitemaps;
}