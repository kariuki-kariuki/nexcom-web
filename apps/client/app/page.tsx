import { Welcome } from '@/components/Welcome/Welcome';
import classes from "./styles.module.css"
import { FooterLinks } from '@/components/Footer/Footer';
import AppFeatures from '@/components/AppFeatures/AppFeatures';

async function Index () {
  return (<div className={classes.bg}>
  <Welcome />
  <AppFeatures />
  <FooterLinks />
  </div>);
}

export default Index;
