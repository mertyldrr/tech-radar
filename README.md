# Tech Radar

This project is an extension of [Zalando's Tech Radar](https://github.com/zalando/tech-radar) and goal was to customize it to be able to add new technologies, remove technologies and restore previous state of the Tech Radar.

# Table of Contents

- [What is Tech Radar](#what-is-tech-radar)
- [Technology Stack](#technology-stack-and-justification)
- [Features](#features)
- [Installation and Usage](#installation-and-usage)
- [License](#license)

## What is Tech Radar
A Tech Radar is a visual tool or framework that provides a snapshot of the current state of technology adoption within an organization or industry. It is commonly used to track and assess various technologies, tools, frameworks, and practices.

## Technology Stack and Justification
This project is created using ReactJS, Typescript, [tailwindcss](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com/).
#### Why shadcn/ui  
   shadcn/ui offers customizable components built with Radix UI and Tailwind CSS. The components look modern and the biggest advantage is, it is created using tailwindcss and is easy to customize based on your needs. The downside is, components have loads of inline-style and look not clean/hard to understand at first glance.
#### State Management  
   I wanted to use the redux toolkit to store shared values in a global state to create a more modular structure without passing the states but the data radar.js produces is non-serializable and hence it is not possible to store tech radar entries. That's why I decided to use a single component for most of the functionality. It is still possible to create multiple components out of it but I would need to pass state as props to almost everywhere. I was not sure which way would be cleaner.

## Features

- Adding new technology to the Tech Radar.
- It is possible to clear Tech Radar.
- This custom Tech Radar tracks history and it is possible to restore the last 5 versions of your Tech Radar.

## Installation and Usage

1. Clone the repository: `git clone https://github.com/mertyldrr/tech-radar.git`
2. Change to the project directory: `cd tech-radar`
3. Install dependencies using: `yarn`
4. Run project locally using: `yarn run dev`
5. Open your browser and visit: `http://localhost:5173`

## License

Indicate the license under which your project is distributed. For example:

This project is licensed under the [MIT License](LICENSE).
