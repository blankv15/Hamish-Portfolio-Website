import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function MantineCard(props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={props.imageUrl}
          height={30}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.title}</Text>
        <Badge color="pink">{props.badgeText}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <Button src={props.buttonUrl} color="blue" fullWidth mt="md" radius="md">
        {props.buttonText}
      </Button>
    </Card>
  );
}
export default MantineCard