require('dotenv').config()
require('colors')

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer')
const Busquedas = require('./models/busquedas')


const main = async() => {

    const busquedas = new Busquedas()
    let opt = 0

    do {
        opt = await inquirerMenu()
        
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const teminoDeBusqueda = await leerInput('Ciudad: ')
                
                // Buscar lugares
                const lugares = await busquedas.ciudad( teminoDeBusqueda )
                // console.log(lugares)

                // Seleccionar el lugar
                const idLugar = await listarLugares( lugares )
                if( idLugar === 0 ){ continue }

                const lugarSeleccionado = lugares.find( lugar => lugar.id === idLugar )
                
                // Guardar en DB
                busquedas.agregarHistorial( lugarSeleccionado.nombre )

                // Obtener clima
                const clima = await busquedas.climaPorLugar( lugarSeleccionado.lat, lugarSeleccionado.lng )

                // Mostrar resultados
                console.clear()
                console.log('\nInformación del lugar\n'.green)
                console.log('Ciudad:', lugarSeleccionado.nombre.yellow)
                console.log('Lat:', lugarSeleccionado.lat)
                console.log('Lng:', lugarSeleccionado.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Mínima:', clima.min)
                console.log('Máxima:', clima.max)
                console.log('Clima:', clima.desc.yellow)
                break
            
                case 2:
                    busquedas.historial.forEach( (lugar, index) => {
                        const idx = `${ index + 1 }.`.green
                        console.log(`${ idx } ${ lugar }`)
                    })
                    break
        }


        if(opt !== 0){ await pausa() } 

    } while (opt !== 0)
    


}

main()