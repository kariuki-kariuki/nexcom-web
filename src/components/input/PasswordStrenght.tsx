import {
  Box,
  Center,
  Group,
  PasswordInput,
  Progress,
  Text
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
// import { useInputState } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';

function PasswordRequirement({
  meets,
  label
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size={'0.9rem'} stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Inclides number' },
  { re: /[a-z]/, label: 'Inludes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-']/, label: 'Includes special symbol' }
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
type ChildComponentProps = {
  form: UseFormReturnType<
    {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      terms: boolean;
    },
    (values: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      terms: boolean;
    }) => {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      terms: boolean;
    }
  >;
};
export default function PasswordStrength({ form }: ChildComponentProps) {
  const strength = getStrength(form.values.password);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        style={{ section: { transitionDuration: '0ms' } }}
        value={
          form.values.password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
              ? 100
              : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue('password', event.currentTarget.value)
        }
        placeholder="Your password"
        c={'white'}
        label="Password"
        required
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement
        label="Has at least 6 characters"
        meets={form.values.password.length > 5}
      />
      {checks}
    </div>
  );
}
