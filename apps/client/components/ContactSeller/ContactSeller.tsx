import { Product, Shop } from '@/lib/@types/shop'
import { useGlobalContext } from '@/lib/context/appContext'
import { useNewConverSationContext } from '@/lib/context/newConversation'
import { Affix, Avatar, Box, Button, ButtonGroup, Dialog, Flex, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
import Link from 'next/link'
import OgMessage from '../OgMessage/OgMessage';
import { useGlobalStore } from '@/lib/context/global-store.provider'
import { GlobalUser } from '@/lib/@types/app'
import { useRouter } from 'next/navigation'

interface IProps { product: Product, owner: GlobalUser, shop: Shop }

const ContactSeller = ({ product, owner }: IProps) => {
    const { setNewConversation } = useNewConverSationContext();
    const conversations = useGlobalStore((store) => store.conversations)
    const { user } = useGlobalContext()
    const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
    const [opened, { toggle }] = useDisclosure();
    const convo = conversations.find(convo => convo.users[0].id === owner.id);
    const router = useRouter();
    return (
        <div>
            <Affix position={{ right: 10, bottom: 10 }}>

                {user ?
                    <Button
                        className={classes.btn}
                        onClick={() => {
                            if (user?.id === owner?.id) return;

                            if (convo) {
                                setActiveConversation(convo);
                                toggle();
                                return;
                            }
                            setActiveConversation(null);
                            setNewConversation(product.shop?.user || owner);
                            toggle();
                        }} leftSection={<IconMessage stroke={1.5} />}>
                        <Text visibleFrom='sm'>{`Contact ${owner.firstName}`}</Text>
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
                        <Avatar src={owner.avatar?.signedUrl} name={`${owner.firstName} ${owner.lastName}`} />
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