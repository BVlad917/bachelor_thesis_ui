import {ImgComparisonSlider} from '@img-comparison-slider/react';

type ImageProps = {
    image: File;
    srImage: string;
};
export default function ImageSlider({image, srImage}: ImageProps) {
    return (
        <div className="slider-container">
            <ImgComparisonSlider className="slider rendered">
                <img slot="first" width="100%" src={URL.createObjectURL(image)} alt="one"/>
                <img slot="second" width="100%" src={srImage} alt="two"/>
            </ImgComparisonSlider>
        </div>
    );
}
