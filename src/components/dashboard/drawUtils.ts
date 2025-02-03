import { Canvas, Circle, Gradient, Group, Line, Polygon, Rect } from 'fabric'

export const addRect = (canvas: Canvas) => {
  if (canvas) {
    const rect = new Rect({
      top: 100,
      left: 100,
      width: 100,
      height: 100,
      fill: 'transparent',
      stroke: 'red',
      selectable: true,
    })
    canvas.add(rect)
  }
}
export const addCircle = (canvas: Canvas) => {
  if (canvas) {
    const circle = new Circle({
      top: 150,
      left: 150,
      radius: 50,
      fill: 'transparent',
      stroke: 'red',
      selectable: true,
    })
    canvas.add(circle)
  }
}

export const enableDrawingMode = (
  canvas: Canvas,
  shape: 'rect' | 'circle' | 'arrow'
) => {
  let isDrawing = false
  let startX = 0
  let startY = 0
  let shapeObject: any

  canvas.selection = false // Disable group selection

  const onMouseDown = (options: any) => {
    isDrawing = true
    const pointer = canvas.getScenePoint(options.e)
    startX = pointer.x
    startY = pointer.y

    if (shape === 'rect') {
      shapeObject = new Rect({
        left: startX,
        top: startY,
        width: 0,
        height: 0,
        fill: 'transparent',
        stroke: 'red',
        selectable: false,
        cornerColor: '#0c8ce9',
        cornerStrokeColor: '#fcfcfc',
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerStroke: 10,
        cornerSize: 12,
      })
    } else if (shape === 'circle') {
      shapeObject = new Circle({
        left: startX,
        top: startY,
        radius: 0,
        fill: 'transparent',
        stroke: 'red',
        selectable: false,
        cornerColor: '#0c8ce9',
        cornerStrokeColor: '#fcfcfc',
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerStroke: 10,
        cornerSize: 12,
      })
    } else if (shape === 'arrow') {
      shapeObject = new Line([startX, startY, startX, startY], {
        stroke: 'red',
        strokeWidth: 2,
        selectable: false,
        cornerColor: '#0c8ce9',
        cornerStrokeColor: '#fcfcfc',
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerStroke: 10,
        cornerSize: 12,

      })
    }

    canvas.add(shapeObject)
  }

  const onMouseMove = (options: any) => {
    if (!isDrawing) return
    const pointer = canvas.getScenePoint(options.e)

    if (shape === 'rect') {
      shapeObject.set({
        width: Math.abs(startX - pointer.x),
        height: Math.abs(startY - pointer.y),
      })
      shapeObject.setCoords()
    } else if (shape === 'circle') {
      const radius = Math.sqrt(
        Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)
      )
      shapeObject.set({
        radius: radius / 2,
        left: startX,
        top: startY,
      })
      shapeObject.setCoords()
    } else if (shape === 'arrow') {
      shapeObject.set({
        x2: pointer.x,
        y2: pointer.y,
      })
      shapeObject.setCoords()
    }

    canvas.renderAll()
  }

  const onMouseUp = () => {
    if (shape === 'arrow') {
      const pointer = canvas.getScenePoint(new MouseEvent('mousemove'))
      const angle = Math.atan2(pointer.y - startY, pointer.x - startX)
      const arrowHeadLength = 10
      const arrowHeadAngle = Math.PI / 6

      const arrowHead = new Polygon(
        [
          { x: pointer.x, y: pointer.y },
          {
            x: pointer.x - arrowHeadLength * Math.cos(angle - arrowHeadAngle),
            y: pointer.y - arrowHeadLength * Math.sin(angle - arrowHeadAngle),
          },
          {
            x: pointer.x - arrowHeadLength * Math.cos(angle + arrowHeadAngle),
            y: pointer.y - arrowHeadLength * Math.sin(angle + arrowHeadAngle),
          },
        ],
        {
          fill: 'red',
          selectable: true,
          evented: true,
          originX: 'center',
          originY: 'center',
          cornerColor: '#0c8ce9',
          cornerStrokeColor: '#fcfcfc',
          transparentCorners: false,
          cornerStyle: 'circle',
          cornerSize: 12,
        }
      )

      const arrowGroup = new Group([shapeObject, arrowHead], {
        selectable: true,
        evented: true,
        cornerColor: '#0c8ce9',
        cornerStrokeColor: '#fcfcfc',
        transparentCorners: false,
        cornerStyle: 'circle',
        cornerSize: 12,
      })

      canvas.remove(shapeObject)
      canvas.add(arrowGroup)
    }

    isDrawing = false
    shapeObject.set({ selectable: true })
    canvas.selection = true // Enable group selection
    canvas.off('mouse:down', onMouseDown)
    canvas.off('mouse:move', onMouseMove)
    canvas.off('mouse:up', onMouseUp)
  }

  canvas.on('mouse:down', onMouseDown)
  canvas.on('mouse:move', onMouseMove)
  canvas.on('mouse:up', onMouseUp)
}

export const createLaserPointer = (canvas: Canvas) => {
  canvas.defaultCursor = 'none'

  const laserPointer = new Circle({
    radius: 5,
    fill: new Gradient({
      type: 'radial',
      coords: {
        r1: 0,
        r2: 5,
        x1: 0.5,
        y1: 0.5,
        x2: 0.5,
        y2: 0.5,
      },
      colorStops: [
        { offset: 0, color: 'white' },
        { offset: 1, color: 'red' },
      ],
    }),
    left: canvas.width / 2,
    top: canvas.height / 2,
    selectable: false,
    evented: false,
    originX: 'center',
    originY: 'center',
    shadow: {
      color: 'red',
      blur: 20,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      includeDefaultValues: true,
      nonScaling: false,
      id: 1,
      toSVG: () => '',
      toObject: () => ({}),
    },
  })

  const laserPointerElement = document.createElement('div')
  laserPointerElement.style.position = 'fixed'
  laserPointerElement.style.width = '10px'
  laserPointerElement.style.height = '10px'
  laserPointerElement.style.borderRadius = '50%'
  laserPointerElement.style.background =
    'radial-gradient(circle, white 0%, red 100%)'
  laserPointerElement.style.boxShadow = '0 0 20px red'
  laserPointerElement.style.pointerEvents = 'none'
  laserPointerElement.style.zIndex = '1000'
  document.body.appendChild(laserPointerElement)

  const moveLaserPointer = (event: MouseEvent) => {
    laserPointerElement.style.left = `${event.clientX - 5}px`
    laserPointerElement.style.top = `${event.clientY - 5}px`
  }

  const toggleLaserPointer = () => {
    if (laserPointerElement.style.display === 'none') {
      laserPointerElement.style.display = 'block'
      document.addEventListener('mousemove', moveLaserPointer)
      canvas.defaultCursor = 'none'
    } else {
      laserPointerElement.style.display = 'none'
      document.removeEventListener('mousemove', moveLaserPointer)
      canvas.defaultCursor = 'default'
    }
  }

  return toggleLaserPointer
}

export const drawArrow = (
  canvas: Canvas,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const arrow = new Line([startX, startY, endX, endY], {
    stroke: 'black',
    strokeWidth: 2,
    selectable: true,
    evented: true,
    cornerColor: '#0c8ce9',
    cornerStrokeColor: '#fcfcfc',
    transparentCorners: false,
    cornerStyle: 'circle',
    cornerStroke: 10,
    cornerSize: 12,
  })

  const angle = Math.atan2(endY - startY, endX - startX)
  const arrowHeadLength = 10
  const arrowHeadAngle = Math.PI / 6

  const arrowHead = new Polygon(
    [
      { x: endX, y: endY },
      {
        x: endX - arrowHeadLength * Math.cos(angle - arrowHeadAngle),
        y: endY - arrowHeadLength * Math.sin(angle - arrowHeadAngle),
      },
      {
        x: endX - arrowHeadLength * Math.cos(angle + arrowHeadAngle),
        y: endY - arrowHeadLength * Math.sin(angle + arrowHeadAngle),
      },
    ],
    {
      fill: 'black',
      selectable: true,
      evented: true,
      originX: 'center',
      originY: 'center',
      cornerColor: '#0c8ce9',
      cornerStrokeColor: '#fcfcfc',
      transparentCorners: false,
      cornerStyle: 'circle',
      cornerSize: 12,
    }
  )

  const arrowGroup = new Group([arrow, arrowHead], {
    selectable: true,
    evented: true,
  })

  canvas.add(arrowGroup)
  canvas.renderAll()

  return arrowGroup
}
