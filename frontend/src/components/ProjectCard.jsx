import { Card, Image, Text, Button, Group } from "@mantine/core";
import "./ProjectCard.css";

function ProjectCard(props) {
  const SkillBadge = ({ skill }) => (
    <span className="project-skill-badge">{skill}</span>
  );

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      bg="var(--background-light)"
      className="project-card" 
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Card.Section>
        <Image
          src={props.imageUrl}
          height={400}
          alt={props.title || "Project image"}
        />
      </Card.Section>

      <div className="project-card-content">
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} c="var(--text-primary)">
            {props.title}
          </Text>
          <SkillBadge skill={props.badgeText} />
        </Group>

        <Text size="sm" c="var(--text-muted)" style={{ flexGrow: 1 }}>
          {props.description}
        </Text>

        <Button 
          fullWidth 
          mt="md" 
          radius="md" 
          bg="var(--accent-orange)"
          styles={{ root: { '&:hover': { backgroundColor: 'var(--accent-orange-hover)' } } }}
        >
          {props.buttonText}
        </Button>
      </div>
    </Card>
  );
}
export default ProjectCard;
