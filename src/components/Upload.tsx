import React, {Dispatch, SetStateAction} from "react";

type ImageUploaderProps = {
    setImage: Dispatch<SetStateAction<File | null>>;
    setSRImage: Dispatch<SetStateAction<string | null>>;
};
export default function Upload({setImage, setSRImage}: ImageUploaderProps) {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setImage(files[0]);
            setSRImage(null);
        }
    };
    return (
        <div className="upload-container">
            <label htmlFor="select-file-input" id="select-file-label">Choose file</label>
            <input id="select-file-input" type="file" accept="image/*" onChange={handleImageChange}/>
        </div>
    );
}
