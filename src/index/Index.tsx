import {
  Button,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import logo from "../assets/mklogo.png";
import { GithubIcon } from "@mantinex/dev-icons";
import { IconKeyboard, IconSearch } from "@tabler/icons-react";
function Index() {
  return (
    <div className="h-screen bg-gray-950 overflow-hidden">
      <div className="flex justify-between p-5 md:p-5 bg-slate-950 sticky top-0 left-0 right-0">
        <div className="flex items-center content-center justify-between">
          <div className=" h-10 md:h-20 pr-5">
            <Image src={logo} className="h-10 md:h-20 " radius={"100%"} />
          </div>

          <Text>Hello World</Text>
        </div>
        <div className="flex items-center">
            <TextInput placeholder="search" pr={10} leftSection={<IconSearch />} rightSection={<IconKeyboard />}/>
          <GithubIcon size={20} />
        </div>
      </div>
      <div className="flex items-center h-3/5 p-5">
        <div>
          <p className="">
            Bringing You A <br />New Experience In{" "} <br />
            <span className="text-indigo"></span>{" "}
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "yellow", to: "orange", deg: 177 }}
              component="span"
            >
              Communication 
            </Text>
                {" "}and{" "}
            <Text component="span" size="xl" fw={600} variant="gradient">
              Commerce
            </Text>
          </p>
          <Button variant="outline">Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
