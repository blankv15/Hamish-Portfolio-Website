
import { useState } from 'react';
import { Button, Group, Textarea, TextInput, Title, Container, Stack, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Notifications ,notifications} from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

function GetInTouchSimple() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (!/^\S+@\S+$/.test(value) ? 'Invalid email address' : null),
      message: (value) => (value.trim().length === 0 ? 'Message cannot be empty' : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });



      if (!response.ok) {

        throw new Error('Something went wrong on the server. Please try again.');
      }

      notifications.show({
        title: 'Message Sent!',
        message: 'Thank you for your message. I will get back to you shortly.',
        color: 'green',
      });
      
      form.reset(); 
    } catch (error) {
      notifications.show({
        title: 'Submission Error',
        message: error.message,
        color: 'red',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper
        p="xl"
        radius="md"
        shadow="md"
        withBorder
        bg="rgba(255, 255, 255, 0.05)"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={2} ta="center">
              Get In Touch
            </Title>
            <Text c="dimmed" ta="center">
              Have a project or question? I'd love to hear from you.
            </Text>

            <TextInput
              label="Name"
              placeholder="Your name"
              variant="filled"
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Email"
              placeholder="Your email"
              variant="filled"
              {...form.getInputProps('email')}
            />

            <Textarea
              label="Message"
              placeholder="Your message"
              minRows={5}
              variant="filled"
              {...form.getInputProps('message')}
            />
            
            <Group justify="center" mt="md">
              <Button type="submit" size="md" loading={loading}>
                Send message
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default GetInTouchSimple;
