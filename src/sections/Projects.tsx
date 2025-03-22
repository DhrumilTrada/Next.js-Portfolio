import Image from "next/image";
import JobPortalPage from "@/assets/images/job-portal.png";
import DriveHexPage from "@/assets/images/drive-hex.png";
import FitLifePage from "@/assets/images/fit-life.png";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "Job Portal",
    year: "2024",
    title: "Job Hunting Platform",
    results: [
      { title: "Cloudinary for image & pdf uploading" },
      { title: "React redux store for state management" },
      { title: "Role based access control" },
    ],
    link: "https://jobhunt-job-searching-portal-1.onrender.com/",
    image: JobPortalPage,
  },
  {
    company: "Car Rental",
    year: "2024",
    title: "Drive Hex Car Rentals",
    results: [
      { title: "Django + React for backend and frontend" },
      { title: "Information data set for each cars present" },
      { title: "Interactive user interface" },
    ],
    link: "https://github.com/DhrumilTrada/Car-Rental",
    image: DriveHexPage,
  },
  {
    company: "FitLife",
    year: "2024",
    title: "FitLife - Fitness Website",
    results: [
      { title: "Django + React for backend and frontend" },
      { title: "Full body svg vector for various body parts" },
      { title: "External api integration for exercises" },
    ],
    link: "https://github.com/DhrumilTrada/Fit-Life",
    image: FitLifePage,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        {/* tracking-widest for letter spacing */}
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I've transformed concepts into engaging digital experiences."
        />
        <div className="flex flex-col mt-10 gap-20 md:mt-20">
          {portfolioProjects.map((project, index) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md-px-10 lg:pt-16 lg:px-20 hover:transform hover:-translate-y-2 transition-transform duration-300 sticky"
              style={{
                top: `calc(64px + ${index * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl md:mt-5 mt-2">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-2 md:text-base text-sm text-white/50"
                      >
                        <CheckCircleIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link} target="_blank">
                    <button className="bg-white text-gray-950 inline-flex md:w-auto px-6 items-center justify-center gap-2 mt-8 h-12 w-full rounded-xl font-semibold">
                      <span>Visit live site</span>
                      <ArrowUpRightIcon className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
