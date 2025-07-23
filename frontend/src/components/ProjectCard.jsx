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
      // Use the 'bg' prop with a CSS variable for the background color
      bg="var(--background-light)"
      className="project-card" // Keep the class for hover effects
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
          {/* Use the 'c' prop for text color */}
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
          // Use the 'bg' prop for the button's background
          bg="var(--accent-orange)"
          // Add a hover effect directly
          styles={{ root: { '&:hover': { backgroundColor: 'var(--accent-orange-hover)' } } }}
        >
          {props.buttonText}
        </Button>
      </div>
    </Card>
  );
}
export default ProjectCard;
