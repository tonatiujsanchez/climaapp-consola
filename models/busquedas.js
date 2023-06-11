const axios = require('axios')

class Busquedas {
    
    historial = ['Tlapa, Acapulco, CDMX, Bogota, Madrid, Hottawa']

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    
    constructor(){
        // TODO: Leer de DB si existe
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

        return [] //Retornar las ciudad encontradas (6)
    }
}


module.exports = Busquedas