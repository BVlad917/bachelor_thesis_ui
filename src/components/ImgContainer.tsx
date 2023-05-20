import ImageSlider from "./ImageSlider";

type ImageProps = {
    placeholder: File | null;
    image: File | null;
    srImage: string | null;
    selectedDisplay: string | null;
};

export default function ImgContainer({placeholder, image, srImage, selectedDisplay}: ImageProps) {
    return (
        <div className="img-container">
            {image == null && placeholder &&
                <img className="img" src={URL.createObjectURL(placeholder)} alt="placeholder"/>}
            {image && srImage == null && <img className="img" src={URL.createObjectURL(image)} alt="placeholder"/>}
            {image && srImage && selectedDisplay === "slider" && <ImageSlider image={image} srImage={srImage}></ImageSlider>}
            {image && srImage && selectedDisplay === "side_by_side" && <div className="side-by-side">
                <img className="img" src={URL.createObjectURL(image)} alt="selected"/>
                <img className="img" src={srImage} alt="sr"/>
            </div>}
        </div>
    );
}
