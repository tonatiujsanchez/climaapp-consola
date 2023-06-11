require('dotenv').config()

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
                const lugarSeleccionado = lugares.find( lugar => lugar.id === idLugar )
                // console.log({idLugar})

                // Clima

                // Mostrar resultados

                console.log('\nInformación del lugar\n'.green)
                console.log('Ciudad:', lugarSeleccionado.nombre)
                console.log('Lat:', lugarSeleccionado.lat)
                console.log('Lng:', lugarSeleccionado.lng)
                console.log('Temperatura:')
                console.log('Mínima:')
                console.log('Máxima:')
                break;
        
        }
        if(opt !== 0){ await pausa() } 

    } while (opt !== 0)
    


}

main()