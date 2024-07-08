import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const projects = [
  {
    title: "Amazcart",
    url: "https://amazcart.onrender.com/",
    image: "projects/Amazcart.png",
    description: "E-Commerce Webapp built using ExpressJs and MongoDB",
  },
  {
    title: "Custom Shader",
    url: "https://github.com/ManojKumar2105/Shaders-R3F",
    image: "projects/Custom-Shader.png",
    description: "Created Custom Shader using R3F and OpenGL ",
  },
  {
    title: "Quotes Generator",
    url: "https://quote-generator-94ez.onrender.com/",
    image: "projects/Quotes-Generator.png",
    description: "Generate random quotes for different categories built using Expressjs",
  },
  {
    title: "Netflix Clone",
    url: "https://manojkumar2105.github.io/Netflix/",
    image: "projects/Netflix-Clone.png",
    description: "Netflix UI clone built using HTML,CSS,JS",
  },
  {
    title: "Portal",
    url: "https://r3f-portal.onrender.com/",
    image: "projects/Portal.png",
    description: "Developed Portal model in Blender and made it as webapp using r3f and Shaders",
  },
  {
    title: "Metacommerce360",
    url: "https://metacommerce360.onrender.com/",
    image: "projects/Metacommerce360.png",
    description: "VR and AR based E-commerce platform with cryptocurrency transactions",
  },
  {
    title: "Minecraft Clone",
    url: "https://manoj-minecraft-clone.onrender.com/",
    image: "projects/Minecraft-clone.png",
    description: "Minecraft game clone developed using React-Three-Fiber",
  },
  {
    title: "CGPA Calculator",
    url: "https://cgpa-calculator.onrender.com/",
    image: "projects/CGPA-Calculator.png",
    description: "CGPA Calculator built using ExpressJS",
  },
  {
    title: "Haunted-House",
    url: "https://manojkumar2105.github.io/Haunted-House/",
    image: "projects/Haunted-House.png",
    description: "Haunted House built using ThreeJS",
  },
  {
    title: "Notes App",
    url: "https://github.com/ManojKumar2105/Flutter-Notes",
    image: "projects/Flutter-Notes.png",
    description: "Notes App built using Flutter",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props} onPointerOver={()=>{
      setHovered(true);
  }}
  onPointerOut={()=>{
      setHovered(false)
  }}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
        
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 0}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};