const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
]


const inquirerMenu = async() => {
    console.clear()
    console.log('=================================='.green)
    console.log('       Selecione una opción       '.white)
    console.log('==================================\n'.green)

    const { opcion } = await inquirer.prompt( menuOpts )

    return opcion
}


const pausa = async() => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`,
        }
    ])
}


const leerInput = async( message='' ) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ){
                    return `Por favor ingrese un valor \n`
                }
                return true
            }

        }
    ]

    const { desc } = await inquirer.prompt( pregunta )

    return desc
}

const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map(( lugar, index )=>{
        const idx = `${ index + 1 }.`.green
        return {
            value: lugar.id,
            name: `${idx} ${ lugar.nombre }`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancerlar'
    })

    const listadoLugares = [
        {
            type: 'list',
            name: 'idLugar',
            message: 'Selecione el lugar: ',
            choices
        }
    ]

    const { idLugar } = await inquirer.prompt( listadoLugares )
    
    return idLugar
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}