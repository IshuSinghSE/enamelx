'use client' // For Next.js app router
import { Canvas, FabricImage, FabricObject, Group } from 'fabric'
import {
  CircleDot,
  Circle as CircleIcon,
  Download,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  Fullscreen,
  MoveUpRight,
  RotateCw,
  Square,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ActionButton from '../ActionButton'
import {
  flipHorizontal,
  flipVertical,
  rotate,
  setFullScreen,
  zoomIn,
  zoomOut,
} from './canvasUtils'
import { createLaserPointer, enableDrawingMode } from './drawUtils'
import {
  handleFileChange,
  handleFileRemove,
  handleFileSave,
  handleFileUpload,
  handleRemoveAll,
} from './fileUtils'
import { Disease } from './DiseasePanel'

interface ViewerOptionsProps {
  canvas: Canvas | undefined
  fileRef: React.RefObject<HTMLInputElement>
  canvasImage: FabricImage | null
  canvasGroup: FabricObject | Group | null
  setGroup: React.Dispatch<React.SetStateAction<Group | null>>
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
  setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
    setHasImage:React.Dispatch<React.SetStateAction<boolean>> 
  canvasObjects: FabricObject[]
  setSelectedDiseases: React.Dispatch<React.SetStateAction<Disease[]>>
  resetDiseasesToInitial: () => void // Add this prop
  resetSelectedDiseases: () => void // Add this prop
}

const ViewerOptions: React.FC<ViewerOptionsProps> = ({
  canvas,
  fileRef,
  canvasImage,
  canvasGroup,
  setGroup,
  setImageSrc,
  setCanvasImage,
  setHasImage,
  canvasObjects,
  setSelectedDiseases,
  resetDiseasesToInitial, // Add this prop
  resetSelectedDiseases, // Add this prop
}) => {
  const [toggleLaserPointer, setToggleLaserPointer] = useState<
    (() => void) | null
  >(null)
  const [isLaserPointerActive, setIsLaserPointerActive] = useState(false)

  const handleLaserPointer = () => {
    if (canvas) {
      if (!toggleLaserPointer) {
        const toggle = createLaserPointer(canvas)
        setToggleLaserPointer(() => toggle)
        toggle()
        setIsLaserPointerActive(true)
      } else {
        toggleLaserPointer()
        setIsLaserPointerActive(!isLaserPointerActive)
        canvas.defaultCursor = !isLaserPointerActive ? 'default' : 'none'
      }
    }
  }

  const handleRemoveAllAndResetDiseases = () => {
    if (canvas) {
      handleRemoveAll(canvas, setImageSrc, setCanvasImage, resetSelectedDiseases, setHasImage, setGroup)
      setSelectedDiseases([])
      resetDiseasesToInitial() // Reset diseases to initial state
      resetSelectedDiseases() // Reset selected diseases
    }
  }

  const handleFileRemoveAndResetDiseases = () => {
    if (canvas) {
      handleFileRemove(canvas, canvasImage, setImageSrc, setCanvasImage, resetSelectedDiseases, setHasImage, setGroup)
      setSelectedDiseases([])
      resetDiseasesToInitial() // Reset diseases to initial state
      resetSelectedDiseases() // Reset selected diseases
    }
  }


  return (
    <>
      <div
        className="h-full grid-cols-6 gap-0 border-r border-border bg-gradient-to-r from-neutral-800 to-stone-800 p-4 text-foreground sm:grid-cols-8 md:w-48 lg:grid lg:h-[calc(100vh-64px)] lg:grid-cols-2 lg:overflow-y-auto "
        style={{
          scrollbarWidth: 'none',
          boxShadow: 'inset 0 -10px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 50,
        }}
      >
        <input
          type="file"
          id="fileImage"
          accept="image/*"
          ref={fileRef}
          onChange={(e) =>
            canvas && handleFileChange(e, canvas, setImageSrc, setCanvasImage, setHasImage, setGroup)
          }
          style={{ display: 'none' }}
        />
        <p className="hidden lg:flex text-md -mt-2 select-none pl-12 text-right font-sora font-semibold capitalize text-secondary-foreground">
          tools
        </p>
        <div className="flex flex-wrap lg:gap-x-2 sm:col-span-4 md:col-span-6 lg:col-span-2">
          <ActionButton
            label="Upload"
            icon={<Upload color="#eeeeee"/>}
            onClick={() => fileRef.current && handleFileUpload(fileRef)}
          />
          <ActionButton
            label="Download"
            icon={<Download />}
            onClick={() => canvas && handleFileSave(canvas)}
            disabled={canvasObjects.length === 0}
          />
          <ActionButton
            label="Remove"
            icon={<X />}
            onClick={handleFileRemoveAndResetDiseases}
            disabled={canvasObjects.length === 0}
          />
          <ActionButton
            label="Remove All"
            icon={<Trash2 color="#d9534f" />}
            onClick={handleRemoveAllAndResetDiseases}
            disabled={canvasObjects.length === 0}
          />
        </div>
        <hr className="mt-2 w-full overflow-hidden lg:w-36 border-zinc-500 pt-2  lg:flex" />
        {/* <hr className="mt-2 border-zinc-500 pt-2" /> */}
        <div
          className="flex lg:flex-wrap gap-x-2 lg:col-span-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          <ActionButton
            label="Box"
            icon={<Square />}
            onClick={() => canvas && enableDrawingMode(canvas, 'rect')}
          />
          <ActionButton
            label="Circle"
            icon={<CircleIcon />}
            onClick={() => canvas && enableDrawingMode(canvas, 'circle')}
          />
          <ActionButton
            label="Arrow"
            icon={<MoveUpRight />}
            onClick={() => canvas && enableDrawingMode(canvas, 'arrow')}
          />
          <ActionButton
            className="hidden lg:flex"
            label={isLaserPointerActive ? 'Pointer Off' : 'Pointer On'}
            icon={<CircleDot />}
            onClick={() => {
              handleLaserPointer()
            }}
          />
          <ActionButton
            label="Zoom In"
            icon={<ZoomIn />}
            onClick={() => canvas && canvasGroup instanceof Group && zoomIn(canvas, canvasGroup)}
          />
          <ActionButton
            label="Zoom Out"
            icon={<ZoomOut />}
            onClick={() => canvas && canvasGroup instanceof Group && zoomOut(canvas, canvasGroup)}
          />
          <ActionButton
            label="Flip X"
            icon={<FlipHorizontalIcon />}
            onClick={() => canvas && canvasGroup instanceof Group && flipHorizontal(canvas, canvasGroup)}
          />
          <ActionButton
            label="Flip Y"
            icon={<FlipVerticalIcon />}
            onClick={() => canvas && canvasGroup instanceof Group && flipVertical(canvas, canvasGroup)}
          />
          <ActionButton
            label="Fit"
            icon={<Fullscreen />}
            onClick={() => canvas && canvasGroup instanceof Group && setFullScreen(canvas, canvasGroup)}
          />
          <ActionButton
            label="Rotate"
            icon={<RotateCw />}
            onClick={() => canvas && canvasGroup instanceof Group && rotate(canvas, canvasGroup)}
          />
        </div>
      </div>
    </>
  )
}

export default ViewerOptions

