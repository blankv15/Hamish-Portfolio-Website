import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import profilePic from "../src/assets/profile.png";
import { Card, SimpleGrid, Group } from "@mantine/core";
import DisplayCard from "./components/DisplayCard";
import SomeData from "./assets/data/someData.json";
import TabSection from "./components/TabSection";
import TechBadge from "./components/TechBadge";

function App(SomeData) {
  const [count, setCount] = useState(0);

  const cardInfo = SomeData;

  return (
    <>
      <div className="hero">
        <img className="Profile-Pic" src={profilePic} />
        <h1 className="heroText">
          Hey, I'm <span className="name">Hamish Chhagan.</span> I Like to build
          Things. Here you can find my latest work and what I'm doing at the
          moment
        </h1>
      </div>

      <div className="featured-projects">
        <h2>Featured Projects</h2>
        <Group  >
          <DisplayCard
            image_url="https://picsum.photos/300/160"
            title="Norway Fjord Adventures"
            description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
            buttonText="Read More"
          />
          <DisplayCard
            image_url="https://picsum.photos/300/160"
            title="Norway Fjord Adventures"
            description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
            buttonText="Read More"
          />
          <DisplayCard
            image_url="https://picsum.photos/300/160"
            title="Norway Fjord Adventures"
            description="With Fjord Tours you can explore more of the magical fjord lndscapes with tours and activities on and around the fjords of Norway"
            buttonText="Read More"
          />
        </Group>
      </div>

      <div className="skills">
        <h2>My Skills</h2>
        <TabSection />
      </div>


      <div>

        <TechBadge badgeText="View My Github"/>
        <TechBadge badgeText="Download My CV"/>

      </div>
    </>
  );
}

export default App;
