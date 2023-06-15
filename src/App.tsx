import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import TextContainer from "./components/TextContainer";
import Upload from './components/Upload';

function App() {
    const [placeholder, setPlaceholder] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [srImage, setSRImage] = useState<string | null>(null);
    const [selectedDisplay, setSelectedDisplay] = useState('slider');

    useEffect(() => {
        const loadImages = async () => {
            const placeholderImage = require('./images/Layer 1.png') as string;
            const file = await fetch(placeholderImage)
                .then((res) => res.arrayBuffer())
                .then((buf) => new File([buf], 'Layer 1.png'));
            setPlaceholder(file);
        };
        loadImages();
    }, []);
    return (
        <div className="App">
            <Header setSelectedDisplay={setSelectedDisplay}></Header>
            <MainContainer placeholder={placeholder} image={image}
                           srImage={srImage} setSRImage={setSRImage}
                           selectedDisplay={selectedDisplay}></MainContainer>
            <Upload setImage={setImage} setSRImage={setSRImage}></Upload>
            <TextContainer srImage={srImage}></TextContainer>
        </div>
    );
}

export default App;
