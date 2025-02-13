import { Product } from '@/lib/@types/shop'
import { useActiveConversation } from '@/lib/context/activeConversation'
import { useGlobalContext } from '@/lib/context/appContext'
import { useChat } from '@/lib/context/ConversationContext'
import { useNewConverSationContext } from '@/lib/context/newConversation'
import { Affix, Avatar, Box, Button, Dialog, Flex, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import ImageCarousel from '../Shop/shopcomponents/ImageCarousel'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
const ContactSeller = ({ product }: { product: Product }) => {
    const { setNewConversation } = useNewConverSationContext();
    const { state } = useChat()
    const { user } = useGlobalContext()
    const { setActiveConversation } = useActiveConversation();
    const [opened, { toggle }] = useDisclosure();
    const convo = state.conversations.find(convo => convo.users[0].id === product.shop?.user?.id);

    return (
        <div>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Button
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
                    }} leftSection={<IconMessage stroke={1.5} />}>{`Contact ${product.shop?.user?.firstName}`}</Button>
            </Affix>
            <Dialog opened={opened} onClose={toggle} h={'90vh'} withCloseButton size={"lg"} classNames={{ root: classes.bg }}>
                <Flex h={'100%'} direction={'column'}>
                    <Group className={classes.header} wrap='nowrap' py="sm">
                        <Avatar src={product.shop?.user?.photo} />
                        <Text fw="bold" ta="center">{`Inquire About ${product.name}`}</Text>
                    </Group>
                    <ScrollArea h={'100%'} scrollbars={'y'}
                        className={classes.scroll}
                        px="sm"
                    >
                        <Box px={{ base: 'xs', sm: 'lg'}}>
                            <ImageCarousel images={product?.images} />
                        </Box>
                    </ScrollArea>
                    <NewMessageBox productId={product.id} close={toggle}/>
                </Flex>
            </Dialog>
        </div>
    )
}

export default ContactSeller