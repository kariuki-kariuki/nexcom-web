import { Button } from '@mantine/core';
import { useGlobalStore } from '@repo/shared-logic';
import logout from '@repo/shared-logic/src/utils/logout';
import { IconLogout } from '@tabler/icons-react';
import React from 'react';

const Logout = () => {
    const user = useGlobalStore((state) => state.user);
    return (
        <>
            {user && <Button leftSection={<IconLogout size={28} color="white" />} size="lg" color="red" onClick={() => logout()}>
                Logout
                     </Button>
            }
        </>
    );
};

export default Logout;
