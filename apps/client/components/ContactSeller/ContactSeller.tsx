import { Product } from '@/lib/@types/shop'
import { Avatar, Box, Button, Dialog, Flex, Group, Paper, ScrollArea, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMessage } from '@tabler/icons-react'
import React from 'react'
import NewMessageBox from '../NewMessageBox/NewMessageBox'
import classes from "./ContactSeller.module.css";
import Link from 'next/link'
import OgMessage from '../OgMessage/OgMessage';
import { useGlobalStore } from '@/lib/context/global-store.provider'

interface IProps { product: Product }

const ContactSeller = ({ product }: IProps) => {
    const owner = product?.shop?.user;
    const conversations = useGlobalStore((store) => store.conversations)
    const user = useGlobalStore((state) => state.user);
    const userConversation = conversations.find((convo) => convo.users[0].id === owner?.id);
    const [opened, { toggle }] = useDisclosure();
    const convo = conversations.find(convo => convo.users[0].id === owner?.id);
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
                            toggle();
                            return;
                        }
                        toggle();
                    }} leftSection={<IconMessage stroke={1.5} />}>
                    <Text visibleFrom='sm'>{`Contact ${owner?.fullName}`}</Text>
                </Button> : <Link href="/auth/login">
                    <Button leftSection={<IconMessage stroke={1.5} />}
                        className={classes.btn}
                        size='lg'
                        radius={0}
                    >
                        <Text visibleFrom='sm'>Login To Contact Seller</Text>
                    </Button>
                </Link>}
            <Dialog opened={opened} onClose={toggle} withCloseButton size={"lg"} p="0" classNames={{ root: classes.bg }}>
                <Flex h={'100%'} direction={'column'}>
                    <Group className={classes.header} wrap='nowrap' py="sm">
                        <Avatar src={owner?.avatar?.signedUrl} name={owner?.fullName} />
                        <Text ta="center" fz={{ base: 'xs', sm: 'lg' }}>{`Inquire About ${product.name}`}</Text>
                    </Group>
                    <ScrollArea h={'100%'} scrollbars={'y'}
                        className={classes.scroll}
                        px="sm"
                    >
                        <Paper px={{ base: 'xs', sm: 'lg' }}>
                            <OgMessage product={product} />
                        </Paper>
                    </ScrollArea>
                    <NewMessageBox productId={product.id} userId={product.shop?.user?.id || ''} convoId={userConversation?.id} close={toggle} margin={'xs'} />
                </Flex>
            </Dialog>
        </div>
    )
}

export default ContactSeller