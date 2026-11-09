export type ExperienceRole = {
  title: string;
  start: string;
  end: string;
  description: string[];
  tech?: string[];
};

export type Experience = {
  company: string;
  tagline: string;
  location: string;
  url?: string;
  /** Sin logo se muestra un ícono genérico. */
  logo?: string;
  roles: ExperienceRole[];
};

export const PRESENT = "Present";

export const EXPERIENCES: Experience[] = [
  {
    company: "Forest",
    tagline: "The largest eBike rental solution in the city of London.",
    location: "London, UK",
    url: "https://forest.bike",
    logo: "/_static/companies/forest.png",
    roles: [
      {
        title: "Software Engineer",
        start: "Sep 2025",
        end: PRESENT,
        description: [
          "Migrated the entire backend to a gRPC monorepo, allowing the platform to handle more than 50,000 rides per day.",
          "Lead features that keep field operations running, such as map updates, damage collection and rebalancing tasks.",
        ],
        tech: ["gRPC", "Monorepo", "Backend", "Ops tooling"],
      },
    ],
  },
  {
    company: "Conergie",
    tagline: "Data-driven electricity supply, consulting and energy trading.",
    location: "Santiago, Chile",
    url: "https://conergie.cl",
    logo: "/_static/companies/conergie.png",
    roles: [
      {
        title: "Software Engineer",
        start: "Aug 2024",
        end: "Sep 2025",
        description: [
          "Built ETL pipelines for consumption data from 4,000+ clients, processing supply company offers in under 10 minutes.",
          "Automated customer acquisition from a supply contract database, reaching 50+ clients per iteration.",
          "Implemented an electric bill prediction engine and full-stack features for the energy bidding platform.",
          "Led client meetings to explain offers and the benefits of migrating to the non-regulated market.",
        ],
        tech: ["Django", "Node.js", "React", "Next.js", "ETL"],
      },
    ],
  },
  {
    company: "Enerlink",
    tagline: "Electromobility, electrical metering and energy markets.",
    location: "Santiago, Chile",
    url: "https://www.enerlink.com",
    logo: "/_static/companies/enerlink.png",
    roles: [
      {
        title: "Software Engineer",
        start: "Jan 2021",
        end: "Jun 2024",
        description: [
          "Designed and maintained a multi-instance electrical tariff system for 1,000+ meters across 40+ clients.",
          "Developed a Django tariff engine integrated with smart and manual meters and real-time ingestion pipelines.",
          "Migrated legacy systems to Docker and GitLab CI/CD, reducing operational costs by 23%.",
          "Led a fleet management module with real-time updates using Django signals, Celery and Redis.",
        ],
        tech: ["Django", "React", "Celery", "Redis", "PostgreSQL", "Docker", "GitLab CI/CD", "AWS"],
      },
      {
        title: "IoT Engineer",
        start: "Jan 2020",
        end: "Jan 2021",
        description: [
          "Built a telemetry device with STM32, CAN and SIM7600 4G, installed as a prototype in 100+ vehicles.",
          "Developed AWS backend services to manage TCP connections and persist data from field devices.",
          "Implemented Redis queuing and optimized TCP port handling for efficient data flow.",
        ],
        tech: ["C", "STM32", "CAN", "SIM7600", "AWS", "Redis"],
      },
    ],
  },
  {
    company: "Reborn Electric",
    tagline: "Electrification of diesel buses for public transport.",
    location: "Santiago, Chile",
    url: "https://rebornelectric.cl",
    logo: "/_static/companies/reborn.png",
    roles: [
      {
        title: "R&D Intern",
        start: "Jan 2019",
        end: "Feb 2019",
        description: [
          "Developed a telemetry system for real-time remote monitoring of buses over WiFi.",
          "Implemented a charging algorithm using the Combined Charging System (CCS) standard.",
        ],
        tech: ["Telemetry", "CCS"],
      },
    ],
  },
  {
    company: "Pontificia Universidad Católica de Chile",
    tagline: "Department of Electrical Engineering.",
    location: "Santiago, Chile",
    url: "https://www.uc.cl",
    logo: "/_static/companies/uc.png",
    roles: [
      {
        title: "Teaching Assistant",
        start: "2016",
        end: "2019",
        description: [
          "Chief TA for Electrical Machines, managing semester projects for 35 student groups.",
          "TA for Signals & Systems and the Automatic Control Lab: taught, graded and supported students.",
        ],
      },
    ],
  },
  {
    company: "Independent Projects",
    tagline: "Hands-on projects outside of work.",
    location: "Santiago, Chile",
    roles: [
      {
        title: "Freelance Developer",
        start: "Ongoing",
        end: PRESENT,
        description: [
          "Built a mechanical crane monitor with a Kalman filter, accelerometer and GPS.",
          "Created web scraping tools for tax data using Python and Selenium.",
          "Developed a real-time Pong game using Go and WebSockets.",
          "Explored infrastructure as code with Terraform and Go microservices.",
          "Set up a reverse SSH proxy to run DeepSeek on remote GPU hardware.",
        ],
        tech: ["Go", "Python", "Terraform", "WebSockets", "Selenium"],
      },
    ],
  },
];
