import { IconX } from '@tabler/icons-react';
import { Box, Flex, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
import { useGlobalStore } from '@/lib/context/global-store.provider';
import Link from 'next/link';

interface MisceleniousProps {
  convoId?: string;
}
function Miscelenious({ convoId }: MisceleniousProps) {
  const conversations = useGlobalStore(state => state.conversations);
  const activeConversation = conversations.find((conv) => conv.id === convoId)
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;



  return (
    <Flex justify="space-between" align="center" content='center'>
      {activeConversation || newConversation ? (
        <div className="p-3">
          <Tooltip label="Close this conversation">
            <Link href="/chat">
              <IconX
                color="red"
                stroke={1.5}
              />
            </Link>
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
