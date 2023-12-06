import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { LoadingScreen } from "./components/Loadingscreen";
import { Suspense } from "react";

function App() {

  const [section,setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened,setMenuOpened] = useState(false) 
  return (
    <>
    <LoadingScreen started={started} setStarted={setStarted} />
    <MotionConfig transition={{
        type: "spring",
        mass: 5,
        stiffness: 500,
        damping: 55,
        restDelta: 0.0001,
    }}>
    <Canvas shadows camera={{ position: [0, 3.5, 10], fov: 42 }}>
      <color attach="background" args={["#FBCEB1"]} />
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
          <Suspense>
            {started && (
              <Experience section={section} menuOpened={menuOpened} />
            )}
          </Suspense>
          </Scroll>
        <Scroll html>
          <Interface setSection={setSection}/>
        </Scroll>
      </ScrollControls>
    </Canvas>
    <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
    </MotionConfig>
    <Leva hidden />
    </>
  );
}

export default App;
