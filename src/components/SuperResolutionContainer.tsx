import React, {Dispatch, SetStateAction, useState} from "react";
import {getSuperResolutionImage} from "../backend";

type ImageProps = {
    image: File | null;
    setSRImage: Dispatch<SetStateAction<string | null>>;
};
export default function SuperResolutionContainer({image, setSRImage}: ImageProps) {

    const [model, setModel] = useState('esrgan');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setModel(option);
    };

    const handleSuperResolution = async () => {
        const imageData = await getSuperResolutionImage(image, model);
        if (imageData.length !== 0) {
            setSRImage(imageData);
        }
    }

    return (
        <div className="panel-container super-container">
            <div className="sub-panel-container">
                <button className="item" onClick={handleSuperResolution}> Super resolution</button>
                <div className="dropdown-container">
                    <label className="item" htmlFor="super-dropdown">Choose a model:</label>
                    <select className="item" id="super-dropdown" value={model} onChange={handleSelectChange}>
                        <option value="esrgan">ESRGAN</option>
                        <option value="esrgan">ESRGAN</option>
                        <option value="real_esrgan">Real-ESRGAN</option>
                        <option value="swin_ir">SwinIR</option>
                        <option value="swin2_sr">Swin2SR</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
