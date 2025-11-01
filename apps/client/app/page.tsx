import { Welcome } from '@/components/Welcome/Welcome';
import classes from "./styles.module.css"
import { FooterLinks } from '@/components/Footer/Footer';
import AppFeatures from '@/components/AppFeatures/AppFeatures';
import get from '@/utils/fetch';
import BlogsHome from '@/components/Blogs/BlogsHome';
import { BlogResultInterFace, ProductResultType } from '@repo/nexcom-types';
import HeroProducts from '@/components/HeroProducts/HeroProducts';

async function Index () {
  const blogs = await get<BlogResultInterFace>('blogs/public')
  const productResults = await get<ProductResultType>('products?limit=8')
  return (
  <div className={classes.bg}>
  <Welcome />
  {productResults && <HeroProducts productsResults={productResults} />}
  {blogs && <BlogsHome blogsResult={blogs} />}
  <AppFeatures />
  <FooterLinks />
  </div>);
}

export default Index;
