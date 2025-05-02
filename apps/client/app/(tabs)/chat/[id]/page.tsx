import ChatArea from '@/components/ChatArea/ChatArea';
import { redirect } from 'next/navigation';
import React from 'react'

interface ParamsProp {
  params: Promise<{
    id: string
  }>}
const page = async ({params}: ParamsProp) => {
  const { id } = await params;
  if(!id) redirect('/chat');
  return (
    <div><ChatArea activeConvoId={id} /></div>
  )
}

export default page