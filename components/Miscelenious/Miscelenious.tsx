import {
  IconArrowsLeftRight,
  IconDiamond,
  IconDotsVertical,
  IconLayoutDashboardFilled,
  IconLogout,
  IconShoppingBag,
  IconTrash,
  IconX
  // IconVideo,
} from '@tabler/icons-react';
import { Box, Button, ButtonGroup, Flex, Menu, rem, Tooltip } from '@mantine/core';
import Dashboard from '../Profile/ProfileDashboard';
import classes from './Miscelenious.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AppContext } from '@/lib/context/appContext';
import {
  activeConversatonType,
  ConversationContext
} from '@/lib/context/activeConversation';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
import { UserContextType } from '@/lib/@types/app';
import Link from 'next/link';
import logout from '@/utils/logout';
function Miscelenious() {
  const [opened, { open, close }] = useDisclosure();
  const { user, setUser } = useContext(AppContext) as UserContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext
  ) as activeConversatonType;
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;

  return (
    <Flex justify="space-between" align="center" content='center'>
      {activeConversation || newConversation ? (
        <div className="p-3">
          <Tooltip label="Close this conversation">
            <IconX
              color="red"
              stroke={1.5}
              onClick={() => {
                setActiveConversation(null);
                setNewConversation(null);
              }}
            />
          </Tooltip>
        </div>
      ) : (
        ''
      )}
      <Box p={"md"}>
        <Box p={0} className={classes.menu}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div>
                <IconDotsVertical stroke={1.5}/>
              </div>
            </Menu.Target>

            <Menu.Dropdown className={classes.menu_drop}>
              <Menu.Label>Application</Menu.Label>
              <Link href="/shop">
                <Menu.Item
                  leftSection={
                    <IconShoppingBag style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Shop
                </Menu.Item>
              </Link>
              <Menu.Item
                onClick={open}
                leftSection={
                  <IconLayoutDashboardFilled
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Profile
              </Menu.Item>
              
              {user?.shop ? (
                <Link href="/dashboard">
                  <Menu.Item
                    leftSection={
                      <IconDiamond style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Admin
                  </Menu.Item>
                </Link>
              ) : (
                ''
              )}
              {user ? (
                <>
                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item
                    color="red"
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Logout
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconArrowsLeftRight
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                  >
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Delete my account
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Divider />
                  <Menu.Label>Login / Register</Menu.Label>
                  <Menu.Item>
                    <ButtonGroup>
                      <Link href="/login">
                        <Button>Login</Button>
                      </Link>
                      <Link href="/login"></Link>
                    </ButtonGroup>
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
          {user ? (
            <Dashboard opened={opened} close={close} actUser={user} />
          ) : (
            ''
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default Miscelenious;
