//Recursivo de la multiplicación
/* --Complementario 1 --
  1.Crear una función que reciba N como parámetro 
  y genere la tabla de multiplicar por consola 
  utilizando recursividad.
Luis Anthony Moreira Lucas 6A*/

function multiplicar(iTabla, iNumero){
		
	if (iNumero>1)
		multiplicar(iTabla,iNumero-1);		
		
        console.log(iTabla + "x" + iNumero + "=" + iTabla*iNumero);
}
multiplicar(2,10);