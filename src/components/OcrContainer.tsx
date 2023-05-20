import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getOcrText} from "../backend";

type ImageProps = {
    image: File | null;
    srImage: string | null;
    setOcrText: Dispatch<SetStateAction<string | null>>;
};
export default function OcrContainer({image, srImage, setOcrText}: ImageProps) {
    const [ocrModel, setOcrModel] = useState('tesseract');
    const [imageString, setImageString] = useState<string | null>(null);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setOcrModel(option);
    };
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = typeof reader.result === 'string' ? reader.result : null;
            setImageString(base64String);
        };
        if (image) {
            reader.readAsDataURL(image);
        }
    }, [image]);
    const handleOcr = async () => {
        let textData = "Result of running ocr..."
        if (srImage === null && image !== null) {
            textData = await getOcrText(imageString, ocrModel);
        } else {
            if (srImage !== null) {
                textData = await getOcrText(srImage, ocrModel);
            }
        }
        if (textData.length !== 0) {
            setOcrText(textData);
        }
    }

    return (
        <div className="panel-container ocr-container">
            <div className="sub-panel-container">
                <button className="item" onClick={handleOcr}> OCR</button>
                <div className="dropdown-container">
                    <label className="item" htmlFor="ocr-dropdown">Choose a model:</label>
                    <select className="item" id="ocr-dropdown" value={ocrModel} onChange={handleSelectChange}>
                        <option value="tesseract">TESSERACT</option>
                        <option value="mmocr">MMOCR</option>
                    </select>
                </div>
            </div>
        </div>
    );
}