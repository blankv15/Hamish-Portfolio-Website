import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import "./MantineCard.css"
function MantineCard(props) {

  const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

  return (
    <Card 
    className="project-card"
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder="#3877ee4d"
      bc
      bg="#3877ee1a" 
    
      
      // 1. Make the Card a flex container that fills the height of its grid cell.
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl}
          height={400}
          alt={props.title || "Project image"}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text c="white" fw={500}>{props.title}</Text>
        <SkillBadge className='skill-badge' color="pink" skill={props.badgeText}/>
      </Group>

      {/* 2. Allow the description Text to grow and fill available space. */}
      <Text size="sm" c="white"  style={{ flexGrow: 1 }}>
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
