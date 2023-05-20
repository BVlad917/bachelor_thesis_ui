import RadioButtons from "./RadioButtons";
import {Dispatch, SetStateAction} from "react";
type RadioProps = {
    setSelectedDisplay: Dispatch<SetStateAction<string>>;
};
export default function Header({setSelectedDisplay}: RadioProps) {

    return (
        <header className="header-container">
            <RadioButtons setSelectedDisplay={setSelectedDisplay}></RadioButtons>
        </header>
    );
}
