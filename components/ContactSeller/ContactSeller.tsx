import { Product } from '@/lib/@types/shop'
import { useActiveConversation } from '@/lib/context/activeConversation'
import { useGlobalContext } from '@/lib/context/appContext'
import { useChat } from '@/lib/context/ConversationContext'
import { useNewConverSationContext } from '@/lib/context/newConversation'
import { Affix, Avatar, Box, Button, Dialog, Flex, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import ImageCarousel from '../Shop/shopcomponents/ImageCarousel'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
import useWebSocket from '@/lib/hooks/useWebsockets'
import Link from 'next/link'
import OgMessage from '../OgMessage/OgMessage'
const ContactSeller = ({ product }: { product: Product }) => {
    const { setNewConversation } = useNewConverSationContext();
    const { state } = useWebSocket()
    const { user } = useGlobalContext()
    const { setActiveConversation } = useActiveConversation();
    const [opened, { toggle }] = useDisclosure();
    const convo = state.conversations.find(convo => convo.users[0].id === product.shop?.user?.id);



    return (
        <div>
            <Affix className={classes.affix} position={{right: 10, bottom: 10}}>
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
                            setNewConversation(product.shop?.user);
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
                        <Text fw="bold" ta="center">{`Inquire About ${product.name}`}</Text>
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