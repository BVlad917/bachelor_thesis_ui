import React, {useState} from "react";

export default function BtnContainer() {
    const [selectedOption, setSelectedOption] = useState('slider');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div className="btn-container row">
            <button className="item">Super resolution</button>
            <label className="item">
                <input
                    type="radio"
                    value="slider"
                    checked={selectedOption === 'slider'}
                    onChange={handleOptionChange}
                />
                Image Comparison Slider
            </label>
            <label className="item">
                <input
                    type="radio"
                    value="side_by_side"
                    checked={selectedOption === 'side_by_side'}
                    onChange={handleOptionChange}
                />
                Images side by side
            </label>
            <button className="item">OCR</button>
        </div>
);
}
