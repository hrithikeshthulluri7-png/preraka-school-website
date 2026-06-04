"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Plane, Sphere } from "@react-three/drei"
import { X, ZoomIn } from "lucide-react"
import DynamicIslandNav from "./dynamic-island-nav"

/* ── Types ── */
type Card = { id: string; imageUrl: string; alt: string; title: string }
type CardContextType = { selectedCard: Card | null; setSelectedCard: (card: Card | null) => void; cards: Card[] }

const CardContext = createContext<CardContextType | undefined>(undefined)
function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

/* ── Preraka brand gallery cards ── */
const PRERAKA_CARDS: Card[] = [
  { id: "1", imageUrl: "/assets/gallery/preraka-gallery-01.jpg", alt: "Robotics lab", title: "Robotics Lab" },
  { id: "2", imageUrl: "/assets/gallery/preraka-gallery-02.jpg", alt: "Nature and AI lab", title: "Nature & AI Lab" },
  { id: "3", imageUrl: "/assets/gallery/preraka-gallery-03.jpg", alt: "Creative AI studio", title: "Creative AI Studio" },
  { id: "4", imageUrl: "/assets/gallery/preraka-gallery-04.jpg", alt: "STEM discovery", title: "STEM Discovery" },
  { id: "5", imageUrl: "/assets/gallery/preraka-gallery-05.jpg", alt: "AI storytelling", title: "AI Storytelling" },
  { id: "6", imageUrl: "/assets/gallery/preraka-gallery-06.jpg", alt: "Smart city project", title: "Smart City Project" },
  { id: "7", imageUrl: "/assets/gallery/preraka-gallery-07.jpg", alt: "Coding for children", title: "Coding for Children" },
  { id: "8", imageUrl: "/assets/gallery/preraka-gallery-08.jpg", alt: "AI science lab", title: "AI Science Lab" },
  { id: "9", imageUrl: "/assets/gallery/preraka-gallery-09.jpg", alt: "Origami and geometry", title: "Origami Geometry" },
  { id: "10", imageUrl: "/assets/gallery/preraka-gallery-10.jpg", alt: "Physics through play", title: "Physics Through Play" },
  { id: "11", imageUrl: "/assets/gallery/preraka-gallery-11.jpg", alt: "Music and AI", title: "Music & AI" },
  { id: "12", imageUrl: "/assets/gallery/preraka-gallery-12.jpg", alt: "Clay modelling studio", title: "Clay Modelling" },
  { id: "13", imageUrl: "/assets/gallery/preraka-gallery-13.jpg", alt: "Admissions open house", title: "Admissions Open House" },
  { id: "14", imageUrl: "/assets/gallery/preraka-gallery-14.jpg", alt: "Personalized learning", title: "Personalized Learning" },
  { id: "15", imageUrl: "/assets/gallery/preraka-gallery-15.jpg", alt: "AI math lab", title: "AI Math Lab" },
  { id: "16", imageUrl: "/assets/gallery/preraka-gallery-16.jpg", alt: "Student presentation", title: "Student Presentation" },
  { id: "17", imageUrl: "/assets/gallery/preraka-gallery-17.jpg", alt: "Mixed reality learning", title: "Mixed Reality Learning" },
  { id: "18", imageUrl: "/assets/gallery/preraka-gallery-18.jpg", alt: "Family learning community", title: "Family Learning Community" },
  { id: "19", imageUrl: "/assets/gallery/preraka-gallery-19.jpg", alt: "Future campus model", title: "Future Campus Model" },
  { id: "20", imageUrl: "/assets/gallery/preraka-gallery-20.jpg", alt: "AI sports and movement", title: "AI Sports Movement" },
]

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards: PRERAKA_CARDS }}>
      {children}
    </CardContext.Provider>
  )
}

/* ── Starfield ── */
function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x020D1F, 1)
    mountRef.current.appendChild(renderer.domElement)

    const geo = new THREE.BufferGeometry()
    const count = 8000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 2000
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2000
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0xa1cfef, size: 0.8, sizeAttenuation: true })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)
    camera.position.z = 10

    let id = 0
    const animate = () => {
      id = requestAnimationFrame(animate)
      stars.rotation.y += 0.00008
      stars.rotation.x += 0.00004
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(id)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose(); geo.dispose(); mat.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#020D1F]" />
}

/* ── Floating Card ── */
function FloatingCard({ card, position }: {
  card: Card
  position: { x: number; y: number; z: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.5, 6]}
        onClick={(e) => { e.stopPropagation(); setSelectedCard(card) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto" }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html transform distanceFactor={10} position={[0, 0, 0.01]}
        style={{ transition: "transform 0.3s ease", transform: hovered ? "scale(1.15)" : "scale(1)", pointerEvents: "none" }}>
        <div className="w-40 h-52 rounded-xl overflow-hidden select-none"
          style={{
            background: "rgba(4,30,66,0.92)",
            boxShadow: hovered
              ? "0 25px 50px rgba(161,207,239,0.45), 0 0 30px rgba(46,126,70,0.3)"
              : "0 15px 30px rgba(0,0,0,0.7)",
            border: hovered ? "2px solid rgba(161,207,239,0.6)" : "1px solid rgba(161,207,239,0.15)",
            backdropFilter: "blur(8px)",
          }}>
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="w-full h-40 object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="px-2 py-1.5 text-center">
            <p className="text-xs font-semibold truncate" style={{ color: "#A1CFEF" }}>{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* ── Modal ── */
function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCard(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setSelectedCard])

  if (!selectedCard) return null

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const rx = (e.clientY - rect.top - rect.height / 2) / 14
    const ry = (rect.width / 2 - (e.clientX - rect.left)) / 14
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(2,13,31,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) setSelectedCard(null) }}
    >
      <div className="relative max-w-sm w-full mx-4">
        <button onClick={() => setSelectedCard(null)}
          className="absolute -top-12 right-0 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ background: "rgba(161,207,239,0.15)", border: "1px solid rgba(161,207,239,0.35)", color: "#A1CFEF" }}>
          <X className="w-5 h-5" />
        </button>

        <div ref={cardRef} className="rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: "rgba(4,30,66,0.95)",
            border: "1.5px solid rgba(161,207,239,0.35)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(46,126,70,0.15)",
            transformStyle: "preserve-3d",
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <img
            src={selectedCard.imageUrl}
            alt={selectedCard.alt}
            className="w-full object-cover"
            style={{ aspectRatio: "3/4", maxHeight: 440 }}
          />
          <div className="px-5 py-4">
            <p className="font-bold text-center text-base" style={{ color: "#A1CFEF" }}>{selectedCard.title}</p>
            <p className="text-xs text-center mt-1 tracking-widest uppercase" style={{ color: "rgba(161,207,239,0.45)" }}>
              Preraka — The School of Change
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Galaxy layout ── */
function CardGalaxy() {
  const { cards } = useCard()

  const positions = useMemo(() => {
    const φ = (1 + Math.sqrt(5)) / 2
    return cards.map((_, i) => {
      const y = 1 - (i / (cards.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const θ = (2 * Math.PI * i) / φ
      const layer = 12 + (i % 3) * 4
      return { x: Math.cos(θ) * r * layer, y: y * layer, z: Math.sin(θ) * r * layer }
    })
  }, [cards.length])

  return (
    <>
      {/* Wireframe spheres — Preraka teal (#2E7E46 green accent) */}
      <Sphere args={[2, 32, 32]}><meshStandardMaterial color="#041E42" transparent opacity={0.2} wireframe /></Sphere>
      <Sphere args={[12, 32, 32]}><meshStandardMaterial color="#2E7E46" transparent opacity={0.05} wireframe /></Sphere>
      <Sphere args={[16, 32, 32]}><meshStandardMaterial color="#A1CFEF" transparent opacity={0.04} wireframe /></Sphere>
      <Sphere args={[20, 32, 32]}><meshStandardMaterial color="#A1CFEF" transparent opacity={0.02} wireframe /></Sphere>
      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={positions[i]} />
      ))}
    </>
  )
}

/* ── Main export ── */
export default function PrerakaGallery3D() {
  return (
    <CardProvider>
      <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#020D1F]">
        <StarfieldBackground />
        <DynamicIslandNav inline />

        <Canvas
          camera={{ position: [0, 0, 18], fov: 58 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => { gl.domElement.style.pointerEvents = "auto" }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#A1CFEF" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#2E7E46" />
            <CardGalaxy />
            <OrbitControls
              enablePan enableZoom enableRotate
              minDistance={6} maxDistance={45}
              autoRotate autoRotateSpeed={0.4}
              rotateSpeed={0.5} zoomSpeed={1.2}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        {PRERAKA_CARDS.length === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none">
            <div
              className="max-w-xl rounded-3xl px-8 py-7 text-center"
              style={{
                background: "rgba(4,30,66,0.62)",
                border: "1px solid rgba(161,207,239,0.28)",
                backdropFilter: "blur(18px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "#A1CFEF" }}>
                Preraka Gallery
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                Gallery Coming Soon
              </h1>
              <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "rgba(230,247,255,0.78)" }}>
                The 3D gallery space is ready. Final school photos can be added when you share them.
              </p>
            </div>
          </div>
        )}

        {PRERAKA_CARDS.length > 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{ background: "rgba(4,30,66,0.7)", border: "1px solid rgba(161,207,239,0.25)", backdropFilter: "blur(8px)", color: "rgba(161,207,239,0.7)" }}>
              <ZoomIn className="w-3.5 h-3.5" />
              Drag to explore · Scroll to zoom · Click a card to view
            </div>
          </div>
        )}
      </section>
    </CardProvider>
  )
}
