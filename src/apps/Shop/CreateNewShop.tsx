import { Input, Paper, Text } from "@mantine/core";
import  { useState } from "react";

function CreateNewShop() {
  const [shop_name, setShopName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div className="flex items-center min-h-screen bg-slate-900 justify-center ">
      <Paper
        className="w-full m-5 sm:w-1/2 md:w-1/3 sm:m-0"
        bg={"blue"}
        p={20}
        shadow="xl"
        withBorder
      >
        <Text c={"white"} ta={"center"} fw={900} fz={"h4"}>
          Create A New Shop
        </Text>
        <br />
        <Input.Wrapper c={"white"} label="Choose A Shop Name" p={"lg"}>
          <Input
            placeholder="Enter shopname"
            value={shop_name}
            onChange={(e) => setShopName(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Shop Address" px={"lg"}>
          <Input
            placeholder="Enter Store Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Input.Wrapper>

        <Paper
          style={{ margin: "0px auto" }}
          component="button"
          px={"xl"}
          py={5}
          bg={"pink"}
          mt={"xl"}
          onClick={ () => handleSubmit(shop_name, address)}
        >
          <Text>Submit</Text>
        </Paper>
      </Paper>
    </div>
  );
}

function handleSubmit(shop_name: string, address: string) {
  const token = localStorage.getItem("token");
  if (shop_name && address) {
    fetch("http://localhost:8000/shop", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shop_name: shop_name,
        address: address,
      }),
    }).then((res: any) => {
      if (res.ok) {
        res.json().then((res: any) => {
          console.log(res);
        });
      }
    });
  } else {
    alert("Please enter correct details")
  }
}
export default CreateNewShop;
