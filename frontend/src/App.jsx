
import profilePic from "../src/assets/profile.png";
import { Card, SimpleGrid, Group } from "@mantine/core";
import DisplayCard from "./components/DisplayCard";
import SomeData from "./assets/data/someData.json";
import TabSection from "./components/TabSection";
import TechBadge from "./components/TechBadge";
import ContactForm from "./components/ContactForm";
import ManTineCard from "./components/ManTineCard";
import NavHeader from "./components/NavHeader";
import "./App.css"

function App() {


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


    <SimpleGrid cols={4}  >
          <ManTineCard/>
          <ManTineCard/>    
          <DisplayCard/>
    </SimpleGrid>
      </div>

      <div className="skills">
        <h2>My Skills</h2>
        <TabSection />
      </div>





    </>
  );
}

export default App;
