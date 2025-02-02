'use client' // For Next.js app router
import { Canvas, FabricImage, FabricObject } from 'fabric'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { rotate, setFullScreen, zoomIn, zoomOut } from './canvasUtils'
import { handleFileChange, handleFileUpload } from './fileUtils'
import { setupMouseEvents } from './mouseEvents'
import ViewerOptions from './ViewerOptions'
import { set } from 'react-hook-form'

const ImageViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [canvas, setCanvas] = useState<Canvas>()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [canvasImage, setCanvasImage] = useState<FabricImage | null>(null)
  const [canvasObjects, setCanvasObjects] = useState<FabricObject[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    const w = window.innerWidth
    const newCanvas = new Canvas(canvasRef.current, {
      width: w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 900,
      height: w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 560,
      selection: false, // Disable initial selection
    })
    setCanvas(newCanvas)
    setupMouseEvents(newCanvas)

    newCanvas.on('object:added', () => {
      setCanvasObjects(newCanvas.getObjects())
      newCanvas.selection = newCanvas.getObjects().length > 0
    })

    newCanvas.on('object:removed', () => {
      setCanvasObjects(newCanvas.getObjects())
      newCanvas.selection = newCanvas.getObjects().length > 0
    })

    newCanvas.on('mouse:down', () => {
      setIsDrawing(true)
    })

    newCanvas.on('mouse:up', () => {
      setIsDrawing(false)
    })

    return () => {
      newCanvas.dispose()
    }
  }, [])

  useEffect(() => {
    if (!canvas) return

    const updateCanvasSize = () => {
      const w = window.innerWidth
      const width = w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 900
      const height = w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 560
      canvas.setDimensions({ width, height })
      if (canvasImage) {
        setFullScreen(canvas, canvasImage)
      }
      canvas.renderAll()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=' || e.key === '+') {
        zoomIn(canvas, canvasImage)
      }
      if (e.key === '-') {
        zoomOut(canvas, canvasImage)
      }
      if (e.key === 'r') rotate(canvas)
      if (e.key === 'Delete') {
        const activeObject = canvas.getActiveObject()
        if (activeObject) {
          canvas.remove(activeObject)
          canvas.renderAll()
        }
      }
      if (e.key === 'Escape') {
        canvas.discardActiveObject()
        canvas.renderAll()
      }
      if (e.key === 'f' && canvasImage) setFullScreen(canvas, canvasImage)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateCanvasSize)

    updateCanvasSize() // Initial call to set the canvas size

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [canvas, canvasImage])

  return (
    <>
      {/* Left Panel - Actions */}
      <ViewerOptions
        canvas={canvas}
        fileRef={fileRef as React.RefObject<HTMLInputElement>}
        canvasImage={canvasImage}
        setImageSrc={setImageSrc}
        setCanvasImage={setCanvasImage}
        canvasObjects={canvasObjects}
      />

      {/* Add more action buttons as needed */}

      {/* Middle Container - Image/X-ray View */}
      <div className="order-3 flex h-full flex-grow flex-col items-center justify-center rounded-lg p-4 lg:order-2">
        <div className="relative h-full rounded-md border-4 border-border bg-background p-1 shadow-lg shadow-zinc-900">
          {/* Image or X-ray content goes here */}
          <canvas
            id="canvas"
            ref={canvasRef}
            className="h-[400px] w-[400px] rounded-md md:h-[560px] md:w-[900px]"
          />
          {!canvasImage && canvasObjects.length === 0 && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-gray-500">
                <input
                  type="file"
                  id="fileImage"
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) =>
                    canvas &&
                    handleFileChange(e, canvas, setImageSrc, setCanvasImage)
                  }
                  style={{ display: 'none' }}
                />
                <Button
                  className="pointer-events-auto capitalize"
                  onClick={() =>
                    fileRef.current &&
                    handleFileUpload(
                      fileRef as React.RefObject<HTMLInputElement>
                    )
                  }
                >
                  start analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ImageViewer
