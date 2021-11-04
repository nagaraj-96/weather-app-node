const request = require('request')

const getLatLong= (place,callback) => {


    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ place +',%20Tamilnadu.json?access_token=pk.eyJ1IjoibmFnYXJhajk2IiwiYSI6ImNrdmZjZmJsaTB5OHIzMG4zOGt5ZGJ5M3cifQ.v2hFcG_vbMGXV8mlhTLPDA'


 request({url : url, json : true}, (error,response) => {
     
        if(error){
                callback(' Unable to connect : '+error,undefined)
        }
        else if(response.body.error){
                callback(' Error in response : '+response.body.error, undefined)
        }
        else{
            console.log(response.body.features)
            callback(undefined,{
                lat      : response.body.features[0].center[0],
                lon      : response.body.features[0].center[1],
                placename: response.body.features[0].place_name
            })
        }
 })

}

module.exports = getLatLong