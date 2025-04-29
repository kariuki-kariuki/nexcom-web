import { useEmojiPicker } from '@/lib/hooks/useEmojiPicker';
import EmojiPicker, { Theme } from 'emoji-picker-react';

export const EmojiPickerComponent = ({ classes, theme}: {theme: () => Theme, classes: any,}) => {
  const emojiPickerProps = useEmojiPicker({theme});
  console.log(emojiPickerProps.height, emojiPickerProps.opened);

  return (
    <EmojiPicker
      width="100%"
      height={emojiPickerProps.height}
      theme={emojiPickerProps.theme}
      lazyLoadEmojis={emojiPickerProps.lazyLoadEmojis}
      open={emojiPickerProps.open}
      className={classes.emoji}
      searchDisabled={emojiPickerProps.searchDisabled}
    />
  );
};
