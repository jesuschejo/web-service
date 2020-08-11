const guardarSuperheroe = () => {

 const nombre = document.getElementById('nombre-s').value;
 const imagen = document.getElementById('foto-s').value;
 const descripcion = document.getElementById('descripcion-s').value;

 const nuevoSuperheroe = {
   nombre,
   imagen,
   descripcion
 };

 $.post('http://localhost:3000/superheroes', nuevoSuperheroe);
};

document.getElementById('btn-guardar-s').onclick = guardarSuperheroe;

const cargarSuperheroes = () => {
 $.getJSON('http://localhost:3000/superheroes', data => {
   console.log(data);

   for (let i = 0; i < data.length; i++) {
     const user = `
     
       <tr id="${data[i].nombre}">
         <td><img src="${data[i].imagen}" width="75"></td>
         <td>${data[i].nombre}</td>
         <td>${data[i].descripcion}</td>
         <td>
            <button  class="btn btn-primary" onclick="eliminarsuperheroe('${data[i].nombre}')">
              Eliminar
            </button>
          </td>
       </tr>
      
     `;
     document.getElementById('superheroes-tbody').innerHTML += user;
   }
 })
};

const eliminarsuperheroe = (id) => {
  $.ajax(`http://localhost:3000/superheroes/${id}`, {
    type: 'DELETE',
    success: function (data) {
      document.getElementById(id).remove();
    }
  });
};

let boton = document.querySelector('#btn-cargar-s')
boton.addEventListener('click', cargarSuperheroes)
