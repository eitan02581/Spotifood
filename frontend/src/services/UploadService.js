import axios from 'axios'

const UPLOAD_ROUTE = (process.env.NODE_ENV !== 'development') ? '/uploadImg' : 'http://localhost:3007/uploadImg'

function uploadImg(uploadedImg) {
    console.log('imgs', uploadedImg)
    return axios.post(UPLOAD_ROUTE, uploadedImg,
        {
            headers: {

                'content-type': 'multipart/form-data'
            }
        }
    ).then(res => res.data)
}

export default {
    uploadImg
} 