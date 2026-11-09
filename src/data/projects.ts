export type WebApp = {
  title: string;
  repo: string;
  description: string;
  tags: string[];
  demo?: string;
  thumbnail: string;
  /** Repos adicionales de un mismo proyecto, además de `repo`. */
  extraRepos?: { label: string; href: string }[];
};

export const WEB_APPS: WebApp[] = [
  {
    title: "Exwood",
    repo: "https://github.com/jmbustos1/backend-ewood",
    extraRepos: [
      { label: "Mobile", href: "https://github.com/jmbustos1/ewood-mobile" },
      {
        label: "Firmware",
        href: "https://github.com/jmbustos1/esp32ewood/tree/chore/consolidate-fixes-aug",
      },
      { label: "Dashboard", href: "https://github.com/jmbustos1/frontend-ewood" },
    ],
    thumbnail: "/_static/projects/exwood.png",
    description:
      "Electric scooter rental platform, from device to cloud: IoT firmware, a Go backend with raw TCP and WebSockets for real-time tracking and remote lock/unlock, a mobile app with live map, trips and wallet, and a fleet dashboard.",
    tags: ["Go", "React Native", "Next.js", "ESP32", "SIM7600", "WebSocket", "PostgreSQL", "AWS", "Terraform"],
  },
  {
    title: "Remote Dev Access",
    repo: "https://github.com/jmbustos1/remote-dev-access",
    thumbnail: "/_static/projects/p2p-handshake.png",
    description:
      "A phone-to-PC terminal that reaches machines behind NAT over a direct connection, using hand-written UDP hole punching with QUIC and an embedded SSH server on top. Serverless AWS signaling and tmux let sessions survive disconnects; a relay for harder networks is still planned.",
    tags: ["Go", "QUIC", "UDP Hole Punching", "STUN", "UPnP", "SSH", "Kotlin", "Android", "AWS Lambda", "Terraform"],
  },
  {
    title: "EC2 Ollama Proxy",
    repo: "https://github.com/jmbustos1/ollama-remote-gateway",
    thumbnail: "/_static/projects/llama-01-scaled.png",
    description:
      "Runs an LLM on a remote GPU machine and sends it prompts from anywhere, through a reverse SSH tunnel and a small Go proxy on an EC2 gateway.",
    tags: ["Go", "Reverse SSH", "AWS", "Terraform", "Ollama"],
  },
  {
    title: "ECS Blue/Green with CodeDeploy",
    repo: "https://github.com/jmbustos1/aws-devops-study",
    thumbnail: "/_static/projects/images-aws.png",
    description:
      "A blue/green deployment for ECS built with Terraform and CodeDeploy, shifting traffic between target groups behind an ALB from a GitHub Actions pipeline, plus an Elastic Beanstalk proof of concept.",
    tags: ["Terraform", "AWS", "ECS", "CodeDeploy", "ALB", "GitHub Actions"],
  },
  {
    title: "Netflix Backblaze",
    repo: "https://github.com/jmbustos1/netflix-backblaze",
    thumbnail: "/_static/projects/govid.png",
    description:
      "A video catalog with a Go API, Next.js and PostgreSQL. The API issues time-limited Backblaze B2 signed URLs, so the browser plays video directly from storage instead of through the server.",
    tags: ["Go", "Gin", "Next.js", "PostgreSQL", "sqlc", "Backblaze B2", "Docker"],
  },
  {
    title: "Go Pong Game",
    repo: "https://github.com/jmbustos1/pong_server/tree/online-server",
    extraRepos: [
      {
        label: "Client",
        href: "https://github.com/jmbustos1/pong_client/tree/online-pvp",
      },
    ],
    thumbnail: "/_static/projects/pong1.png",
    description:
      "Two-player Pong in Go: an Ebiten client and a WebSocket server with a 60 Hz tick loop and in-memory lobbies. Online play is a work in progress.",
    tags: ["Go", "Ebiten", "WebSocket", "Docker"],
  },
  {
    title: "Go Lambda Deploy",
    repo: "https://github.com/jmbustos1/go-lambda-deploy",
    thumbnail: "/_static/projects/lambda-go-deploy-container.png",
    description:
      "Packages a Go Lambda as a container image, pushes it to ECR and invokes it through API Gateway.",
    tags: ["Go", "AWS Lambda", "ECR", "API Gateway", "Docker"],
  },
  {
    title: "Go EC2 Deploy",
    repo: "https://github.com/jmbustos1/go-ec2",
    thumbnail: "/_static/projects/298e0e16-3054-49b7-8695-db510e0df2df.png",
    description:
      "Ships a containerized Go TCP server to an existing EC2 instance using ECR and SSM Run Command, with no inbound SSH step.",
    tags: ["Go", "Docker", "AWS", "EC2", "ECR", "SSM", "Bash"],
  },
] as WebApp[];
