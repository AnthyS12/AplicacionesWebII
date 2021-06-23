const cuartos = [
    {
        id:1,
        nombre:'01A',
        direccion:'Hotel las Brisas',
        camas: '2',
        idpiso:1

    },
    {
        id:2,
        nombre:'02B',
        direccion:'Hotel Oro Verde',
        camas: '1',
        idpiso:2
    },
    {
        id:3,
        nombre:'03C',
        direccion:'Manta Airport Hotel',
        camas: '2',
        idpiso:3,
    }

]
const pisos = [
    {
        id:1,
        nombre:'Pescado Apanado',
        idpago:1
    },
    {
        id:2,
        nombre:'Pollo Hornado',
        idpago:2
    },
    {
        id:3,
        nombre:'Ceviche de Camaron',
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
function buscarCuarto(id)
{
    
    const cuarto=cuartos.find( 
        (cuarto)=>
        {return cuarto.id ===id}
    )
    
    if(!cuarto)
    {
        const error = new Error();
        error.message="El cuarto no existe.!!"
        throw error;
    }
    return cuarto;
}
function agregarPiso(id)
{
    return new Promise((resolve, reject)=>{
         
         const piso=pisos.find( 
            (piso)=> 
            {return piso.id ===id}
        )
        if(!piso)
        {
            const error = new Error();
            error.message="El piso no existe.!!"
            reject (error);
        }
        resolve (piso);

    })
}
function buscarPagos(id)
{
    return new Promise((resolve, reject)=>{
        
        const pago=pagos.find( 
            (pago)=> {return pago.id ===id}
        )
        if(!pago)
        {
            const error = new Error();
            error.message="El tipo de pago no existe.!!"
            reject (error);
        }
        resolve (pago);
    })
}

async function main ()
{
    try
    {
    const cuarto = await buscarCuarto(2);
    const piso = await agregarPiso(cuarto.idpiso);
    const pago = await buscarPagos(piso.idpago);
    
    cuarto.piso=piso;
    delete cuarto.idpiso;
    console.log(cuarto);
   }
    catch(ex)
    {
        console.log(ex.message);
    }
}

main();