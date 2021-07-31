const reservacion = [
    {
        id: 1,
        fecha: '29/05/2021',
        hora: '13:30',
        idusuario: 2
    },
    {
        id: 2,
        fecha: '28/05/2021',
        hora: '11:00',
        idusuario: 3
    },
    {
        id: 3,
        fecha: '27/05/2021',
        hora: '10:45',
        idusuario: 1
    }
]
const usuario = [
    {
        id:1,
        nombre:'Juan Mendoza',
        idpago:1
    },
    {
        id:2,
        nombre:'Luis Lucas',
        idpago:2
    },
    {
        id:3,
        nombre:'Heidy Pluma',
        idpago:4
    }
]
const pagos = [
    {
        id:1,
        nombre:'VISA',
    },
    {
        id:2,
        nombre:'MasterCard',
    },
    {
        id:3,
        nombre:'DISCOVER',
    },
    {
        id:4,
        nombre:'Efectivo',
    }

]

function buscarReservacion(id) {
    return new Promise((resolve, reject) => {

        const reserva = reservacion.find(
            (reserva) => {
                return reserva.id === id;
            }
        )
        if (!reserva) {
            const error = new Error();
            error.message = "La reservación no existe"
            reject(error);
        }
        
        resolve(reserva);
    })
    
}


function buscarUsuario(id) {
    return new Promise((resolve, reject) => {

        const usuari = usuario.find(
            (usuari) => {
                return usuari.id === id;
            }
        )
        if (!usuari) {
            const error = new Error();
            error.message = "El registro con ese nombre no existe"
            reject(error);
        }
        resolve(usuari);
    })
}
function buscarPago(id) {
    return new Promise((resolve, reject) => {
        const pago = pagos.find(
            (pago) => {
                return pago.id === id;
            }
        )
        if (!pago) {
            const error = new Error();
            error.message = "El pago no existe"
            reject(error);
        }
        resolve(pago);
    })
}

async function mainx() {
    try {
        
        const reservacion = await buscarReservacion(1);
        const usuario = await buscarUsuario(reservacion.idusuario);
        const pago = await buscarPago(usuario.idpago);

        reservacion.usuario = usuario;
        delete reservacion.idusuario;
        console.log(reservacion)
        
    }
    catch (second) {
        console.log(second.message);
    }
}
mainx()
