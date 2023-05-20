import React, {Dispatch, SetStateAction, useState} from "react";

type RadioProps = {
    setSelectedDisplay: Dispatch<SetStateAction<string>>;
};
export default function RadioButtons({setSelectedDisplay}: RadioProps) {
    const [selectedOption, setSelectedOption] = useState('slider');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const option = event.target.value;
        setSelectedOption(option);
        setSelectedDisplay(option);
    };
    return (
        <div className="radio-container">
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
        </div>
    );
}
