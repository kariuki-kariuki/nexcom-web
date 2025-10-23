'use client';

import { Button } from '@mantine/core';
import { API_URL } from '@repo/shared-logic';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginButton = () => {
    const router = useRouter();

    return (
        <Button variant="outline" size="lg" color="scode.8" onClick={() => router.push(`${API_URL}/auth/google/`)} leftSection={<IconBrandGoogle size={28} />}>
            Continue With Google
        </Button>
    );
};

export default LoginButton;
