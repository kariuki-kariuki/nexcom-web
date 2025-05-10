import NewChat from '@/components/NewChat/NewChat';
import { GlobalUser } from '@/lib/@types/app';
import get from '@/utils/fetch';
import { redirect } from 'next/navigation';
import React from 'react'

interface IProps {
  params: Promise<{ id: string }>
}
const page = async ({params}: IProps) => {
  const { id } = await params;
  const data = await get<GlobalUser>(`users/${id}`)
  if(!data){
    redirect('/chat')
  }
  return (
    <NewChat user={data}/>
  )
}

export default page