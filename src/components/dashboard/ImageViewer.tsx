'use client' // For Next.js app router
import { Canvas, FabricImage, FabricObject, Group, Rect } from 'fabric'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { rotate, setFullScreen, zoomIn, zoomOut, flipHorizontal, flipVertical } from './canvasUtils'
import { handleFileChange, handleFileUpload, handleFileRemove, handleRemoveAll } from './fileUtils'
import { setupMouseEvents } from './mouseEvents'
import ViewerOptions from './ViewerOptions'

type Disease = {
  id: string
  label: string
  count: number
  color: string
}

type Prediction = {
  bbox: [number, number, number, number]
  class_id: number
  confidence: number
}

type BackendResponse = {
  [key: string]: Prediction[]
}

const ImageViewer = ({
  selectedDiseases,
  setHasImage,
  predictions,
  fetchPredictions,
  isLoading,
  setSelectedDiseases,
  resetDiseasesToInitial, // Add this prop
  resetSelectedDiseases, // Add this prop
}: {
  selectedDiseases: Disease[]
  setHasImage: Dispatch<SetStateAction<boolean>>
  predictions: BackendResponse
  isLoading: boolean
  fetchPredictions: (image: File) => void
    setSelectedDiseases: Dispatch<SetStateAction<Disease[]>>
    resetDiseasesToInitial: () => void
    resetSelectedDiseases: () => void
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [canvas, setCanvas] = useState<Canvas>()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [canvasImage, setCanvasImage] = useState<FabricImage | null>(null)
  const [canvasObjects, setCanvasObjects] = useState<FabricObject[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [group, setGroup] = useState<Group | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const w = window.innerWidth
    const newCanvas = new Canvas(canvasRef.current, {
      width: w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 900,
      height: w < 600 ? w - w * 0.15 : w < 900 ? w - w * 0.25 : 560,
      selection: false, // Disable initial selection
      controlsAboveOverlay: true,
      cornerColor: '#0c8ce9',
      cornerStrokeColor: '#fcfcfc',
      transparentCorners: false,
      cornerStyle: 'circle',
      cornerStroke: 10,
      cornerSize: 12,
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
      if (group) {
        setFullScreen(canvas, group)
      }
      canvas.renderAll()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=' || e.key === '+') {
        zoomIn(canvas, group)
      }
      if (e.key === '-') {
        zoomOut(canvas, group)
      }
      if (e.key === 'r') rotate(canvas, group)
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
      if (e.key === 'f' && group) setFullScreen(canvas, group)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateCanvasSize)

    updateCanvasSize() // Initial call to set the canvas size

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [canvas, group])

  useEffect(() => {
    if (!canvas || !canvasImage) return
    const imageCoords = canvasImage.calcOCoords()
    let [leftX, leftY] = [imageCoords.tl.corner.br.x, imageCoords.tl.corner.br.y]
    canvas.getObjects('group').forEach((obj) => canvas.remove(obj))

    const rects: FabricObject[] = []

    selectedDiseases.forEach((disease) => {
      const diseasePredictions = predictions[disease.id]
      if (diseasePredictions) {
        diseasePredictions.forEach((prediction) => {
          const [left, top, right, bottom] = prediction.bbox
          const rect = new Rect({
            scaleX: canvasImage.scaleX,
            scaleY: canvasImage.scaleY,
            left: leftX + left * canvasImage.scaleX!,
            top: leftY + top * canvasImage.scaleY!,
            width: (right - left) * canvasImage.scaleX!,
            height: (bottom - top) * canvasImage.scaleY!,
            fill: `${disease.color}22`,
            stroke: disease.color,
            selectable: false,
          })
          rects.push(rect)
        })
      }
    })

    const newGroup = new Group([canvasImage, ...rects], {
      selectable: true,
      evented: true,
      cornerColor: '#0c8ce9',
      cornerStrokeColor: '#fcfcfc',
      transparentCorners: false,
      cornerStyle: 'circle',
      cornerSize: 12,
      hoverCursor: 'default',
    })

    canvas.add(newGroup)
    canvas.setActiveObject(newGroup)
    setGroup(newGroup)
    canvas.renderAll()
  }, [canvas, selectedDiseases, predictions, canvasImage])

  useEffect(() => {
    if (!canvas || !canvasImage || !group) return

    const updateGroupScale = () => {
      const scaleX = canvasImage.scaleX
      const scaleY = canvasImage.scaleY

      group.getObjects().forEach((obj) => {
        if (obj !== canvasImage) {
          obj.set({
            scaleX: scaleX,
            scaleY: scaleY,
          })
        }
      })

      group.setCoords()
      canvas.renderAll()
    }

    updateGroupScale()
  }, [canvas, canvasImage, group])

  return (
    <>
      {/* Left Panel - Actions */}
      <ViewerOptions
        canvas={canvas}
        fileRef={fileRef as React.RefObject<HTMLInputElement>}
        canvasImage={canvasImage}
        setImageSrc={setImageSrc}
        setCanvasImage={(image) => {
          setCanvasImage(image)
          if (image) {
            setHasImage(true)
          } else {
            setHasImage(false)
          }
        }}
        setHasImage={setHasImage}
        canvasObjects={canvasObjects}
        setSelectedDiseases={setSelectedDiseases} // Add appropriate function here
        resetDiseasesToInitial={resetDiseasesToInitial} // Add appropriate function here
        resetSelectedDiseases={resetSelectedDiseases} // Add appropriate function here
        canvasGroup={group} // Pass the group here
        setGroup={setGroup} // Pass the setGroup function here
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
              <div className="text-center text-gray-500 transition-all duration-300 ease-in-out">
                <input
                  type="file"
                  id="fileImage"
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) => {
                    if (canvas) {
                      const file = e.target.files?.[0]
                      if (file) {
                        fetchPredictions(file)
                      }
                      handleFileChange(e, canvas, setImageSrc, setCanvasImage, setHasImage, setGroup)
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <Button
                  className="pointer-events-auto capitalize transition-all duration-300 ease-in-out"
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
          {isLoading && (
            <div className="backdrop-blur-lg pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent">
              <div className="text-center text-gray-500 transition-all duration-300 ease-in-out">
                <p className='text-md text-white font-bold font-sora'>Processing...</p>
              </div>
              </div>
           
          )}
        </div>
      </div>
    </>
  )
}

export default ImageViewer
