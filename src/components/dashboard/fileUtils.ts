import { Canvas, FabricImage, Group } from 'fabric'
import { Dispatch, SetStateAction } from 'react'

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  canvas: Canvas,
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
  setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>,
  setHasImage: Dispatch<SetStateAction<boolean>>,
  setGroup: React.Dispatch<React.SetStateAction<Group | null>> // Add this prop
) => {
  const fileInput = e.target
  const file = fileInput?.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageElement = new Image()
      imageElement.src = e.target?.result as string
      imageElement.crossOrigin = 'anonymous'
      imageElement.onload = () => {
        const imageWidth = imageElement.naturalWidth
        const imageHeight = imageElement.naturalHeight

        const canvasWidth = canvas.getWidth()
        const canvasHeight = canvas.getHeight()

        const scale = Math.min(
          canvasWidth / imageWidth,
          canvasHeight / imageHeight
        )

        const fabricImage = new FabricImage(imageElement, {
          scaleX: scale,
          scaleY: scale,
          originX: 'center',
          originY: 'center',
          width: imageWidth,
          height: imageHeight, // Corrected height
          cornerColor: '#0c8ce9',
          cornerStrokeColor: '#fcfcfc',
          transparentCorners: false,
          cornerStyle: 'circle',
          cornerStroke: 10,
          cornerSize: 12,
          hoverCursor: 'default',
        })

        const newGroup = new Group([fabricImage], {
          selectable: true,
          evented: true,
          cornerColor: '#0c8ce9',
          cornerStrokeColor: '#fcfcfc',
          transparentCorners: false,
          cornerStyle: 'circle',
          cornerSize: 12,
          hoverCursor: 'default',
        })

        canvas.clear() // Clear the canvas before adding the new image
        canvas.add(newGroup)
        setCanvasImage(fabricImage)
        setImageSrc(imageElement.src)
        setGroup(newGroup) // Set the group
        canvas.centerObject(newGroup)
        canvas.setActiveObject(newGroup)
        canvas.renderAll() // Ensure the canvas is rendered after adding the image
        setHasImage(true) // Set hasImage to true
        fabricImage.setCoords()
        canvas.renderAll()
      }
    }

    reader.readAsDataURL(file)
  }

  // Reset the input value to allow re-uploading the same file
  fileInput.value = ''
}

export const handleFileSave = (canvas: Canvas) => {
  const dataUrl = canvas.toDataURL({
    format: 'png',
    quality: 1.0,
    multiplier: 1,
  })
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = dataUrl
  a.download = 'image.png'
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(dataUrl)
  document.body.removeChild(a)
}

export const handleFileUpload = (
  fileRef: React.RefObject<HTMLInputElement>
) => {
  if (fileRef.current) {
    fileRef.current.click()
  }
}

export const handleFileRemove = (
  canvas: Canvas,
  canvasImage: FabricImage | null,
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
  setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>,
  resetSelectedDiseases: () => void,
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>,
  setGroup: React.Dispatch<React.SetStateAction<Group | null>> // Add this prop
) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.remove(activeObject)
  } else if (canvasImage) {
    canvas.remove(canvasImage)
    setImageSrc(null)
    setCanvasImage(null)
    resetSelectedDiseases() // Reset selected diseases
    setHasImage(false) // Set hasImage to false
    setGroup(null) // Reset the group
  }
  canvas.setZoom(1)
  canvas.setDimensions({ width: canvas.getWidth(), height: canvas.getHeight() })
  canvas.renderAll()
}

export const handleRemoveAll = (
  canvas: Canvas,
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
  setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>,
  resetSelectedDiseases: () => void,
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>,
  setGroup: React.Dispatch<React.SetStateAction<Group | null>> // Add this prop
) => {
  canvas.clear()
  setImageSrc(null)
  setCanvasImage(null)
  canvas.setZoom(1)
  canvas.setDimensions({ width: canvas.getWidth(), height: canvas.getHeight() })
  canvas.renderAll()
  resetSelectedDiseases() // Reset selected diseases
  setHasImage(false) // Set hasImage to false
  setGroup(null) // Reset the group
}
