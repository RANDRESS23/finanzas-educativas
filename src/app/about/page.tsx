import AboutSection from "./AboutSection";
import Team from "./Team";

export default function About(): React.ReactNode {
  return (
    <>
      <div id="quienesSomos" className="w-5 h-5 mt-[-70px]" />
      <main className="px-8 md:px-16 py-40">
        <AboutSection
          svgName="ABOUT_US"
          svgInLeftPosition
          title="¿Quienes somos?"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
          delectus provident necessitatibus laudantium in officia soluta
          vitae quasi autem consequatur dolor omnis ratione incidunt
          voluptatum illum temporibus nostrum similique saepe consequuntur,
          aspernatur esse commodi inventore. Quisquam, quibusdam.
          Laboriosam, maiores labore?"
          moreDescription=""
        />
        <div id="mision" />
        <AboutSection
          svgName="MISION"
          svgInLeftPosition={false}
          title="Misión"
          description="Nuestra misión es empoderar a las personas para que tomen el
          control de su futuro financiero a través de la promoción de la
          tendencia al ahorro y la educación financiera. Nos esforzamos por
          proporcionar las herramientas, recursos y conocimientos necesarios
          para que las personas tomen decisiones informadas sobre sus
          finanzas personales y alcancen sus metas financieras a corto y
          largo plazo."
          moreDescription=""
        />
        <div id="vision" />
        <AboutSection
          svgName="VISION"
          svgInLeftPosition
          title="Visión"
          description="Nuestra visión es construir un mundo en el que la tendencia al ahorro
          y la educación financiera sean accesibles y valoradas por todos.
          Visualizamos una sociedad en la que las personas comprendan los
          principios fundamentales de las finanzas personales, tomen decisiones
          financieras inteligentes y estén preparadas para enfrentar los
          desafíos económicos con confianza."
          moreDescription="Para lograr nuestra visión, trabajamos incansablemente para brindar
          información educativa de alta calidad, herramientas interactivas y
          recursos prácticos que ayuden a las personas a administrar sus
          finanzas de manera efectiva. Aspiramos a ser líderes en la promoción
          de la educación financiera y la cultura del ahorro, contribuyendo
          así a una sociedad más próspera y económicamente segura para todos."
        />

        <div id="team" />
        <Team />
      </main>
    </>
  );
}
