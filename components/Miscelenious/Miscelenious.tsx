import {
  IconX
} from '@tabler/icons-react';
import { Group, Tooltip } from '@mantine/core';
import Streaming from '../Streaming/Streaming';
import useGlobalStore from '@/lib/store/globalStore';
function Miscelenious() {
  
  const newConversation = useGlobalStore(state => state.newConversation)
  const activeConversation= useGlobalStore(state => state.activeConversation)
  const setNewConversation= useGlobalStore((state) => state.setNewConversation)
  const setActiveConversation= useGlobalStore((state) => state.setActiveConversation)

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
                  setNewConversation(null);
                  setActiveConversation(null);
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
