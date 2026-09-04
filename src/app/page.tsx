import { Header } from "@/components/header";
import { LanguageHint } from "@/components/language-hint";
import {
  About,
  Community,
  Contact,
  Footer,
  Identity,
  ProofBar,
  Projects,
  Stack,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <LanguageHint />
      <Header />
      {/*
        En escritorio la identidad se va a una columna fija a la izquierda y el
        contenido ocupa el resto del ancho: con una sola columna centrada
        quedaban cientos de pixeles muertos a cada lado. En tablet y movil
        vuelve a apilarse, y el orden del DOM es el mismo en los tres casos.
      */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-20">
          <div className="lg:sticky lg:top-16 lg:h-fit lg:py-16">
            <Identity />
          </div>

          <main id="main-content" className="lg:py-16">
            <ProofBar />
            <About />
            <Projects />
            <Community />
            <Stack />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
