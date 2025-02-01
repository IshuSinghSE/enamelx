'use client' // For Next.js app router
import { Canvas, Circle, FabricImage, Rect } from 'fabric'
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
import {
    handleFileChange,
    handleFileRemove,
    handleFileSave,
    handleFileUpload,
    handleRemoveAll,
} from './fileUtils'
import { addCircle, addRect, createLaserPointer, drawArrow, enableDrawingMode } from './drawUtils'

interface ViewerOptionsProps {
    canvas: Canvas | undefined
    fileRef: React.RefObject<HTMLInputElement>
    canvasImage: FabricImage | null
    setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
    setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
}

const ViewerOptions: React.FC<ViewerOptionsProps> = ({
    canvas,
    fileRef,
    canvasImage,
    setImageSrc,
    setCanvasImage,
}) => {
    const [toggleLaserPointer, setToggleLaserPointer] = useState<(() => void) | null>(null);
    const [isLaserPointerActive, setIsLaserPointerActive] = useState(false);



    const handleLaserPointer = () => {
        if (canvas) {
            if (!toggleLaserPointer) {
                const toggle = createLaserPointer(canvas);
                setToggleLaserPointer(() => toggle);
                toggle();
                setIsLaserPointerActive(true);
            } else {
                toggleLaserPointer();
                setIsLaserPointerActive(!isLaserPointerActive);
                canvas.defaultCursor = !isLaserPointerActive ? 'default' : 'none';
            }
        }
    }

    const addArrow = () => {
        if (canvas) {
            drawArrow(canvas, 50, 50, 200, 200);
        }
    }

    return (
        <>
            <div
                className="grid h-44 max-h-[600px] grid-cols-6 gap-0 border-r border-primary bg-gray-50 p-4 sm:grid-cols-8 lg:h-full lg:w-44 lg:grid-cols-2 lg:overflow-y-auto"
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
                        canvas &&
                        handleFileChange(e, canvas, setImageSrc, setCanvasImage)
                    }
                    style={{ display: 'none' }}
                />
                <div className="flex flex-wrap sm:col-span-8 lg:col-span-2">
                    <ActionButton
                        label="Upload Image"
                        icon={<Upload />}
                        onClick={() =>
                            fileRef.current && handleFileUpload(fileRef)
                        }
                    />
                    <ActionButton
                        label="Save Image"
                        icon={<Download />}
                        onClick={() => canvas && handleFileSave(canvas)}
                    />
                    <ActionButton
                        label="Remove Image"
                        icon={<X />}
                        onClick={() => canvas && handleFileRemove(canvas, canvasImage, setImageSrc, setCanvasImage)}
                    />
                    <ActionButton
                        label="Remove All"
                        icon={<Trash2 color="#d9534f" />}
                        onClick={() => canvas && handleRemoveAll(canvas, setImageSrc, setCanvasImage)}
                    />
                </div>
                <hr />
                <hr />
                <ActionButton label="Box" icon={<Square />} onClick={() => canvas && enableDrawingMode(canvas, 'rect')} />
                <ActionButton
                    label="Circle"
                    icon={<CircleIcon />}
                    onClick={() => canvas && enableDrawingMode(canvas, 'circle')}
                />
                <ActionButton label="Arrow" icon={<MoveUpRight />} onClick={() => canvas && enableDrawingMode(canvas, 'arrow')} />
                <ActionButton
                    label={isLaserPointerActive ? "Pointer Off" : "Pointer On"}
                    icon={<CircleDot />}
                    onClick={() => {
                        handleLaserPointer();
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
                    onClick={() => canvas && canvasImage  && flipHorizontal(canvas, canvasImage)}
                />
                <ActionButton
                    label="Flip Y"
                    icon={<FlipVerticalIcon />}
                    onClick={() => canvas && canvasImage  && flipVertical(canvas, canvasImage)}
                />
                <ActionButton
                    label="Fit"
                    icon={<Fullscreen />}
                    onClick={() =>
                        canvas && canvasImage &&
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
                />
            </div>
        </>
    )
}

export default ViewerOptions
