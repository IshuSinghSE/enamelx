'use client' // For Next.js app router
import { Canvas, FabricImage, FabricObject } from 'fabric'
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
import React, { useState } from 'react'
import ActionButton from '../ActionButton'
import {
  flipHorizontal,
  flipVertical,
  rotate,
  setFullScreen,
  zoomIn,
  zoomOut,
} from './canvasUtils'
import { createLaserPointer, drawArrow, enableDrawingMode } from './drawUtils'
import {
  handleFileChange,
  handleFileRemove,
  handleFileSave,
  handleFileUpload,
  handleRemoveAll,
} from './fileUtils'

interface ViewerOptionsProps {
  canvas: Canvas | undefined
  fileRef: React.RefObject<HTMLInputElement>
  canvasImage: FabricImage | null
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
  setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
  canvasObjects: FabricObject[]
}

const ViewerOptions: React.FC<ViewerOptionsProps> = ({
  canvas,
  fileRef,
  canvasImage,
  setImageSrc,
  setCanvasImage,
  canvasObjects,
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

  const addArrow = () => {
    if (canvas) {
      drawArrow(canvas, 50, 50, 200, 200)
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
            canvas && handleFileChange(e, canvas, setImageSrc, setCanvasImage)
          }
          style={{ display: 'none' }}
        />
        <p className="hidden lg:flex text-md -mt-2 select-none pl-12 text-right font-sora font-semibold capitalize text-secondary-foreground">
          tools
        </p>
        <div className="flex flex-wrap lg:gap-x-2 sm:col-span-4 md:col-span-6 lg:col-span-2">
          <ActionButton
            label="Upload"
            icon={<Upload />}
            onClick={() => fileRef.current && handleFileUpload(fileRef)}
          />
          <ActionButton
            label="Save"
            icon={<Download />}
            onClick={() => canvas && handleFileSave(canvas)}
            disabled={canvasObjects.length === 0}
          />
          <ActionButton
            label="Remove"
            icon={<X />}
            onClick={() =>
              canvas &&
              handleFileRemove(canvas, canvasImage, setImageSrc, setCanvasImage)
            }
            disabled={canvasObjects.length === 0}
          />
          <ActionButton
            label="Remove All"
            icon={<Trash2 color="#d9534f" />}
            onClick={() =>
              canvas && handleRemoveAll(canvas, setImageSrc, setCanvasImage)
            }
            disabled={canvasObjects.length === 0}
          />
        </div>
        <hr className="mt-2 w-full overflow-hidden lg:w-36 border-zinc-500 pt-2  lg:flex" />
        {/* <hr className="mt-2 border-zinc-500 pt-2" /> */}
        <div className='flex lg:flex-wrap gap-x-2 lg:col-span-2 overflow-x-auto' style={{scrollbarWidth: 'none'}}>
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
        className='hidden lg:flex'
          label={isLaserPointerActive ? 'Pointer Off' : 'Pointer On'}
          icon={<CircleDot />}
          onClick={() => {
            handleLaserPointer()
          }}
        />
        <ActionButton
          label="Zoom In"
          icon={<ZoomIn />}
          onClick={() => canvas && canvasImage && zoomIn(canvas, canvasImage)}
        />
        <ActionButton
          label="Zoom Out"
          icon={<ZoomOut />}
          onClick={() => canvas && canvasImage && zoomOut(canvas, canvasImage)}
        />
        <ActionButton
          label="Flip X"
          icon={<FlipHorizontalIcon />}
          onClick={() =>
            canvas && canvasImage && flipHorizontal(canvas, canvasImage)
          }
        />
        <ActionButton
          label="Flip Y"
          icon={<FlipVerticalIcon />}
          onClick={() =>
            canvas && canvasImage && flipVertical(canvas, canvasImage)
          }
        />
        <ActionButton
          label="Fit"
          icon={<Fullscreen />}
          onClick={() =>
            canvas &&
            canvasImage &&
            setFullScreen(
              canvas,
              (canvas.getActiveObject() || canvasImage) as FabricImage
            )
          }
        />
        <ActionButton
          label="Rotate"
          icon={<RotateCw />}
          onClick={() => canvas && canvasImage && rotate(canvas, canvasImage)}
        /></div>
      </div>
    </>
  )
}

export default ViewerOptions
