import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function MantineCard(props) {
  // By making the Card a flex container and allowing the description to grow,
  // we ensure all cards in a row have the same height and aligned buttons.
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      // 1. Make the Card a flex container that fills the height of its grid cell.
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl}
          height={160}
          alt={props.title || "Project image"}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.title}</Text>
        <Badge color="pink">{props.badgeText}</Badge>
      </Group>

      {/* 2. Allow the description Text to grow and fill available space. */}
      <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
        {props.description}
      </Text>

      {/* 3. The button will now be pushed to the bottom of the card. */}
      <Button color="blue" fullWidth mt="md" radius="md">
        {props.buttonText}
      </Button>
    </Card>
  );
}
export default MantineCard;
