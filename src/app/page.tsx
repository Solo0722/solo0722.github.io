import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Experience } from "@/components/sections/experience";
import { Credentials } from "@/components/sections/credentials";


export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Credentials/>
    </>
  );
}
