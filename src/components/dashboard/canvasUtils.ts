import { Canvas, FabricImage, FabricObject, Group } from 'fabric'
import gsap from 'gsap'

export const zoomIn = (canvas: Canvas, group: Group | null) => {
  if (group) {
    const scale = Math.min(group.scaleX! * 1.1, 2)
    group.set({
      left: canvas.width / 2,
      top: canvas.height / 2,
      scaleX: scale,
      scaleY: scale,
      originX: 'center',
      originY: 'center',
    })
    group.setCoords()
    canvas.renderAll()
  }
}

export const zoomOut = (canvas: Canvas, group: Group | null) => {
  if (group) {
    const scale = Math.max(group.scaleX! * 0.9, 0.2)
    group.set({
      left: canvas.width / 2,
      top: canvas.height / 2,
      scaleX: scale,
      scaleY: scale,
      originX: 'center',
      originY: 'center',
    })
    group.setCoords()
    canvas.renderAll()
  }
}

export const flipHorizontal = (canvas: Canvas, group?: Group | null) => {
  const flipObject = (obj: FabricObject) => {
    obj.set('flipX', !obj.flipX)
    canvas.renderAll()
  }

  if (group) {
    flipObject(group)
  } else {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      flipObject(activeObject)
    }
  }
}

export const flipVertical = (canvas: Canvas, group?: Group | null) => {
  const flipObject = (obj: FabricObject) => {
    obj.set('flipY', !obj.flipY)
    canvas.renderAll()
  }

  if (group) {
    flipObject(group)
  } else {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      flipObject(activeObject)
    }
  }
}

export const rotate = (canvas: Canvas, group?: Group | null) => {
  const rotateObject = (obj: FabricObject) => {
    obj.set({
      originX: 'center',
      originY: 'center',
      left: canvas.width / 2,
      top: canvas.height / 2,
    })
    gsap.to(obj, {
      duration: 0.3, // Smooth animation time
      rotation: (obj.angle || 0) + 90,
      onUpdate: () => {
        obj.set('angle', gsap.getProperty(obj, 'rotation'))
        canvas.renderAll()
      },
    })
  }

  if (group) {
    rotateObject(group)
  } else {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      rotateObject(activeObject)
    }
  }
}

export const setFullScreen = (canvas: Canvas, group: Group | FabricObject) => {
  if (canvas && group) {
    const canvasWidth = canvas.getWidth()
    const canvasHeight = canvas.getHeight()
    const imageWidth = group.width!
    const imageHeight = group.height!

    const scale = Math.min(
      canvasWidth / imageWidth,
      canvasHeight / imageHeight
    )

    group.scaleX = scale
    group.scaleY = scale
    group.left = canvasWidth / 2
    group.top = canvasHeight / 2
    group.setCoords()

    canvas.centerObject(group)
    group.set({
      originX: 'center',
      originY: 'center',
      left: canvasWidth / 2,
      top: canvasHeight / 2,
    })

    canvas.renderAll()
  }
}

