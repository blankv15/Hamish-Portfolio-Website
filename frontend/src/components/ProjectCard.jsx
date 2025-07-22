import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import "./ProjectCard.css";



function ProjectCard(props) {
  const SkillBadge = ({ skill }) => (
    <span className="skill-badge">{skill}</span>
  );

  return (
    <Card
      className="project-card"
      shadow="sm"
      padding="lg"
      radius="md"
      bc
      bg="#3877ee1a"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl}
          height={400}
          alt={props.title || "Project image"}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text c="white" fw={500}>
          {props.title}
        </Text>
        <SkillBadge
          className="skill-badge"
          color="pink"
          skill={props.badgeText}
        />
      </Group>

      <Text size="sm" c="white" style={{ flexGrow: 1 }}>
        {props.description}
      </Text>

      <Button bg="#2c265a" fullWidth mt="md" radius="md">
        {props.buttonText}
      </Button>
    </Card>
  );
}
export default ProjectCard;
