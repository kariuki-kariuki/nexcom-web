import { useEmojiPicker } from '@/lib/hooks/useEmojiPicker';
import { Button, Menu, MenuDropdown, MenuItem, MenuTarget, Paper, Text, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoodSmile } from '@tabler/icons-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';

export const EmojiPickerComponent = ({ classes }: { classes: any, }) => {
  const { colorScheme } = useMantineColorScheme();

  function theme() {
    if (colorScheme === 'dark') {
      return Theme.DARK;
    } else if (colorScheme === 'light') {
      return Theme.LIGHT;
    }
    return Theme.AUTO;
  }
  const emojiPickerProps = useEmojiPicker({ theme });

  return (
    <Paper bg="none" shadow='lg'>
      <Menu position='top-start'>
        <MenuTarget>
          <Text fz={'xl'}>😊</Text>
        </MenuTarget>
        <MenuDropdown w="400">
            <EmojiPicker
              width="100%"
              height={350}
              theme={theme()}
              lazyLoadEmojis={emojiPickerProps.lazyLoadEmojis}
              open={true}
              className={classes.emoji}
              searchDisabled={true}
            />
        </MenuDropdown>
      </Menu>
    </Paper>

  );
};
