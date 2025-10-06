import Faq, { IFaq } from '@/components/FAQ/Faq';
import { get } from '@repo/shared-logic';
import React from 'react';

async function Page() {
  const faqs = await get<IFaq[]>('faqs');
  return <Faq faqsdb={faqs} />;
}

export default Page;
