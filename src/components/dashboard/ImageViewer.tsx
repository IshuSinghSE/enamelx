'use client' // For Next.js app router
import { Canvas, FabricImage, FabricObject } from 'fabric'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { rotate, setFullScreen, zoomIn, zoomOut } from './canvasUtils'
import { handleFileChange, handleFileUpload } from './fileUtils'
import { setupMouseEvents } from './mouseEvents'
import ViewerOptions from './ViewerOptions'

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
    const newCanvas = new Canvas(canvasRef.current, {
      width: 900,
      height: 560,
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

    // 🎯 Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=' || e.key === '+') {
        zoomIn(newCanvas, canvasImage)
      }
      if (e.key === '-') {
        zoomOut(newCanvas, canvasImage)
      }
      if (e.key === 'r') rotate(newCanvas)
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
        canvasObjects={canvasObjects}
      />

      {/* Add more action buttons as needed */}

      {/* Middle Container - Image/X-ray View */}
      <div className="order-3 flex h-full flex-grow flex-col items-center justify-center rounded-lg p-4 lg:order-2">
        <div className="relative h-full w-full rounded-md border-4 border-border bg-background p-1 shadow-lg">
          {/* Image or X-ray content goes here */}
          <canvas
            id="canvas"
            ref={canvasRef}
            className="h-[560px] w-[900px] rounded-md"
          />
          {(!canvasImage && canvasObjects.length === 0) && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none" onClick={(e) => e.stopPropagation()}>
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
                className='pointer-events-auto'
                  onClick={() => fileRef.current && handleFileUpload(fileRef as React.RefObject<HTMLInputElement>)}
                >
                  Upload an image to start analysis
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
