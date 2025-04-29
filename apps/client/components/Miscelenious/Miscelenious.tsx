import { IconX } from '@tabler/icons-react';
import { Box, Flex, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
import { useGlobalStore } from '@/lib/context/global-store.provider';
function Miscelenious() {
  const activeConversation = useGlobalStore(state => state.activeConversation);
  const setActiveConversation = useGlobalStore(state => state.setActiveConversation)
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

      </Box>
    </Flex>
  );
}

export default Miscelenious;
