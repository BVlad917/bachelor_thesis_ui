import React, {Dispatch, SetStateAction, useState} from "react";
import {getSuperResolutionImage} from "../backend";
import {TailSpin} from "react-loader-spinner";

type ImageProps = {
    image: File | null;
    setSRImage: Dispatch<SetStateAction<string | null>>;
};
export default function SuperResolutionContainer({image, setSRImage}: ImageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [model, setModel] = useState('bsrgan');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setModel(option);
    };

    const handleSuperResolution = async () => {
        setIsLoading(true);
        const imageData = await getSuperResolutionImage(image, model);
        if (imageData.length !== 0) {
            setSRImage(imageData);
        }
        setIsLoading(false);
    }

    return (
        <div className="panel-container super-container">
            <div className="sub-panel-container">
                <button className="item" onClick={handleSuperResolution}> Super resolution</button>
                {isLoading && (<div className="loading-overlay">
                            <TailSpin
                                height="150"
                                width="150"
                                color="#4361ee"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    )}
                <div className="dropdown-container">
                    <label className="item" htmlFor="super-dropdown">Choose a model:</label>
                    <select className="item" id="super-dropdown" value={model} onChange={handleSelectChange}>
                        <option value="bsrgan">BSRGAN</option>
                        <option value="ESRGAN">ESRGAN</option>
                        <option value="real_esrgan">Real-ESRGAN</option>
                        <option value="swin_ir">SwinIR</option>
                        <option value="swin2_sr">Swin2SR</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
