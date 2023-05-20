import React, {Dispatch, SetStateAction} from "react";
import SuperResolutionContainer from "./SuperResolutionContainer";
import OcrContainer from "./OcrContainer";
import ImgContainer from "./ImgContainer";

type MainProps = {
    placeholder: File | null;
    image: File | null;
    srImage: string | null;
    setSRImage: Dispatch<SetStateAction<string | null>>;
    setOcrText: Dispatch<SetStateAction<string | null>>;
    selectedDisplay: string | null;
};

export default function MainContainer({
                                          placeholder,
                                          image,
                                          srImage,
                                          setSRImage,
                                          setOcrText,
                                          selectedDisplay,
                                      }: MainProps) {

    return (
        <div className="main-container">
            <SuperResolutionContainer image={image} setSRImage={setSRImage}></SuperResolutionContainer>
            <ImgContainer placeholder={placeholder} image={image} srImage={srImage}
                          selectedDisplay={selectedDisplay}></ImgContainer>
            <OcrContainer image={image} srImage={srImage} setOcrText={setOcrText}></OcrContainer>
        </div>
    );
}
