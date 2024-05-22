import { useState } from "react";
import {
  Center,
  Tooltip,
  UnstyledButton,
  Stack,
  rem,
  Image,
} from "@mantine/core";
import {
  IconHome2,
  // IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconMessageCircle,
  IconTrolley,
} from "@tabler/icons-react";
import classes from "./NavbarMinimal.module.css";
import logo from "../../assets/mklogo.png";
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconMessageCircle, label: "Chat" },
  { icon: IconTrolley, label: "Shop" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

export default function Navbar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <a href={`/${link.label.toLowerCase()}`}>
      <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    </a>
  ));

  return (
    <nav className={`${classes.navbar}  hidden md:block dark:bg-slate-700 border-r-2 border-gray-500`} >
      <Center>
        <Image src={logo} radius={"xl"} width={"auto"} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
