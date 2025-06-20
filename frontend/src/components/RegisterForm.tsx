import { useForm } from '@mantine/form';
import { Button, TextInput, PasswordInput, Paper, Title, Stack } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo inválido'),
      name: (value) => (value.length > 0 ? null : 'Campo obligatorio'),
      password: (value) => (value.length >= 6 ? null : 'Mínimo 6 caracteres'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await register(values);
      navigate('/login');
    } catch (error) {
      form.setErrors({ email: 'No se pudo registrar el usuario' });
    }
  };

  return (
    <Paper p="xl" withBorder radius="md" maw={400} mx="auto" mt="xl">
      <Title order={3} mb="md" ta="center">Crear cuenta</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Correo electrónico"
            placeholder="tu@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Nombre"
            placeholder="Juan Pérez"
            {...form.getInputProps('name')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="••••••••"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth>Registrarse</Button>
        </Stack>
      </form>
    </Paper>
  );
}