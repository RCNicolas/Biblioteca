// ! Enviar datos al json
const enviar = async () => {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: "como hacer feliz a un programador",
      fecha: "2020",
      autor: "yo",
    }),
  };
  let res = await (await fetch("http://localhost:3000/libros", config)).json();
  console.log(res)
};
enviar();

// ! Actualizar datos del json 
// const actualizar = async (id) => {
//   let config = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       titulo: "como comprar 2millomes de pan",
//       fecha: "2040",
//       autor: "eldimo",
//     }),
//   };
//   let res = await (await fetch("http://localhost:3000/libros/"+id, config)).json();
// };
// actualizar(2);

// ! Eliminar en el json
// const eliminar = async (id) => {
//   let config = {
//     method: "DELETE"
//   };
//   let res = await (await fetch("http://localhost:3000/libros/"+id, config)).json();
// };
// eliminar(1);

// ! Buscar 
const buscar = async (id) => {
  let config = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo: "como comprar 2millomes de pan",
      fecha: "2040",
      autor: "eldimo",
    }),
  };
  let res = await (await fetch("http://localhost:3000/libros/"+id, config)).json();
};
buscar(2);
