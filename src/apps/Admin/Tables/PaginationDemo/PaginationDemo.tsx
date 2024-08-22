import { Flex, Pagination } from '@mantine/core';
import classes from "./Pagination.module.css";
interface Props {
  setPage: (arg: number) => void;
  activePage: number;
}
function PaginationDemo({ setPage, activePage }: Props) {
  return (
    <Flex align={"center"} justify={"center"}>
      <Pagination total={10} onChange={setPage} value={activePage} mt='sm' color={"purple"} classNames={ { control: classes.control }}/>
    </Flex>
  );
}

export default PaginationDemo;
