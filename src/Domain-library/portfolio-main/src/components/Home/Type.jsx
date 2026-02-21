import React from "react";
import Typewriter from "typewriter-effect";


const Type = ({ data: portfolioData }) => {
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
