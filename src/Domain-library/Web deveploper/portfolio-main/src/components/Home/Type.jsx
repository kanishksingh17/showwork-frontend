import React from "react";
import Typewriter from "typewriter-effect";
import { portfolioData } from "../../data/portfolioData";

const Type = () => {
  return (
    <Typewriter
      options={{
        strings: portfolioData.basicInfo.title,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  )
}

export default Type