/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 2);
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 2 : 1;
    // ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * speed;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 2);
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "hotpink" : color} wireframe />
    </mesh>
  );
};

const Torus = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const TorusKnot = ({ position, size }) => {
  const ref = useRef();

  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
    },
  });

  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime * 2);
  // });
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius, ...size]} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={2} color={color} />
    </mesh>
  );
};

function App() {
  const directionalLight = useRef();

  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });
  return (
    <Canvas>
      <directionalLight
        position={[0, 0, 2]}
        intensity={lightIntensity}
        ref={directionalLight}
        color={lightColor}
      />
      <ambientLight intensity={0.1} />

      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} size={[1, 1, 1]} color={"green"} />
        <Cube position={[-1, 0, 0]} size={[1, 1, 1]} color={"hotpink"} />
        <Cube position={[-1, 2, 0]} size={[1, 1, 1]} color={"blue"} />
        <Cube position={[1, 2, 0]} size={[1, 1, 1]} color={"yellow"} />
      </group> */}

      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"orange"} /> */}
      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"orange"} /> */}
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"} /> */}
      <TorusKnot position={[0, 0, 0]} size={[0.1, 1000, 50]} color={"pink"} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
