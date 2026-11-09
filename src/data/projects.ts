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
    repo: "https://github.com/jmbustos1/desafio-plutto",
    thumbnail: "/_static/projects/298e0e16-3054-49b7-8695-db510e0df2df.png",
    description:
      "Go project for deploying EC2 instances fast.",
    tags: ["HCL", "AWS", "Golang","Terraform", "ECR", "EC2", "Bash"],
  },
] as WebApp[];
