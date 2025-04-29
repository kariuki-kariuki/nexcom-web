import { useState, useMemo } from 'react';
import { Theme } from 'emoji-picker-react';

export const useEmojiPicker = ({ theme }: {theme: () => Theme}) => {

  const [opened, setOpened] = useState(false) 

  const height = 350;

  const togglePicker = () => {
    setOpened((prev) => !prev);
  };

  return {
    opened,
    height,
    theme: theme(),
    togglePicker,
    lazyLoadEmojis: true,
    open: opened,
    searchDisabled: true,
  };
};
