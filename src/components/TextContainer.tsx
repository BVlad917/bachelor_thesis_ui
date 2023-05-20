import React from "react";

type TextProps = {
    srImage: string | null;
    ocrText: string | null;
};
export default function TextContainer({srImage, ocrText}: TextProps) {

    const handleDownloadClick = async () => {
        const image = new Image();
        if (srImage !== null) {
            image.src = srImage;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                if (ctx !== null) {
                    ctx.drawImage(image, 0, 0);
                    const dataUrl = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'image.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }

    }
    return (
        <div className="text-container">
            <textarea value={ocrText || "Result of running ocr..."} readOnly></textarea>
            <button className="item" onClick={handleDownloadClick}> Save image</button>
        </div>
    );
}
