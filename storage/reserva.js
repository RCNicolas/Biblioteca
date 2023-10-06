import { env } from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;

const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};
// Obtener datos
export const getAllReserva = async () => {
  config.method = "GET";
  //config.body = "";
  let res = await (await fetch(`${uri}/reserva`, config)).json();
  return res;
};
// Enviar datos
export const postReserva = async (obj) => {
  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/reserva`, config)).json();
  return res;
};
// Eliminar un dato
export const deleteOneReserva = async (id) => {
  if (typeof id !== `number`)
    return {
      status: 400,
      menssage: `El dato '${id}' no cumple con el formato. `,
    };

  config.method = "DELETE";
  let res = await (await fetch(`${uri}/reserva/${id}`, config)).json();
  return res;
};
// Actualizar un dato
export const putOneReserva = async (obj={}) => {
  if (!obj.id)return {status: 400,menssage: `Usuario mande los datos -_- `,};
    
  config.method = "PUT";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/reserva`, config)).json();
  return res;
};
