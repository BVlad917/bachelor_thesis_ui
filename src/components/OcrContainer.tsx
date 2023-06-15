import React, {useEffect, useState} from "react";
import {getOcr} from "../backend";
import ImageMapper, {CustomArea, MapAreas} from "react-img-mapper";
import Modal from "@mui/material/Modal";
import {Backdrop} from "@mui/material";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import uuid from "react-uuid";
import {TailSpin} from "react-loader-spinner";

type ImageProps = {
    image: File | null;
    srImage: string | null;
};
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #9d5a42',
    boxShadow: 25,
    p: 5,
};
export default function OcrContainer({image, srImage}: ImageProps) {
    const [ocrData, setOcrData] = useState<Record<string, string | number[][] | string[]>>({});
    const [ocrModel, setOcrModel] = useState('tesseract');
    const [imageString, setImageString] = useState<string | null>(null);
    const [areas, setAreas] = useState<Array<MapAreas>>([]);
    const [hovered, setHovered] = useState<CustomArea | null>(null);
    const [activeAreas, setActiveAreas] = useState<Array<CustomArea>>([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setActiveAreas([])
    }
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setOcrModel(option);
    };
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = typeof reader.result === 'string' ? reader.result : null;
            setImageString(base64String);
        };
        if (image) {
            reader.readAsDataURL(image);
        }
    }, [image]);
    const handleOcr = async () => {
        let ocrData = {}
        if (srImage === null && image !== null) {
            setIsLoading(true);
            ocrData = await getOcr(imageString, ocrModel);
        } else {
            if (srImage !== null) {
                setIsLoading(true);
                ocrData = await getOcr(srImage, ocrModel);
            }
        }
        setIsLoading(false);
        if (Object.keys(ocrData).length !== 0) {
            setOcrData(ocrData);
            console.log(ocrData);
            handleOpen();
        }
    }

    useEffect(() => {
        if (Object.keys(ocrData).length !== 0) {
            setAreas([]);
            for (let i = 0; i < ocrData.boxes.length; i++) {
                const label = ocrData.texts[i];
                const box = ocrData.boxes[i];
                if (typeof label === 'string' && Array.isArray(box)) {
                    const area = {
                        id: label,
                        shape: "poly",
                        coords: box,
                        strokeColor: "#00FF00",
                        preFillColor: "transparent"
                    }
                    setAreas(prevList => [...prevList, area]);
                }
            }
        }
    }, [ocrData, ocrData.boxes, ocrData.texts]);
    const clickArea = async (area: CustomArea) => {
        setActiveAreas(prevList => {
            const updatedList = [...prevList, area];
            console.log(prevList.length);
            for (let i = 0; i < prevList.length; i++) {
                if (prevList[i].coords === area.coords) {
                    let updatedItems = [...prevList];
                    updatedItems.splice(i, 1);
                    return updatedItems;
                }
            }
            return updatedList;
        });
    }
    const enterArea = (area: CustomArea) => {
        setHovered(area);
    }

    const leaveArea = (area: CustomArea) => {
        setHovered(null);
    }

    const getTipPosition = (area: CustomArea) => {
        if (area.center) {
            return {top: `${area.center[1]}px`, left: `${area.center[0]}px`};
        }
    }
    let MAP = {
        name: "my-map",
        areas: areas
    };
    return (
        <div className="panel-container ocr-container">
            <div className="sub-panel-container">
                <button className="item" onClick={handleOcr}> OCR</button>
                <div className="dropdown-container">
                    <label className="item" htmlFor="ocr-dropdown">Choose a model:</label>
                    <select className="item" id="ocr-dropdown" value={ocrModel} onChange={handleSelectChange}>
                        <option value="tesseract">TESSERACT</option>
                        <option value="mmocr">MMOCR</option>
                    </select>
                </div>
                {Object.keys(ocrData).length !== 0 && typeof ocrData.image === 'string' && <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{backdrop: Backdrop}}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <button className="close" onClick={handleClose}>
                                &times;
                            </button>
                            {/*<Typography id="transition-modal-title" variant="h6" component="h2">*/}
                            {/*    Hover/click on the boxes*/}
                            {/*</Typography>*/}
                            <div className="ocr-data-container">
                                <ImageMapper src={ocrData.image} map={MAP} lineWidth={2}
                                             toggleHighlighted={true}
                                             stayHighlighted={true}
                                             stayMultiHighlighted={true}
                                             onClick={area => clickArea(area)}
                                             onMouseEnter={area => enterArea(area)}
                                             onMouseLeave={area => leaveArea(area)}
                                />
                                {activeAreas.map((area, index) => (
                                    <span key={uuid()} className="tooltip"
                                          style={{...getTipPosition(area)}}>
                                    {area && area.id}
                                </span>
                                ))}
                                {hovered &&
                                    <span className="tooltip"
                                          style={{...getTipPosition(hovered)}}>
                                    {hovered && hovered.id}
                                </span>
                                }
                            </div>
                        </Box>
                    </Fade>

                </Modal>
                }
            </div>
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
        </div>
    );
}