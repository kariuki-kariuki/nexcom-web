import {
  IconX
} from '@tabler/icons-react';
import { Box, Flex, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { useGlobalContext } from '@/lib/context/appContext';
import {
  useActiveConversation
} from '@/lib/context/activeConversation';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
function Miscelenious() {
  const { activeConversation, setActiveConversation } = useActiveConversation();
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
