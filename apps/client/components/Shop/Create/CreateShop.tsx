'use client';
import { Avatar, Button, Container, FileInput, Flex, Group, Input, InputWrapper, LoadingOverlay, Paper, Select, Stack, Text, Textarea } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import React, { useState } from 'react'
import classes from './CreateShop.module.css';
import NewCategory from '@/components/NewProduct/NewCategory';
import { datasource } from '@/lib/common/datasource';
import setToken from '@/utils/setToken';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import { Category } from '@/lib/@types/shop';

const CreateShop = ({ categoriesdb }: { categoriesdb: Category[] }) => {
  const [categories, setCategories] = useState(categoriesdb)
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null)
  console.log(categories);
  const [shop, setShop] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [file, setFile] = useState<FileWithPath | null>(null)
  const user = useGlobalStore((state) => state.user);
  const category = categories?.find((category) => category.id === selectedCatId)
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter()
  if (user?.shop) {
    router.push('/dashboard')
  }

  const handleCreateBusiness = async () => {
    setError('')
    if (!shop.name || !shop.address || !shop.phone || !file || !category) {
      setError('Make sure no field is empty? Make Sure the banner is available')
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file)
    formData.append('name', shop.name)
    formData.append('address', shop.address)
    formData.append('phone', shop.phone)
    formData.append('categoryId', category.id)
    formData.append('description', shop.description)

    const { data, loading, error } = await datasource.post<{ token: string }>({ formData, path: 'auth/register-shops', contentType: false })

    if (error) {
      setError(error)
    }

    if (data && !loading) {
      await setToken(data.token).then(() => {
        router.push('/dashboard')
      });
    }
    setIsLoading(false);
  }
  return (
    <Container size="xl" h="100%" className={classes.main}>
      <LoadingOverlay visible={isloading} />
      <Flex h="100%" wrap="wrap">
        <Paper w={{ base: '100%', sm: "50%" }} p="sm" className={classes.inputPaper}>
          <div>
            <div>
              <Text fz="h2" fw="bold" ta="center">Shop Onboarding</Text>
              <Text fz='sm' pt='sm' ta="center">Create shop and start selling</Text>
            </div>
            <Group wrap='nowrap' grow py="md" >
              <InputWrapper error={error} label="Shop Name" withAsterisk size="lg">
                <Input classNames={{ input: classes.input }} name="shopname" size="lg" type='text' placeholder='example: ShopX' value={shop.name} onChange={(e) => setShop((prev) => ({ ...prev, name: e.target.value }))} />
              </InputWrapper>
              <InputWrapper error={error} label="Physical Address" withAsterisk>
                <Input classNames={{ input: classes.input }} name="address" type='text' size="lg" placeholder='Moi Avenue, Huduma Plaza, Shop 25' value={shop.address} onChange={(e) => setShop((prev) => ({ ...prev, address: e.target.value }))} />
              </InputWrapper>
            </Group>

            <Group wrap='nowrap' grow py="md" >
              <InputWrapper error={error} label="Phone" withAsterisk size="lg">
                <Input classNames={{ input: classes.input }} name="phone" type='string' size="lg" placeholder='07 124 124 124' value={shop.phone} onChange={(e) => setShop((prev) => ({ ...prev, phone: e.target.value }))} />
              </InputWrapper>
              <InputWrapper error={error} label="Bunner Image" size="lg" withAsterisk>
                <FileInput classNames={{ input: classes.input }} name="name" withAsterisk value={file} size="lg" placeholder="Bunner Image" onChange={setFile} />
              </InputWrapper>
            </Group>
            <Group grow wrap='nowrap' align='center'>
              <InputWrapper label="New Category" size="lg">
                <NewCategory
                  setCategories={setCategories}
                />
              </InputWrapper >
              {categoriesdb && categoriesdb.length > 0 &&
                <Select
                  my="sm"
                  label="Select Category"
                  classNames={{ input: classes.input }}
                  value={selectedCatId}
                  size="lg"
                  onChange={(_value, option) =>
                    setSelectedCatId(option.value)
                  }
                  data={categories.map((category) => ({
                    label: category.name,
                    value: category.id
                  }))}
                />
              }
            </Group>
            <InputWrapper label="Description" size="lg">
              <Textarea classNames={{ input: classes.input }} size="lg" value={shop.description} minRows={6} autosize onChange={(e) => setShop((prev) => ({ ...prev, description: e.target.value }))} />
            </InputWrapper>
            <Group py="md">
              <Button fullWidth size="lg" onClick={handleCreateBusiness}>Create Business</Button>
            </Group>
          </div>
        </Paper>
        <Paper w={{ base: '100%', sm: "50%" }} bg="none" h="100%" visibleFrom='sm' className={classes.inputPaperTwo}>
          <div className={classes.card}>
            <section className={classes.section} style={{ backgroundImage: `url(${file ? URL.createObjectURL(file) : '/images/banner.png'})` }}>
            </section>
            <div className={classes.innerCard}>
              <div className={classes.avatar}>
                <Group align='center'>
                  <Avatar src={user?.avatar?.signedUrl} size="lg" />
                  <Text pt="lg">{user?.fullName}</Text>
                </Group>
              </div>
              <Stack pt="lg">
                <Text fw="bold">{shop.name || 'ShopName'} - {category?.name} </Text>
                <Text c="dimmed" fz="12px">{shop.phone || '+254 712 345 678'}</Text>
                <Text c="dimmed" fz="xs">nexcom.ke@gmail.com</Text>
                <Text c="coco.4" fz="sm">{`https://nexcom-ke.vercel.app/shop/${shop.name.toLowerCase() || 'ShopName'.toLowerCase()}`}</Text>
              </Stack>
            </div>
          </div>
        </Paper>
      </Flex>

    </Container >
  )
}

export default CreateShop