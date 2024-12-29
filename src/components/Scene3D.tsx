'use client'

import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <ThreeScene />
    </div>
  )
} 