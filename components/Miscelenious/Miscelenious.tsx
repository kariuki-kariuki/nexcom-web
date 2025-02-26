import {
  IconX
} from '@tabler/icons-react';
import { Group, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import {
  useActiveConversation
} from '@/lib/context/activeConversation';
import {
  NewConversationContext,
  NewConversationType
} from '@/lib/context/newConversation';
import Streaming from '../Streaming/Streaming';
function Miscelenious() {
  const { activeConversation, setActiveConversation } = useActiveConversation();
  const { newConversation, setNewConversation } = useContext(
    NewConversationContext
  ) as NewConversationType;



  return (
    <div>
      {(activeConversation || newConversation) && (
        <Group justify="space-between" align="center" content='center'>

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
          <Streaming />
        </Group>
      )
      }
    </div>
  );
}

export default Miscelenious;
