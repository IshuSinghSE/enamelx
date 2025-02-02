import { Canvas, FabricImage, FabricObject, Point } from 'fabric'
import gsap from 'gsap'

export const zoomIn = (canvas: Canvas, image: FabricImage | null) => {
    if (image) {
        const scale = Math.min(image.scaleX! * 1.1, 2);
        image.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            scaleX: scale,
            scaleY: scale,
            originX: 'center',
            originY: 'center',
        });
        image.setCoords();
        canvas.renderAll();
    }
}

export const zoomOut = (canvas: Canvas, image: FabricImage | null) => {
    if (image) {
        const scale = Math.max(image.scaleX! * 0.9, 0.2);
        image.set({
            left: canvas.width / 2,
            top: canvas.height / 2,
            scaleX: scale,
            scaleY: scale,
            originX: 'center',
            originY: 'center',
        });
        image.setCoords();
        canvas.renderAll();
    }
}

export const flipHorizontal = (canvas: Canvas, image?: FabricImage| null) => {
    const flipObject = (obj: FabricObject) => {
        obj.set('flipX', !obj.flipX);
        canvas.renderAll();
    };

    if (image) {
        flipObject(image);
    } else {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            flipObject(activeObject);
        }
    }
}

export const flipVertical = (canvas: Canvas, image?: FabricImage|null) => {
    const flipObject = (obj: FabricObject) => {
        obj.set('flipY', !obj.flipY);
        canvas.renderAll();
    };

    if (image) {
        flipObject(image);
    } else {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            flipObject(activeObject);
        }
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

