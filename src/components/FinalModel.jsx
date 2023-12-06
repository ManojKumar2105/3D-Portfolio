import React, { useRef,useEffect } from "react";
import { useGLTF,useFBX,useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three"

export function FinalModel(props) {
  const { nodes, materials } = useGLTF("models/Finalmodel.glb");
  const {animation} = props;
  const groupref = useRef();
  const {headFollow,cursorFollow,wireframe} = useControls({
    headFollow:false,
    cursorFollow:false,
    wireframe:false
  })
  const {animations:typingAnimation} = useFBX("animations/Typing.fbx");
  const {animations:standingAnimation} = useFBX("animations/Standing Idle.fbx");
  const {animations:fallingAnimation} = useFBX("animations/Falling Idle.fbx");

  typingAnimation[0].name = "Typing"
  standingAnimation[0].name="Standing"
  fallingAnimation[0].name="Falling"
  

  const {actions} = useAnimations([typingAnimation[0],standingAnimation[0],fallingAnimation[0]],groupref)

  useFrame((state,delta)=>{
    headFollow && groupref.current.getObjectByName("Head").lookAt(state.camera.position);
    const target = new THREE.Vector3(state.mouse.x,state.mouse.y,1)
    cursorFollow && groupref.current.getObjectByName("Spine2").lookAt(target);
  })

  useEffect(()=>{
    actions[animation].reset().fadeIn(0.5).play()
    return ()=>{
        actions[animation].reset().fadeOut(0.5) 
    }
  },[animation])

  useEffect(()=>{
    Object.values(materials).forEach(element => {
        element.wireframe=wireframe
    });
  },[wireframe])

  return (
    <group {...props} dispose={null} ref={groupref}>
    <group rotation-x={-Math.PI/2}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        frustumCulled={false}
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        frustumCulled={false}
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      </group>
    </group>
  );
}

useGLTF.preload("models/Finalmodel.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");


{/* <group position={[1.8627174944774514, 0.12320000000000002, 1.8996946270438686]} rotation={[3.141592653589793, 0.7143981633974482, 3.141592653589793]}></group> */}