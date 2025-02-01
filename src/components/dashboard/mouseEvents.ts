import { Canvas } from 'fabric'

interface ExtendedCanvas extends Canvas {
  isDragging?: boolean
  lastPosX?: number
  lastPosY?: number
}

export const initializeMouseEvents = (canvas: ExtendedCanvas) => {
  canvas.isDragging = false
  canvas.lastPosX = 0
  canvas.lastPosY = 0
}

export const setupMouseEvents = (canvas: ExtendedCanvas) => {
  canvas.on('mouse:down', (opt) => {
    if (opt.e.altKey) {
      canvas.isDragging = true
      canvas.selection = false
      const evt = opt.e as MouseEvent
      canvas.lastPosX = evt.clientX
      canvas.lastPosY = evt.clientY
    }
  })

  canvas.on('mouse:move', (opt) => {
    if (canvas.isDragging) {
      const evt = opt.e as MouseEvent
      if (canvas.lastPosX !== undefined && canvas.lastPosY !== undefined) {
        const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0]
        vpt[4] += evt.clientX - canvas.lastPosX
        vpt[5] += evt.clientY - canvas.lastPosY
      }
      canvas.lastPosX = evt.clientX
      canvas.lastPosY = evt.clientY
      canvas.requestRenderAll()
    }
  })

  canvas.on('mouse:up', () => {
    canvas.setViewportTransform(canvas.viewportTransform)
    canvas.isDragging = false
  })
}
