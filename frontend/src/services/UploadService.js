import axios from 'axios'

const UPLOAD_ROUTE = (process.env.NODE_ENV !== 'development') ? '/upload-img' : 'http://localhost:3007/upload-img'

function uploadImg(uploadedImg) {
    return axios.post(UPLOAD_ROUTE, uploadedImg,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    ).then(res => res.data)
}
function uploadUserImg(uploadedImg, userId) {
    return axios.put(`${UPLOAD_ROUTE}/${userId}`, uploadedImg,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    ).then(res => res.data)
}

export default {
    uploadUserImg,
    uploadImg
} 