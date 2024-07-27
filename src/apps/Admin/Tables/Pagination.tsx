import { Pagination } from '@mantine/core';

interface Props {
  setPage: (arg: number) => void;
  activePage: number;
}
function Demo({ setPage, activePage }: Props) {
  return (
    <Pagination total={10} onChange={setPage} value={activePage} mt="sm" />
  );
}

export default Demo;
