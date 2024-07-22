import { Button, Image, Text, TextInput } from "@mantine/core";
import logo from "../assets/mklogo.png";
import { GithubIcon } from "@mantinex/dev-icons";
import { IconArrowRight,  IconSearch } from "@tabler/icons-react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { UserContextType } from "../@types/app";
function Index() {
  const { user } = useContext(AppContext) as UserContextType;
  console.log(user);
  return (
    <div className="h-screen bg-hero-pattern overflow-hidden bg-cover bg-center">
      <div style={{backgroundColor: "rgba(0, 0, 0, .7)"}} className=" sm:px-20 h-full">
        <div className="flex justify-between p-5 md:p-5  sticky top-0 left-0 right-0">
          <div className="flex items-center content-center justify-between">
            <div className=" h-10 md:h-20 pr-5">
              <Image src={logo} className="h-10 md:h-20 " radius={"100%"} />
            </div>

            <Text>Hello World</Text>
          </div>
          <div className="flex items-center">
            <TextInput
              placeholder="search"
              pr={10}
              className="hidden md:block"
              leftSection={<IconSearch />}
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            />
            {user.avatar ? <Image src={user.avatar}/>: <GithubIcon size={30} />}
            
          </div>
        </div>
        <div className="flex items-center justify-between h-3/5 p-5">
          <div>
            <p className="my-5 text-md sm:font-black antialiased leading-4 font-mono md:text-4xl  ">
              Bringing You a <br />
              New Experience In <br />
              <span className="text-orange-500">Communication</span> and{" "}
              <span className="text-orange-500">Commerce</span>
            </p>
          
            <hr className="w-3/5 mb-3 border-orange-400" />
            <hr className="w-2/5 mb-3 border-orange-400" />
            <hr className="w-1/5 mb-3 border-orange-400" />
            <Button
              variant="outline"
              component="a"
              href={user.name ? "/shop" : "/login"}
              rightSection={<IconArrowRight size={20} />}
            >
              Get Started
            </Button>
          </div>
          <div className="">
            <p className="text-8xl">CO</p>
            <p className="text-8xl">CO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
