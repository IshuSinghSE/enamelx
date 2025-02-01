import { Canvas, FabricImage } from 'fabric'

export const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    canvas: Canvas,
    setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
    setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
) => {
    const fileInput = e.target;
    const file = fileInput?.files?.[0];

    if (file) {
        const reader = new FileReader();
        const url = URL.createObjectURL(file);
        setImageSrc(url);

        reader.onload = (e) => {
            const imageElement = new Image();
            imageElement.src = e.target?.result as string;
            imageElement.crossOrigin = 'anonymous';
            imageElement.onload = () => {
                const imageWidth = imageElement.naturalWidth;
                const imageHeight = imageElement.naturalHeight;
                imageElement.width = imageWidth;
                imageElement.height = imageHeight;

                const canvasWidth = canvas.getWidth();
                const canvasHeight = canvas.getHeight();

                const scale = Math.min(
                    canvasWidth / imageWidth,
                    canvasHeight / imageHeight
                );

                const fabricImage = new FabricImage(imageElement, {
                    scaleX: scale,
                    scaleY: scale,
                });

                setCanvasImage(fabricImage);
                canvas.clear(); // Clear the canvas before adding the new image
                canvas.add(fabricImage);
                canvas.setActiveObject(fabricImage);
                canvas.centerObject(fabricImage);
                canvas.renderAll(); // Ensure the canvas is rendered after adding the image
            };
        };

        reader.readAsDataURL(file);
    }

    // Reset the input value to allow re-uploading the same file
    fileInput.value = '';
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
    setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
) => {
    const activeObject = canvas.getActiveObject()
    if (canvasImage) {
        canvas.remove(canvasImage)
        setImageSrc(null)
        setCanvasImage(null)
    }
    canvas.setZoom(1)
    canvas.setDimensions({ width: canvas.getWidth(), height: canvas.getHeight() });
    canvas.renderAll()
}

export const handleRemoveAll = (
    canvas: Canvas,
    setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
    setCanvasImage: React.Dispatch<React.SetStateAction<FabricImage | null>>
) => {
    canvas.clear()
    setImageSrc(null)
    setCanvasImage(null)
    canvas.setZoom(1)
    canvas.setDimensions({ width: canvas.getWidth(), height: canvas.getHeight() });
    canvas.renderAll()
}
