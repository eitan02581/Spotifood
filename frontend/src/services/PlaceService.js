import axios from 'axios'

function getPlace(latLng) {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latLng.lat},${latLng.lng}&radius=1500&key=AIzaSyCEIrbCmODXToFDp94rRIqMtWFq1V9X6fE
    `)
        .then(res => {
            // console.log('res from places api', res)
        })
}

export default {
    getPlace
}