const fs = require('fs')

const axios = require('axios')



class Busquedas {
    
    historial = []
    pathBD = './db/historial.json'

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado(){

        return this.historial.map( lugar => {
            
            let palabras = lugar.split(' ')
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) )

            return palabras.join(' ')
        })
    }
    
    constructor(){
        this.leerDB()
    }



    async ciudad( lugar = '' ){
        // Peticion HTTP
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const { data } = await instance.get()

            const lugares = data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

            return lugares

        } catch (error) {
            return []
        }
    }


    async climaPorLugar( lat, lon ){
        
        try {
            
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat,
                    lon,
                    'appid': process.env.APENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            })

            const { data } = await instance.get()
            
            const { temp, temp_min, temp_max } = data.main
            const { description } = data.weather[0]

            return {
                desc: description,
                temp: temp,
                min: temp_min,
                max: temp_max,
            }

        } catch (error) {
            return error
        }
    }

    agregarHistorial( lugar = '' ){
        // Prevenir duplicados
        if( this.historial.includes( lugar ) ){
            return
        }
        
        this.historial.unshift(lugar)

        // Grabar en DB
        this.grabarDB()
    }


    grabarDB(){
        this.historial = this.historial.slice(0, 5)

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.pathBD, JSON.stringify( payload ) )
    }


    leerDB(){
        if( !fs.existsSync( this.pathBD ) ){
            return
        }

        const infoDB = fs.readFileSync( this.pathBD, { encoding: 'utf-8' } )
        const data = JSON.parse( infoDB )

        this.historial = data.historial
    }

}



module.exports = Busquedas