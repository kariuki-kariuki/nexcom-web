import { Product } from '@/lib/@types/shop'
import { useNewConverSationContext } from '@/lib/context/newConversation'
import { Avatar, Box, Button, Dialog, Flex, Group, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
import Link from 'next/link'
import OgMessage from '../OgMessage/OgMessage';
import { useGlobalStore } from '@/lib/context/global-store.provider'
import { useRouter } from 'next/navigation'

interface IProps { product: Product }

const ContactSeller = ({ product }: IProps) => {
    const owner = product?.shop?.user;
    const { setNewConversation } = useNewConverSationContext();
    const conversations = useGlobalStore((store) => store.conversations)
    const user = useGlobalStore((state) => state.user);
    const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
    const [opened, { toggle }] = useDisclosure();
    const convo = conversations.find(convo => convo.users[0].id === owner?.id);
    const router = useRouter();
    return (
        <div>
            {user ?
                <Button
                    className={classes.btn}
                    size='lg'
                    radius={0}
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
                    <Text visibleFrom='sm'>{`Contact ${owner?.firstName}`}</Text>
                </Button> : <Link href="/auth/login">
                    <Button leftSection={<IconMessage stroke={1.5} />}
                        className={classes.btn}
                        size='lg'
                        radius={0}
                    >
                        <Text visibleFrom='sm'>Login To Contact Seller</Text>
                    </Button>
                </Link>}
            <Dialog opened={opened} onClose={toggle} withCloseButton size={"lg"} classNames={{ root: classes.bg }}>
                <Flex h={'100%'} direction={'column'}>
                    <Group className={classes.header} wrap='nowrap' py="sm">
                        <Avatar src={owner?.avatar?.signedUrl} name={`${owner?.firstName} ${owner?.lastName}`} />
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
                    <NewMessageBox productId={product.id} margin={'xs'} />
                </Flex>
            </Dialog>
        </div>
    )
}

export default ContactSeller