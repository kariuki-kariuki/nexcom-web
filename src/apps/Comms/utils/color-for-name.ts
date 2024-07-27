export const colorForName = (name: string) => {
  const colors = [
    'ctp-green',
    'ctp-pink',
    'ctp-red',
    'ctp-peach',
    'ctp-blue',
    'ctp-teal',
  ];

  name = name.toLowerCase();

  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  const index = sum % colors.length;

  return colors[index];
};
