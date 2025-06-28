import { Badge } from '@mantine/core';

function TechBadge(props) {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      {props.badgeText}
    </Badge>
  );
}
export default TechBadge