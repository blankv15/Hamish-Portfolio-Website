import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

{
  /*.  image size is 300px* 160px */
}
function ManTineCard() {
  return (
   <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section>
        <Image
          src="https://picsum.photos/200/200"
          height={200}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}

export default ManTineCard;
