import axios, {AxiosResponse} from 'axios';

const API_URL = 'http://localhost:5000';
const SR_ENDPOINT = '/super-resolution';
const OCR_ENDPOINT = '/ocr';

export async function getSuperResolutionImage(image: File | null, model: string): Promise<string> {
    let response = await getFromApi(image, model, SR_ENDPOINT);
    if (response !== null) {
        let imageData = response.data.image;
        return `data:image/png;base64,${imageData}`;
    }
    return '';

}

export async function getOcr(image: string | null, model: string): Promise<Record<string, string | number[][] | string[]>> {
    let response = await getFromApi(image, model, OCR_ENDPOINT);
    if (response !== null) {
        const dict = {
            image: `data:image/png;base64,${response.data.image}`,
            boxes: response.data.boxes,
            texts: response.data.texts
        }
        return dict;
    }
    return {};
}

async function getFromApi(image: File | string | null, model: string, endpoint: string): Promise<AxiosResponse<any> | null> {
    if (image) {
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("model_name", model);
            const response = await axios.post(API_URL + endpoint, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    return null;
}