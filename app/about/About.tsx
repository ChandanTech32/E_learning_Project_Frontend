import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">E-Learning?</span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Are you ready to take your programming skills to the next level? 
          Welcome to E-learning, a modern platform designed to help aspiring developers 
          build strong technical foundations and achieve their career goals.

          <br />
          <br />

          At E-learning, we understand the challenges that come with learning programming 
          in today’s fast-evolving tech landscape. Our mission is to provide learners with 
          the right resources, structured guidance, and practical knowledge required to 
          succeed in the industry.

          <br />
          <br />

          Our platform offers a wide range of high-quality educational content, including 
          video tutorials, structured courses, and real-world projects. From beginner-level 
          concepts to advanced programming techniques, our content is carefully designed 
          to ensure clarity, depth, and practical understanding.

          <br />
          <br />

          We are committed to making education accessible and affordable. Our courses are 
          priced thoughtfully so that learners from all backgrounds can gain valuable 
          skills without financial barriers.

          <br />
          <br />

          Beyond just learning, E-learning fosters a supportive and collaborative 
          community. Whether you are starting your journey or advancing your expertise, 
          you will find guidance, motivation, and support every step of the way.

          <br />
          <br />

          Our goal is to empower individuals with the skills and confidence needed to 
          succeed in the programming industry and build meaningful careers.

          <br />
          <br />

          Join E-learning today and take a step closer to achieving your professional goals.
        </p>

        <br />

        <span className="text-[22px]">Chandan Gupta</span>

        <h5 className="text-[18px] font-Poppins">
          Founder & CEO, E-learning
        </h5>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;