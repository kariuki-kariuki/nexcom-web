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
import { ConvsersationType } from '../../lib/@types/app'
import { AUTH_URL } from '@/lib/common/constants'

interface IProps { product: Product }

const ContactSeller = ({ product }: IProps) => {
    const owner = product?.shop?.user;
    const conversations = useGlobalStore((store) => store.conversations)
    const user = useGlobalStore((state) => state.user);
    const [opened, { toggle }] = useDisclosure();
    const convo = conversations.find(convo => convo.users[0].id === owner?.id && convo.type === ConvsersationType.CONVERSATION);
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
                </Button> : <Link href={`${AUTH_URL}/login`}>
                    <Button leftSection={<IconMessage stroke={1.5} />}
                        className={classes.btn}
                        size='lg'
                        radius={0}
                    >
                        <Text visibleFrom='sm'>Login To Contact Seller</Text>
                    </Button>
                </Link>}
            <Dialog opened={opened} onClose={toggle} withCloseButton  p="0" radius={"md"} classNames={{ root: classes.bg }}>
                <Flex mih={'70vh'} direction={'column'}>
                    <Group className={classes.header} wrap='nowrap' py="sm">
                        <Avatar src={owner?.avatar?.signedUrl} name={owner?.fullName} />
                        <Text ta="center" fz={{ base: 'xs', sm: 'lg' }}>{`Inquire About ${product.name}`}</Text>
                    </Group>
                    <ScrollArea h={'100%'} scrollbars={'y'}
                        className={classes.scroll}
                       
                    >
                        <Paper px={{ base: 'xs', sm: 'lg' }}>
                            <OgMessage product={product} />
                        </Paper>
                    </ScrollArea>
                    <NewMessageBox productId={product.id} userId={product.shop?.user?.id || ''} convoId={convo?.id} close={toggle} margin={0} radius={0} />
                </Flex>
            </Dialog>
        </div>
    )
}

export default ContactSeller