import MiniProfile from '../components/MiniProfile';
import Miscelenious from '../components/Miscelenious';
import { IconArrowLeftCircle } from '@tabler/icons-react';

import { Button, Group, Paper } from '@mantine/core';
import { CloseProps } from './ChatArea';

// Top Bar on the Chatbox Area
const Bar = ({ close }: CloseProps) => {
  return (
    // <div className="bg-slate-800 z-10 sm:min-h-15 text-white flex justify-between  items-center p-3 sm:p-5 fixed top-0 right-0 left-0 md:sticky  md:top-0 border-b-2 border-gray-700">
    <Group p={'lg'} h={'80'} bg="purple" justify="space-between" align="center">
      <Group>
        <Button variant="outline" hiddenFrom="sm" bd={'none'}>
          <IconArrowLeftCircle size={20} onClick={close} />
        </Button>
        <MiniProfile />
      </Group>
      <Paper visibleFrom="sm" bg={'none'}>
        <Miscelenious />
      </Paper>
    </Group>
  );
};

export default Bar;
