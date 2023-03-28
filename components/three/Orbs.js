import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import {
  Trail,
  Float,
  Line,
  Sphere,
  Stars,
  Bounds,
  useBounds,
  OrbitControls,
  ContactShadows,
  useGLTF,
  Html,
} from "@react-three/drei";

function Model({ name, ...props }) {
  const { nodes } = useGLTF("/compressed.glb");
  return (
    <mesh
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      material-emissive="red"
      material-roughness={1}
      {...props}
      dispose={null}
    />
  );
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}

const Orbs = () => {
  // const renderer = new THREE.WebGLRenderer()
  // renderer.setSize(window.innerWidth, window.innerHeight)
  // document.body.appendChild(renderer.domElement)

  return (
    <div className="h-[100%] w-full">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <spotLight
          position={[-100, -100, -100]}
          intensity={0.1}
          angle={0.3}
          penumbra={1}
        />
        <hemisphereLight
          color="white"
          groundColor="#ff0f00"
          position={[-7, 25, 13]}
          intensity={1}
        />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom></SelectToZoom>
          </Bounds>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -35, 0]}
            opacity={0.2}
            width={200}
            height={200}
            blur={1}
            far={50}
          />
        </Suspense>
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
        />
        {/* <color attach="background" args={['black']} /> */}
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Atom />
        </Float>
        {/* <Stars saturation={0} count={400} speed={0.5} /> */}
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.5} />
        </EffectComposer>
        <Html
          style={
            {
              // transition: "all 0.2s",
              // opacity: hidden ? 0 : 1,
              // transform: `scale(${hidden ? 0.5 : 1})`,
            }
          }
          // distanceFactor={1.5}
          // position={[0, 0, 1]}
          transform
          // occlude
          // onOcclude={setVisible}
        >
          {/* <div className="rounded-2xl relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"> */}
          <div className="rounded-2xl relative">
            <div className="rounded-2xl absolute inset-0 bg-bs-ghost bg-opacity-25" />
            <div className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block z-50 text-bs-white">Welcome to</span>
              <span className="block z-50 text-bs-orange">Synthx</span>
            </div>
            <div className="z-50 mx-auto mt-24 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-2xl border border-transparent bg-bs-white px-4 py-3 text-base font-medium text-bs-purple  hover:bg-bs-orange hover:text-bs-white sm:px-8"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-2xl border border-transparent bg-bs-orange bg-opacity-60 px-4 py-3 text-base font-medium text-white hover:bg-opacity-70 sm:px-8"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

function Atom(props) {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );
  return (
    <group {...props}>
      {/* <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      /> */}
      <Electron position={[0, 0, 0.5]} speed={1} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 2]}
        speed={2}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 4]}
        speed={3}
      />
      {/* <Sphere args={[0.15, 64, 64]}>
        <meshBasicMaterial color={[255, 113, 48]} toneMapped={false} />
      </Sphere> */}
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props}>
      <Trail
        local
        width={0.1}
        length={3}
        color={new THREE.Color(255, 60, 104)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color={[135, 43, 151]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

export default Orbs;
