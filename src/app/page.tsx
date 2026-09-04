import { Header } from "@/components/header";
import {
  About,
  Community,
  Contact,
  Footer,
  Hero,
  Projects,
  Stack,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero />
        <About />
        <Projects />
        <Community />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
