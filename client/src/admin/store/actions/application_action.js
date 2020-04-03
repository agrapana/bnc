import axios from 'axios';
import {
    ADD_APPLICATION,
    CLEAR_APPLICATION,
    ADD_APPLICATION_ICON,
    CLEAR_APPLICATION_ICON,
    ADD_APPLICATION_IMAGES,
    CLEAR_APPLICATION_IMAGES,
    ADD_APPLICATION_APK,
    CLEAR_APPLICATION_APK,
    UPDATE_APPLICATION,
    CLEAR_UPDATE_APPLICATION,
    UPDATE_APPLICATION_IMAGES,
    CLEAR_UPDATE_APPLICATION_IMAGES,
    GET_APPLICATION,
    GET_APPLICATION_BY_ID,
    DOWNLOAD_APPLICATION,
    PUBLISH_APPLICATION,
    CLEAR_PUBLISH_APPLICATION,
    UNPUBLISH_APPLICATION,
    CLEAR_UNPUBLISH_APPLICATION
} from '../types';
import { APPLICATION_SERVER } from '../misc';

function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
        // console.log(parentKey, "!!!!!!!!!!!!!!!!parentkey")
        // console.log(value, "!!!!!!!!!!!!!!!!value")
        if (parentKey === 'url') {
            let randomnumber = Date.now();
            var date = new Date();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDay()).slice(-2);
            var year = date.getFullYear();

            var objecturl = dataURItoBlob(value);
            formData.append(parentKey, objecturl, `lumisoft_${day}_${month}_${year}_${randomnumber}.apk`);

        } else {
            formData.append(parentKey, value);
        }

    }
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

function jsonToFormData(data) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
}

export function addApplication(dataToSubmit) {
    const request = axios.post(`${APPLICATION_SERVER}/addapplication`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_APPLICATION,
        payload: request
    }
}

export function updateApplication(dataToSubmit) {
    const request = axios.post(`${APPLICATION_SERVER}/updateapplication`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_APPLICATION,
        payload: request
    }
}

export function addApplicationIcon(dataToSubmit) {
    let icon = jsonToFormData(dataToSubmit);
    const request = axios.post(`${APPLICATION_SERVER}/addapplicationicon`, icon)
        .then(response => response.data);

    return {
        type: ADD_APPLICATION_ICON,
        payload: request
    }
}

export function addApplicationImages(dataToSubmit) {
    let form = jsonToFormData(dataToSubmit);
    const request = axios.post(`${APPLICATION_SERVER}/addapplicationimage`, form)
        .then(response => response.data);

    return {
        type: ADD_APPLICATION_IMAGES,
        payload: request
    }
}

export function addApplicationApk(dataToSubmit) {
    let form = jsonToFormData(dataToSubmit);
    const request = axios.post(`${APPLICATION_SERVER}/addapplicationapk`, form)
        .then(response => response.data);

    return {
        type: ADD_APPLICATION_APK,
        payload: request
    }
}

export function downloadApplication(linkToDownload) {
    const request = axios({
        url: `${APPLICATION_SERVER}/getapk?publicid=${linkToDownload}`,
        method: 'GET',
        responseType: 'blob'
    }).then(response => response.data);

    return {
        type: DOWNLOAD_APPLICATION,
        payload: request
    }
}

export function updateApplicationImages(dataToSubmit) {
    const formData = new FormData();
    for (const key in dataToSubmit) {
        if ((dataToSubmit[key])) {
            if (key === 'imagesToAdd') {
                dataToSubmit[key].forEach((img, i) => {
                    formData.append(`image${i}`, img);
                });
            } else {
                formData.append(key, dataToSubmit[key]);
            }
        }
    }
    const request = axios.post(`${APPLICATION_SERVER}/updateapplicationimage`, formData)
        .then(response => response.data);

    return {
        type: UPDATE_APPLICATION_IMAGES,
        payload: request
    }
}

export function clearApplication() {
    return {
        type: CLEAR_APPLICATION,
        payload: ''
    }
}

export function clearUpdateApplication() {
    return {
        type: CLEAR_UPDATE_APPLICATION,
        payload: ''
    }
}

export function clearApplicationIcon() {
    return {
        type: CLEAR_APPLICATION_ICON,
        payload: ''
    }
}

export function clearApplicationImages() {
    return {
        type: CLEAR_APPLICATION_IMAGES,
        payload: ''
    }
}

export function clearApplicationApk() {
    return {
        type: CLEAR_APPLICATION_APK,
        payload: ''
    }
}

export function clearUpdateApplicationImages() {
    return {
        type: CLEAR_UPDATE_APPLICATION_IMAGES,
        payload: ''
    }
}

export function publishApplication(dataToSubmit) {
    const request = axios.post(`${APPLICATION_SERVER}/publishapplication`, dataToSubmit)
        .then(response => response.data);

    return {
        type: PUBLISH_APPLICATION,
        payload: request
    }
}

export function clearPublishApplication() {
    return {
        type: CLEAR_PUBLISH_APPLICATION,
        payload: ''
    }
}

export function unpublishApplication(dataToSubmit) {
    const request = axios.post(`${APPLICATION_SERVER}/unpublishapplication`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UNPUBLISH_APPLICATION,
        payload: request
    }
}

export function clearUnpublishApplication() {
    return {
        type: CLEAR_UNPUBLISH_APPLICATION,
        payload: ''
    }
}

// export function updateApplication (dataToSubmit) {
//     const formData = new FormData();
//     for (const key in dataToSubmit) {
//         if ((dataToSubmit[key])) {
//             if (key === 'imagesToAdd') {
//                 dataToSubmit[key].forEach((img, i) => {
//                     formData.append(`image${i}`, img);
//                 });
//             } else {
//                 formData.append(key, dataToSubmit[key]);
//             }
//         }
//     }

//     const request = axios.post(`${PORTFOLIO_SERVER}/updateportfolio`, formData)
//         .then(response => response.data);

//     return {
//         type: UPDATE_PORTFOLIO,
//         payload: request
//     }
// }

// export function clearUpdatePortfolio() {
//     return {
//         type: CLEAR_UPDATE_PORTFOLIO,
//         payload: ''
//     }
// }

export function getApplication() {
    const request = axios.get(`${APPLICATION_SERVER}/getapplications`)
        .then(response => response.data);

    return {
        type: GET_APPLICATION,
        payload: request
    }
}

export function getPortfolioByid(id) {
    const request = axios.get(`${APPLICATION_SERVER}/getapplicationbyid?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        })

    return {
        type: GET_APPLICATION_BY_ID,
        payload: request
    }
}