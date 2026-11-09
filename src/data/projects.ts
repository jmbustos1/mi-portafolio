export type WebApp = {
  title: string;
  repo: string;
  description: string;
  tags: string[];
  demo?: string;
  thumbnail: string;
};

export const WEB_APPS: WebApp[] = [
  {
    title: "Form Axis",
    repo: "https://github.com/adarshaacharya/form-axis",
    description:
      "AI powered form builder with conversational user interfaces. Just type a prompt, share a link, and watch users chat their way to glory.",
    tags: ["Next.js", "Shadcn", "Convex", "Clerk", "Gemini", "Vercel"],
    thumbnail: "/_static/projects/form-axis.png",
  },
  {
    title: "Bricks",
    repo: "https://github.com/adarshaacharya/bricks",
    description:
      "An api powered real estate marketplace. Bricks can be starter for building any scalable SaaS product using Nest.js.",
    tags: ["Nest.js", "PostgreSQL", "Prisma", "Docker", "Redis", "oAuth"],
    thumbnail: "/_static/projects/bricks.png",
  },
  {
    title: "Mentor Labs",
    tags: ["Typescript", "React", "Redux Toolkit", "Nodejs", "PostgreSQL"],
    description:
      "Apply for mentorship to the top mentors recommended by our powerful algorithm based on your profile. Enjoy one-to-one live mentorship in our interactive video streaming labs for free.",
    thumbnail: "/_static/projects/mentorlabs.png",
    repo: "https://github.com/adarshaacharya/MentorLabs",
  },
  {
    title: "CS Overflow",
    repo: "https://github.com/adarshaacharya/CsOverflow",
    thumbnail: "/_static/projects/csoverflow.png",
    description:
      "Q/A forum for Computer Science and Engineering students. Ask a question, contribute an answer and upvote your favourite one.",
    tags: ["Typescript", "React", "Redux", "Nodejs", "PostgreSQL"],
  },
  {
    title: "Pass Man",
    repo: "https://github.com/adarshaacharya/PassMan",
    demo: "https://passmanager.vercel.app/",
    thumbnail: "/_static/projects/passman.png",
    description:
      "Cloud based password manager, create vault for personal and business purpose and store the credentials of different type. Credentials are hashed using AES256 algorithm, and one way hashing is done using Scrypt algorithm.",
    tags: ["Next.js", "Next Auth", "Prisma", "Docker", "Chakra UI"],
  },
  {
    title: "Code Treats",
    repo: "https://github.com/adarshaacharya/CodeTreats",
    thumbnail: "/_static/projects/codetreats.png",
    description:
      "In-browser IDE for running, collaborating and saving code snippets. Code Treats supports 10+ languages and 15+ beautiful themes with VS code like text editor. Multiple users can sit on same room, collaborate and talk on real-time.",
    tags: ["Typescript", "React", "Nodejs", "MongoDB", "Socket"],
  },
  {
    title: "E-Complaints",
    repo: "https://github.com/adarshaacharya/E-Complaints",
    thumbnail: "/_static/projects/ecomplaints.png",
    description:
      "A public complaint management app that helps user to send the compaints to different government departments, admin can filter & forward complaints to respective department and department officer will reply to that complaint.",
    tags: ["Node.js", "Express", "Ejs", "MongoDB"],
  },
  {
    title: "Node.js Blog System",
    repo: "https://github.com/adarshaacharya/NodejsBlogSystem",
    thumbnail: "/_static/projects/blog.png",
    description:
      "Boilerplate for starting the blogging using Node JS, MongoDB and Socket for real time update. User can create profile, post & make comments on posts.",
    tags: ["Node.js", "Express", "Ejs", "MongoDB"],
  },
  {
    title: "Tour 360°",
    repo: "https://github.com/adarshaacharya/Tour360",
    thumbnail: "/_static/projects/tour360.png",
    description:
      "Tour 360° is a virtual reality viewing platform build for VisitNepal2020 that helps to view 360 thumbnails & book flights airplane, hotels hotel and guides boy.",
    tags: ["Php", "MySQL", "Aws"],
  },
  {
    title: "EC2 Ollama Proxy",
    repo: "https://github.com/jmbustos1/ollama-remote-gateway",
    thumbnail: "/_static/projects/llama-01-scaled.png",
    description:
      "Special Project for implementing locally a LLM on a remote machine with a dedicated GPU and generate prompts to there from a remote computer.",
    tags: ["HCL", "Reverse SSH", "AWS", "Golang", "Ollama"],
  },
  {
    title: "AWS DevOps Deploy Strategies",
    repo: "https://github.com/jmbustos1/aws-devops-study",
    thumbnail: "/_static/projects/images-aws.png",
    description:
      "DevOps project to understand deploy strategies and AWS services.",
    tags: ["HCL", "AWS", "DevOps","Terraform"],
  },
  {
    title: "Netflix Backblaze",
    repo: "https://github.com/jmbustos1/netflix-backblaze",
    thumbnail: "/_static/projects/govid.png",
    description:
      "Project build in golang to understand monolitic apps, video streaming, BLOB storage and no ORM dbs.",
    tags: ["HCL", "AWS", "Golang","Terraform", "React", "Backblaze", "Gin"],
  },
  {
    title: "Go Pong Game",
    repo: "https://github.com/jmbustos1/pong_server",
    thumbnail: "/_static/projects/pong1.png",
    description:
      "Long term project made in golang to understand instance launch per lobby, websocket for bidirectional comunication and ticker server. Event Driven architecture.",
    tags: ["HCL", "AWS", "Golang","Terraform", "Websocket", "Ebiten", "Event-Driven"],
  },
  {
    title: "Go Lambda Deploy",
    repo: "https://github.com/jmbustos1/go-lambda-deploy",
    thumbnail: "/_static/projects/lambda-go-deploy-container.png",
    description:
      "Simple go project to deploy lambda functions fast on ECR containers and invoke them through API Gateway interface.",
    tags: ["HCL", "AWS", "Golang","Terraform", "ECR", "API Gateway", "Event-Driven"],
  },
  {
    title: "Go EC2 Deploy",
    repo: "https://github.com/jmbustos1/desafio-plutto", // cambiar y modificar el de verdad
    thumbnail: "/_static/projects/298e0e16-3054-49b7-8695-db510e0df2df.png",
    description:
      "Go project for deploying EC2 instances fast.",
    tags: ["HCL", "AWS", "Golang","Terraform", "ECR", "EC2", "Bash"],
  },
] as WebApp[];

export const TOOLS = [
  {
    title: "states-nepal",
    repo: "https://github.com/adarshaacharya/states-nepal",
    external: "https://www.npmjs.com/package/states-nepal",
    description:
      "npm package to get the dataset about different administrative division of Nepal.",
    techs: ["npm-package"],
  },
  {
    title: "aaja (आज)",
    repo: "https://github.com/adarshaacharya/aaja",
    external: "https://www.npmjs.com/package/aaja",
    description:
      "Cli tool to get today's nepali date, tithi, public events and current time.",
    techs: ["npm-package"],
  },
  {
    title: "ApiHub",
    repo: "https://github.com/adarshaacharya/ApiHub",
    external:
      "https://marketplace.visualstudio.com/items?itemName=AadarshaAcharya.api-hub",
    description:
      "VS Code extension to get free third party api url on different categories.",
    techs: ["vscode-extension"],
  },
  {
    title: "shitcommits",
    repo: "https://github.com/adarshaacharya/shitcommits",
    external: "https://www.npmjs.com/package/shitcommits",
    description: "Cli tool to make git commits with not-so perfect messges.",
    techs: ["npm-package"],
  },
];
