
/* --Complementario 1 --
  4.Recorrer el arreglo definido en la opción 
  anterior y mostrarlo aplicando un do-while.
Luis Anthony Moreira Lucas 6A*/


const comidas = [
    "sopa de pollo",
    "pescado apanado",
    "asado"
]
let favoritas=0;
do
{
    console.log(comidas[favoritas]);
    favoritas++;
}
while(favoritas<comidas.length)