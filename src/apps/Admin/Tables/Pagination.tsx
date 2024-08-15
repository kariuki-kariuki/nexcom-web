import { Flex, Pagination } from '@mantine/core';

interface Props {
  setPage: (arg: number) => void;
  activePage: number;
}
function Demo({ setPage, activePage }: Props) {
  return (
    <Flex align={"center"} justify={"center"}>
      <Pagination total={10} onChange={setPage} value={activePage} mt='sm' />
    </Flex>
  );
}

export default Demo;
