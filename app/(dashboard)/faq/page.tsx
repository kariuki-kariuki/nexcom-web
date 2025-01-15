import React from 'react';
import Faq, { IFaq } from '../../../components/FAQ/Faq';
import get from '../../../utils/fetch';

async function Page() {
  const faqs = await get<IFaq[]>('faqs');
  return <Faq faqsdb={faqs} />;
}

export default Page;
