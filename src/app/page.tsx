import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Credentials } from "@/components/sections/credentials";
import { Projects } from "@/components/sections/projects";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";


export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <Team />
      <Credentials />
      <Contact />
    </>
  );
}
