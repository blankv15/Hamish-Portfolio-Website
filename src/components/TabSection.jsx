import { Grid, Tabs } from "@mantine/core";
import "./TabSection.css";
import TechBadge from "./TechBadge";

function TabSection(props) {
  return (
    <>
      <Tabs defaultValue="Software Development">
        <Tabs.List>
          <Tabs.Tab value="gallery">Full-Stack Development</Tabs.Tab>
          <Tabs.Tab value="messages">Cloud & Infrastructure</Tabs.Tab>
          <Tabs.Tab value="settings">AI & Automation</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <Grid grow>
            <Grid.Col
              className="tab-image-col"
              span={{ base: 12, md: 6, lg: 3 }}
            >
              <img src="https://picsum.photos/400/400" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <h3>Full-Stack Development</h3>
              <p>
               I develop full-stack web applications, focusing on creating functional, user-friendly experiences that meet business objectives.
              </p>

              <ol>
                <li>Project Delivery: Developed web applications from concept to deployment, including lead-generation and e-commerce sites.</li>
                <li>Frontend: Built responsive user interfaces using HTML, CSS, and JavaScript.</li>
                <li>Backend: Implemented server-side logic and managed databases with PHP and MySQL on a LAMP stack.</li>

              </ol>
              <TechBadge badgeText="PHP"/>
              <TechBadge badgeText="MySQL"/>
              <TechBadge badgeText="MySQL"/>
              <TechBadge badgeText="MySQL"/>

            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
    </>
  );
}

export default TabSection;
