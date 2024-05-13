import { Button, Menu  } from "@mantine/core";
// import { IconSearch } from "@tabler/icons-react";

const ProductCategories = [
  "Electronics",
  "Apparel and Fashion",
  "Home and Kitchen Appliances",
  "Beauty and Personal Care",
  "Automotive",
  "Sports and Outdoors",
  "Books and Stationery",
  "Health and Wellness",
  "Toys and Games",
];

function FilterBy() {
  let Categores = ProductCategories.map((product: string) => (
    <Menu.Item>{product}</Menu.Item>
  ));
  return (
    <Menu trigger="hover">
      <Menu.Target>
        <Button>Filter By</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Categores</Menu.Label>
        {Categores}
      </Menu.Dropdown>
    </Menu>
  );
}

export default FilterBy;
