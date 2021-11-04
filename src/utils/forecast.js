const request = require('request')

const getTemp = (lat,lon,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c859583d11a5a507e0be60f210ef97f6&query='+lat+','+lon
 request({url : url, json : true}, (error,response) => {
     
        if(error){
                callback(' Unable to connect : '+error,undefined)
        }
        else if(response.body.error){
                callback(' Error in response : '+response.body.error, undefined)
        }
        else{
            callback(undefined,{
                temp : response.body.current.temperature,
                city : response.body.location.name+','+response.body.location.region+','+response.body.location.country
            })
        }
 })

}

module.exports = getTemp