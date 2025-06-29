import React from "react";
import { Grid, Button, Group, Flex } from "@mantine/core";
import TechBadgeList from "../components/TechBadgeList";
import "./TabSection.css";

function TabPanelContent({ tab, onBack, onNext, isFirstTab, isLastTab }) {
  const { image, title, description, points, tech } = tab;

  return (
    <>
      <Grid grow>
        <Grid.Col className="tab-image-col" span={{ base: 12, md: 4, lg: 3 }}>
          <img
            src={image}
            alt={title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
          <div className="tab-text-content-wrap">
            <h3>{title}</h3>
            <p>{description}</p>
            <ul>
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
                      <TechBadgeList technologies={tech} />

          </div>

        </Grid.Col>
      </Grid>

      {/* Arrange both buttons together on the right */}
      <Flex justify="flex-end" mt="xl">
        <Group>
          <Button variant="default" onClick={onBack}>
            {isFirstTab ? "↪️" : "👈"}
          </Button>
          <Button onClick={onNext}>{isLastTab ? "↩️" : "👉"}</Button>
        </Group>
      </Flex>
    </>
  );
}

export default TabPanelContent;
