// Centralized Portfolio Data Template
// Update this file with your own details to customize the portfolio.

import laptopImg from "../assets/home-main.svg";
import homeLogo from "../assets/about.png";
import sLogo from "../assets/sLogo.png";

export const portfolioData = {
    basicInfo: {
        name: "Your Name",
        firstName: "First Name",
        location: "Your Location",
        title: [
            "Your Role 1",
            "Your Role 2",
            "Your Role 3"
        ],
        presentationImg: homeLogo, // Placeholder image
        aboutImg: laptopImg, // Placeholder image
        logo: sLogo, // Placeholder logo
    },
    socialLinks: {
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        leetcode: "https://leetcode.com/yourusername",
    },
    usernames: {
        github: "yourusername",
        leetcode: "yourusername",
    },
    about: {
        intro: "Hi, my name is [Your Name] and I'm from [Your Location].",
        description: "Write a brief description about your background and experience.",
        skills: "List your key skills and proficiencies here.",
        interests: "Share your professional interests and passion."
    },
    projects: [
        // Add your projects here
        // {
        //   title: "Project Title",
        //   description: "Project Description",
        //   ghLink: "https://github.com/yourusername/project",
        //   demoLink: "https://project-demo.com",
        //   imgPath: "path/to/image",
        // },
    ],
    resume: {
        localPdf: "/path/to/your/resume.pdf",
        remotePdf: "https://raw.githubusercontent.com/yourusername/portfolio/main/src/assets/resume.pdf",
    },
    emailJS: {
        serviceID: "your_service_id",
        templateID: "your_template_id",
        publicKey: "your_public_key",
    },
    footer: {
        motto: "Dedicated to creating impactful solutions!",
    }
};
