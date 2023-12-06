// import "../index.css"
import {motion} from "framer-motion"
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
const Section = (props) => {
    const {children,mobileTop} = props;
    return (
        <motion.section 
          className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start ${mobileTop ? "justify-start md:justify-center" : "justify-center"}`} 
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.6,
              },
            }}>
              {children}
          </motion.section>)
}

const handleSubmit = event => {
  console.log('handleSubmit ran');
  event.preventDefault();

  // 👇️ clear all input values in the form
  event.target.reset();
};

export const Interface = (props) =>{
    const {setSection} = props
    return (<div className="flex flex-col items-center w-screen">
        <Section>
            <AboutSection setSection={setSection}/>
        </Section>
        <Section>
            <SkillsSection />
        </Section>
        <ProjectsSection />
        <Section>
            <ContactSection />
        </Section>
    </div>)
}

const AboutSection = (props) => {
    const {setSection} = props
    return (
        <Section mobileTop>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hello, I'm </h1>
        
        <h1 className="text-4xl md:text-6xl font-extrabold bg-white px-1 italic">Manoj Kumar</h1>
      
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I am a Full Stack Developer
        <br />
        Love to create awesome webapps
      </motion.p>
      <motion.button
        onClick={()=>{
          setSection(3)
        }}
        className={`bg-orange-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Let's Connect
      </motion.button>
        </Section>
    )
}

const skills = [
    {
      title: "C",
      level: 80,
    },
    {
      title: "Java",
      level: 70,
    },
    {
      title: "MERN Stack",
      level: 80,
    },
    {
      title: "Threejs / React-three-fiber",
      level: 50,
    },
    {
      title: "Blender 3D Modelling",
      level: 30,
    },
  ];
  const languages = [
    {
      title: "Tamil",
      level: 100,
    },
    {
      title: "English",
      level: 80,
    },
    {
      title: "Hindi",
      level: 50,
    },
    {
      title: "Spanish",
      level: 30,
    },
  ];
  const SkillsSection = () => {
    return (
      <Section>
        <motion.div className="" whileInView={"visible"}>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
          <div className=" mt-8 space-y-4">
            {skills.map((skill, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full "
                    style={{ width: `${skill.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-10">Languages</h2>
            <div className=" mt-8 space-y-4">
              {languages.map((lng, index) => (
                <div className="w-full md:w-64" key={index}>
                  <motion.h3
                    className="text-lg md:text-xl font-bold text-gray-100"
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {lng.title}
                  </motion.h3>
                  <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                    <motion.div
                      className="h-full bg-orange-500 rounded-full "
                      style={{ width: `${lng.level}%` }}
                      initial={{
                        scaleX: 0,
                        originX: 0,
                      }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: 1,
                            delay: 2 + index * 0.2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
    );
  };

  const ProjectsSection = () => {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  
    const nextProject = () => {
      setCurrentProject((currentProject + 1) % projects.length);
    };
  
    const previousProject = () => {
      setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    };
  
    return (
      <Section>
        <div className="flex w-full h-full gap-8 items-center justify-center relative">
          <button 
            className="text-2xl hover:text-indigo-600 transition-colors absolute bottom-5 left-0"
            onClick={previousProject}
          >
            ← Previous
          </button>
          <h2 className="text-3xl md:text-5xl font-bold absolute inset-x-0 top-10 ">Projects</h2>
          <button
            className="text-2xl hover:text-indigo-600 transition-colors absolute bottom-5 right-0"
            onClick={nextProject}
          >
            Next →
          </button>
        </div>
      </Section>
    );
  };
  
  const ContactSection = () => {
    return (
      <Section>
        <h2 className="text-3xl md:text-5xl font-bold">Contact Me</h2>
        <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
          <form action="mailto:manojmogul123@gmail.com" method="POST" encType="text/plain">
            <label for="name" className="font-medium text-gray-900 block mb-1 required">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 p-3"
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
              
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 p-3"
            />
            <label
              for="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 p-3"
            />
            <button className="bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16" >
              Submit
            </button>
          </form>
        </div>
      </Section>
    );
  };