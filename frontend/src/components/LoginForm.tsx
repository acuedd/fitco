import { useForm } from '@mantine/form';
import { Button, TextInput, PasswordInput, Paper, Title, Stack } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo inválido'),
      password: (value) => (value.length >= 6 ? null : 'Mínimo 6 caracteres'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Credenciales inválidas',
        color: 'red',
      });
    }
  };

  return (
    <Paper p="xl" withBorder radius="md" maw={400} mx="auto" mt="xl">
      <Title order={3} mb="md" ta="center">Iniciar sesión</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Correo electrónico"
            placeholder="tu@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="••••••••"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth>Ingresar</Button>
        </Stack>
      </form>
    </Paper>
  );
}