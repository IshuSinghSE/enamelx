import { Canvas, FabricImage, FabricObject, Point } from 'fabric'
import gsap from 'gsap'

export const zoomIn = (canvas: Canvas) => {
    const zoom = canvas.getZoom() * 1.1
    if (zoom < 5) { // Limit max zoom
    canvas.zoomToPoint(new Point(canvas.width / 2, canvas.height / 2), zoom)
}}

export const zoomOut = (canvas: Canvas) => {
    const zoom = canvas.getZoom() * 0.9
    if (zoom > 0.2) { // Limit min zoom
        canvas.zoomToPoint(new Point(canvas.width / 2, canvas.height / 2), zoom)
    }
}

export const flipHorizontal = (canvas: Canvas) => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
        activeObject.set('flipX', !activeObject.flipX)
        canvas.renderAll()
    }
}

export const flipVertical = (canvas: Canvas) => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
        activeObject.set('flipY', !activeObject.flipY)
        canvas.renderAll()
    }
}

export const rotate = (canvas: Canvas, image?: FabricImage) => {
    const rotateObject = (obj: FabricObject) => {
        obj.set({
            originX: 'center',
            originY: 'center',
            left: canvas.width / 2,
            top: canvas.height / 2,
        });
        gsap.to(obj, {
            duration: 0.3, // Smooth animation time
            rotation: (obj.angle || 0) + 90,
            onUpdate: () => {
                obj.set('angle', gsap.getProperty(obj, 'rotation'));
                canvas.renderAll();
            },
        });
    };

    if (image) {
        rotateObject(image);
    } else {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            rotateObject(activeObject);
        }
    }
    
}

export const setFullScreen = (canvas: Canvas, canvasImage: FabricImage | FabricObject) => {
    if (canvas && canvasImage) {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const imageWidth = canvasImage.width!;
        const imageHeight = canvasImage.height!;

        const scale = Math.min(
            canvasWidth / imageWidth,
            canvasHeight / imageHeight
        );

        canvasImage.scaleX = scale;
        canvasImage.scaleY = scale;
        canvasImage.left = canvasWidth / 2;
        canvasImage.top = canvasHeight / 2;
        canvasImage.setCoords();

        canvas.centerObject(canvasImage);
        canvasImage.set({
            originX: 'center',
            originY: 'center',
            left: canvasWidth / 2,
            top: canvasHeight / 2,
        });

        canvas.renderAll();
    }
}

