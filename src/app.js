const path         = require('path')
const express      = require('express')
const hbs          = require('hbs')
const getForeCast  = require('./utils/forecast')
const getGeoCode   = require('./utils/geocode')

const app = express()

const dir           = path.join(__dirname , '../public')
const viewPath      = path.join(__dirname , '../templates/views')
const partialsPath  = path.join(__dirname , '../templates/partials')


app.set('view engine','hbs')
app.set('views', viewPath)
app.use(express.static(dir))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index', {
        title : 'About myself',
        name : 'Nagaraj'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About Page.html',
        name : 'Nagaraj'
    })
})

app.get('/weather',(req,res) =>{

    if(!req.query.search){
           return res.send({
                error:'No such place found !',
                errorCode : '405'
            })
    }
        getGeoCode(req.query.search,(error,{lon,lat,placename} = {}) => {

            if(error){
                return res.send({
                    error:'No co-ordinates found for the given place!',
                    errorCode : '405'
                })
            }
            
            getForeCast(lon,lat,(error,foredata) =>{

                if(error){
                    return res.send({
                        error:'No such co-ordinates found for the place!',
                        errorCode : '405'
                    })
                }

                res.send({
                    temperature : foredata.temp,
                    city : foredata.city
                })
            })
                
        })
})

app.get('*',(req,res)=>{
        res.render('404')
})

app.listen(3000, ()=>{
    console.log(' Server is running ...')
})
