window.addEventListener('load', function(){
let htmlGenerado="";
htmlGenerado+=`<label for="txtid">ID</label>`
htmlGenerado+=`<input type="text" id="txtid">`
htmlGenerado+=`<label for="txtname">Nombre</label>`
htmlGenerado+=`<input type="text" id="txtname">`
htmlGenerado+=`<label for="txtusername">Nombre del usuario</label>`
htmlGenerado+=`<input type="text" id="txtusername">`
htmlGenerado+=`<label for="txtpassword">Contraseña</label>`
htmlGenerado+=`<input type="text" id="txtpassword">`
htmlGenerado+=`<label for="tipo_usuario">Tipo usuario</label>`
htmlGenerado+=`<select id="txttipo_usuario">`
htmlGenerado+=`<option value="1">Administrador</option>`
htmlGenerado+=`<option value="2">Invitado</option>`
htmlGenerado+=`<option value="3">Gestión</option>`
htmlGenerado+=`</select>`
htmlGenerado+=`<button id="btnnuevo">Nuevo</button>`
htmlGenerado+=`<button id="btngrabar">Grabar</button>`
htmlGenerado+=`<button id="btnmodificar">Modificar</button>`
htmlGenerado+=`<button id="btnconsultar">Consultar</button>`
htmlGenerado+=`<button id="btneliminar">Eliminar</button>`
htmlGenerado+=`<div id="divcontenido"></div>`
htmlCuerpo.innerHTML= htmlGenerado;

btnnuevo.addEventListener('click',function(){
    txtid.value='';
    txtname.value=''
    txtusername.value=''
    txtpassword.value=''
    txttipo_usuario.value='1'

})
btngrabar.addEventListener('click',function(){

    let url = `http://localhost:5000/v1/api/user`;
  
    let tipo;

    if (txttipo_usuario.value == 1) {
        tipo = 'Administrador'
    } else 
    if (txttipo_usuario.value == 2) {
        tipo = 'Invitado'
    } else {
        tipo = 'Gestión'

    } 
    
    let data = {
        name: txtname.value,
        username: txtusername.value,
        tipo_usuario: tipo,
        password: txtpassword.value,
    }
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
          'Content-Type':'application/json'
      }   
    }).then(res=> res.json() )
    .then(res2 => console.log(res2) )
    .catch(error=> console.error('Error', error))
})
btnmodificar.addEventListener('click',function(){
    let url = `http://localhost:5000/v1/api/user/${txtid.value}`;
    let data = {
        name: txtname.value,
        username: txtusername.value,
        password: txtpassword.value
    }
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
          'Content-Type':'application/json'
      }   
    }).then(res=> res.json() )
    .then(res2 => console.log(res2) )
    .catch(error=> console.error('Error', error))
})
btnconsultar.addEventListener('click',function(){
    fetch(`http://localhost:5000/v1/api/user`).then(resultado=>{
        return resultado.json()
    }).then(consulta=>{
        let tabla= "<table border=1>"
        for(const indiceElemento in consulta)
        {
            tabla+="<tr>";
            const actual =  consulta[indiceElemento];
            tabla+=`<td>${actual.name}</td>`
            tabla+=`<td>${actual.tipo_usuario}</td>`
            tabla+=`<td>${actual.password}</td>`
            tabla+=`<td> <button value='${actual._id}'>${actual.username}</button> </td>`
            tabla+="</tr>"
        }
        tabla+="</table>"
        divcontenido.innerHTML= tabla;

    })
    
})
btneliminar.addEventListener('click',function(){
    let url = `http://localhost:5000/v1/api/user/${txtid.value}`;
    fetch(url,{
        method:"DELETE"
    }).then(res=> res.json())
    .then(res2 => console.log(res2))
    .catch(error=> console.error('Error',  error ) )


})

})