import profilePic from "../src/assets/profile.png";
import { Card, SimpleGrid, Group } from "@mantine/core";
import DisplayCard from "./components/DisplayCard";
import SomeData from "./assets/data/someData.json";
import TabSection from "./components/TabSection";
import TechBadge from "./components/TechBadge";
import NavHeader from "./components/NavHeader";
import ManTineCard from "./components/MantineCard";
import "./App.css";
import GetInTouchSimple from "./components/GetInTouchSimple";

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
        <div className="featured-grid">
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
          <div className="featured-grid-item">
            {" "}
            <ManTineCard />
          </div>
        </div>
      </div>

      <div className="skills">
        <h2>My Skills</h2>
        <TabSection />
      </div>
      <div className="contact-form">
        <h2>Get In Touch</h2>

        <div className="contact-grid">
          <div className="contact-text">
            <h6>
              Whether you're a potential client, a fellow creative, or just
              Browse, I'd be happy to connect. Drop me a line, and let's start a
              conversation.
            </h6>
          </div>

          <div className="form-box">
            <GetInTouchSimple />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
