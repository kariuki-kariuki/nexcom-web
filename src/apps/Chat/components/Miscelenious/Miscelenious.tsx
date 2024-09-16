import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconLayoutDashboardFilled,
  IconLogout,
  IconMoonFilled,
  // IconPhoneCalling,
  IconShoppingBag,
  IconSunFilled,
  IconTrash,
  // IconVideo,
} from '@tabler/icons-react';
import {
  Box,
  Menu,
  rem,
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import Dashboard from '../../../Dashboard/Dashboard';
import classes from './Miscelenious.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../../context/appContext';
import { UserContextType } from '../../../../@types/app';
import {
  activeConversatonType,
  ConversationContext,
} from '../../../../context/activeConversation';
import {
  NewConversationContext,
  NewConversationType,
} from '../../../../context/newConversation';
function Miscelenious() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AppContext) as UserContextType;
  const { activeConversation, setActiveConversation } = useContext(
    ConversationContext,
  ) as activeConversatonType;
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext,
  ) as NewConversationType;

  return (
    <div className="flex justify-around">
      {/* <div className="p-3">
        <IconVideo />
      </div>
      <div className="p-3">
        <IconPhoneCalling />
      </div> */}
      {activeConversation || newConversation ? (
        <div className="p-3">
          <Tooltip label="Close this conversation">
            <Text
              fw={500}
              c="red"
              onClick={() => {
                setActiveConversation(null);
                setNewConversation(null);
              }}
            >
              X
            </Text>
          </Tooltip>
        </div>
      ) : (
        ''
      )}
      <div className="p-3">
        <Box p={0} className={classes.menu}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <div>
                <IconDotsVertical />
              </div>
            </Menu.Target>

            <Menu.Dropdown className={classes.menu_drop}>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                onClick={() => navigate('/shop')}
                leftSection={
                  <IconShoppingBag
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Shop
              </Menu.Item>
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
              <Menu.Item
                leftSection={
                  colorScheme === 'dark' ? (
                    <IconSunFilled
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  ) : (
                    <IconMoonFilled
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  )
                }
                onClick={toggleColorScheme}
              >
                {colorScheme === 'dark' ? 'Light' : 'Dark'}
              </Menu.Item>
              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/', { replace: false });
                  updateUser(null);
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
            </Menu.Dropdown>
          </Menu>
          {user ? (
            <Dashboard opened={opened} close={close} actUser={user} />
          ) : (
            ''
          )}
        </Box>
      </div>
    </div>
  );
}

export default Miscelenious;
