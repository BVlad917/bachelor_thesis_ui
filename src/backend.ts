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

export async function getOcrText(image: string | null, model: string): Promise<string> {
    let response = await getFromApi(image, model, OCR_ENDPOINT);
    if (response !== null) {
        let texts = response.data.text;
        let confidences = response.data.confidence;
        let box = response.data.box;

        return response.data.text;
    }
    return '';
}
async function getFromApi(image: File | string | null, model: string, endpoint: string): Promise<AxiosResponse<any> | null> {
    if (image) {
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("model_name", model);
            return await axios.post(API_URL + endpoint, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
        } catch (error) {
            console.error(error);
        }
    }
    return null;
}