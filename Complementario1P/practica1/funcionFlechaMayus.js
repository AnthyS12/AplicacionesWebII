
/* --Complementario 1 --
  5.Crear una función flecha que reciba un 
  elemento del arreglo de comidas favoritas y 
  lo devuelva en mayúscula
Luis Anthony Moreira Lucas 6A*/

const comidas = [
    "sopa de pollo",
    "pescado apanado",
    "asado"
];

 
const comidas_favoritas =  (comidas)=>{
    console.log(`Comida favorita es ${comidas}.`);
}
    comidas_favoritas(comidas[0].toLocaleUpperCase());
    