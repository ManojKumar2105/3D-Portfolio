import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, useScroll } from "@react-three/drei";
import { Finalscene } from "./Finalscene";
import {motion} from "framer-motion-3d"
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"
import { FinalModel } from "./FinalModel";
import { Projects } from "./Projects";
import { Background } from "./Background";

export const Experience = (props) => {
  const {menuOpened} = props;
  const {viewport} = useThree();
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const data = useScroll(); 
  const [section,setSection] = useState(0);
  const characterContainerAbout = useRef();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeRatio = Math.max(0.5,Math.min(1.12 * responsiveRatio , 1.12))

  const [characterAnimation,setCharacterAnimation] = useState("Typing")
  const characterGroup = useRef();
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {type: "spring",mass: 5,stiffness: 500,damping: 50,restDelta: 0.00001});
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      type: "spring",mass: 5,stiffness: 500,damping: 50,restDelta: 0.00001,
    });
  }, [menuOpened]);

  useEffect(()=>{
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section == 0 ? "Typing" : "Standing")
    }, 600);
  },[section])

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }
    // const position = new THREE.Vector3();
    if(section === 0){
    characterContainerAbout.current.getWorldPosition(characterGroup.current.position)

    }
    // // console.log([position.x,position.y,position.z]);
    // const quaternion = new THREE.Quaternion();
    // characterContainerAbout.current.getWorldQuaternion(quaternion)
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion,"XYZ")
    // console.log([euler.x,euler.y,euler.z]);
  });
  return (
    <>
    <motion.group 
      // position={[1.8627174944774514, 0.135, 1.8]} 
      ref={characterGroup}
      scale={officeRatio}
      rotation={[3.141592653589793, 0.7143981633974482, 3.141592653589793]} 
      animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: officeRatio,
            scaleY: officeRatio,
            scaleZ: officeRatio,
          },
          1: {
            y: isMobile ? -viewport.height +0.7 :-viewport.height + 1.3,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI/2 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 1.5 : 1,
            scaleY: isMobile ? 1.5 : 1,
            scaleZ: isMobile ? 1.5 : 1,
          },
          2: {
            x: isMobile ? -1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: -viewport.height * 3 + 1.5,
            x: 0.2,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI /4,
            rotateZ: 0,
            scaleX: 1.06,
            scaleY: 1.06,
            scaleZ: 1.06,
          },
        }}
      >
        <FinalModel animation={characterAnimation} />
    </motion.group>
<Background />
      <ambientLight intensity={1} />
      {/* <directionalLight intensity={0.5} color="purple"/> */}
      {/* <hemisphereLight groundColor={black} /> */}
      {/* <directionalLight intensity={0.5}/> */}
      <motion.group position={[isMobile ? 0 : 1.5 * officeRatio,isMobile ? -viewport.height/6 : 1,2.5]} scale={officeRatio} rotation-y={(-Math.PI /4)} animate={{
        y: isMobile ? -viewport.height/6 : 0
      }}>
      <Finalscene section={section} />
      {/* <OrbitControls /> */}
      <group
            ref={characterContainerAbout}
            name="Armature"
            position={[-0.150, 0.11, -0.608]}
            rotation={[Math.PI, -0.071, Math.PI]}
          >

      </group>
      </motion.group>
      <motion.group
        position={[0, isMobile ? -viewport.height : -1.5 * officeRatio, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : (isMobile ? -viewport.height : -1.5 * officeRatio),
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        {/* <group scale={3} position-y={-3}> */}
        {/* </group> */}
      </motion.group>
      <Projects />
    </>
  );
};
