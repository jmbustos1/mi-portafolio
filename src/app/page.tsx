import Image from "next/image";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/blog/blog-card";
import React from "react";
import Link from "next/link";
import { LINKS } from "@/data/links";
import { EXPERIENCES } from "@/app/data/experience";
import { ExperienceCard } from "@/components/experience/experience-cards";


export default function Home() {
  const blogs = allBlogs
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <React.Fragment>
      <section className="mb-5">
        <Image
          src="/_static/me.jpg"
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full cursor-pointer hover:grayscale mb-5"
          priority
        />
        <h1 className="text-2xl font-bold">Jose Bustos</h1>

        <div className="text-gray-700 dark:text-gray-300">
          <p className="mt-4">
            I’m a Software Engineer with a background in Electrical Engineering and strong 
            foundations in statistics and mathematics, specializing in designing robust and 
            resilient digital architectures and solutions.
          </p>
          <p className="mt-4 mb-4">
            Over the years, I’ve worked with multiple startups to build and launch 
            end-to-end products in sectors like insurance, IoT, and electrical markets. 
            My focus has been on infrastructure design, DevOps, and implementing coding 
            best practices as core pillars in every product developed.
          </p>

          <p className="mb-4">
            I&apos;m currently open to new opportunities! If you have an
            exciting project or role that aligns with my expertise, please reach
            out at&nbsp;
            <a href="mailto:josebm78@gmail.com" className="border-b inline-block">
              josebm78@gmail.com
            </a>
            &nbsp;or through any of my social channels below.
          </p>
        </div>

        <div className="flex space-x-4 mb-2 mt-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 "
            />
          ))}
        </div>
        <p className="mt-4 border-b inline-block cursor-pointer">
          <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </p>
      </section>

      <div className="my-8 w-full border-t border-gray-200 dark:border-gray-800" />

      <div id="experience">
        <h2 className="mb-6 text-2xl font-bold">Experience</h2>
        <ul>
          {EXPERIENCES.map((exp, index) => (
            <li key={index}>
              <ExperienceCard {...exp} />
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
