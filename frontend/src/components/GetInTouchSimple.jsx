// 1. Add Paper to your imports
import { Button, Group, Textarea, TextInput, Title, Container, Stack, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
    },
  });

  return (
    <Container size="sm" py="xl">
      {/* 2. Add the Paper component here to act as the glass container */}
      <Paper
        p="xl"
        radius="md"
        shadow="md"
        withBorder
        // These next two lines create the "glass" effect
        bg="rgba(255, 255, 255, 0.05)"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Title
              order={2}
              ta="center"
            >
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
              <Button type="submit" size="md">
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