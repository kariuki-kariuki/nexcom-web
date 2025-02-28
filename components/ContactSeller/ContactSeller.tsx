import { Product } from '@/lib/@types/shop'
import { useGlobalContext } from '@/lib/context/appContext'
import { Affix, Avatar, Box, Button, Dialog, Flex, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
import Link from 'next/link'
import OgMessage from '../OgMessage/OgMessage';
import useGlobalStore from '@/lib/store/globalStore'

const ContactSeller = ({ product }: { product: Product }) => {
    const conversations = useGlobalStore(state => state.conversations)
    const setNewConversation = useGlobalStore((state) => state.setNewConversation)
    const setActiveConversation = useGlobalStore((state) => state.setActiveConversation)
  
    const { user } = useGlobalContext()
    const [opened, { toggle }] = useDisclosure();
    const convo = conversations.find(convo => convo.users[0].id === product.shop?.user?.id);


    return (
        <div>
            <Affix className={classes.affix} position={{ right: 10, bottom: 10 }}>
                {user ?
                    <Button
                        className={classes.btn}
                        onClick={() => {
                            if (user?.id === product.shop?.user?.id) return;

                            if (convo) {
                                setActiveConversation(convo);
                                toggle();
                                return;
                            }
                            setActiveConversation(null);
                            if (product.shop?.user) {
                                setNewConversation(product.shop?.user);
                            }

                            toggle();
                        }} leftSection={<IconMessage stroke={1.5} />}>
                        <Text visibleFrom='sm'>{`Contact ${product.shop?.user?.firstName}`}</Text>
                    </Button> : <Link href="/auth/login">
                        <Button leftSection={<IconMessage stroke={1.5} />}
                            className={classes.btn}
                        >
                            <Text visibleFrom='sm'>Login To Contact Seller</Text>
                        </Button>
                    </Link>}
            </Affix>
            <Dialog opened={opened} onClose={toggle} withCloseButton size={"lg"} classNames={{ root: classes.bg }}>
                <Flex h={'100%'} direction={'column'}>
                    <Group className={classes.header} wrap='nowrap' py="sm">
                        <Avatar src={product.shop?.user?.photo} />
                        <Text ta="center" fz={{ base: 'xs', sm: 'lg' }}>{`Inquire About ${product.name}`}</Text>
                    </Group>
                    <ScrollArea h={'100%'} scrollbars={'y'}
                        className={classes.scroll}
                        px="sm"
                    >
                        <Box px={{ base: 'xs', sm: 'lg' }}>
                            <OgMessage product={product} />
                        </Box>
                    </ScrollArea>
                    <NewMessageBox productId={product.id} close={toggle} />
                </Flex>
            </Dialog>
        </div>
    )
}

export default ContactSeller