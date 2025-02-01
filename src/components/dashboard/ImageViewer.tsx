'use client' // For Next.js app router
import { Canvas, FabricImage } from 'fabric'
import { useEffect, useRef, useState } from 'react'
import { rotate, setFullScreen, zoomIn, zoomOut } from './canvasUtils'
import { setupMouseEvents } from './mouseEvents'
import ViewerOptions from './ViewerOptions'

const ImageViewer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const [canvas, setCanvas] = useState<Canvas>()
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [canvasImage, setCanvasImage] = useState<FabricImage | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const newCanvas = new Canvas(canvasRef.current, {
            width: 900,
            height: 560,
        })
        setCanvas(newCanvas)
        setupMouseEvents(newCanvas)

        // 🎯 Keyboard Shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '=' || e.key === '+') {
                zoomIn(newCanvas, canvasImage)
            }
            if (e.key === '-') {
                zoomOut(newCanvas, canvasImage)
            }
            if (e.key === 'r' && canvasImage) rotate(newCanvas, canvasImage)
            if (e.key === 'Delete') {
                const activeObject = newCanvas.getActiveObject()
                if (activeObject) {
                    newCanvas.remove(activeObject)
                    newCanvas.renderAll()
                }
            }
            if (e.key === 'Escape') {
                newCanvas.discardActiveObject()
                newCanvas.renderAll()
            }
            if (e.key === 'f' && canvasImage) setFullScreen(newCanvas, canvasImage)
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            newCanvas.dispose()
        }
    }, [])

    return (
        <>
            {/* Left Panel - Actions */}
            <ViewerOptions
                canvas={canvas}
                fileRef={fileRef as React.RefObject<HTMLInputElement>}
                canvasImage={canvasImage}
                setImageSrc={setImageSrc}
                setCanvasImage={setCanvasImage}
            />

            {/* Add more action buttons as needed */}

            {/* Middle Container - Image/X-ray View */}
            <div className="order-3 flex h-full flex-grow flex-col items-center justify-center rounded-lg p-4 lg:order-2">
                <div className="relative h-full w-full rounded-md border-4 border-primary-hover bg-white p-1 shadow-md">
                    {/* Image or X-ray content goes here */}
                    <canvas
                        id="canvas"
                        ref={canvasRef}
                        className="h-[560px] w-[900px] rounded-md"
                    />
                </div>
            </div>
        </>
    )
}

export default ImageViewer
