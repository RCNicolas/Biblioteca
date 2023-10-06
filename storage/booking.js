import { getOne as getOneUser } from "./user.js";
import { getOne as getOneBook } from "./book.js";
import { env } from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {
  method: undefined,
  headers: { "Content-Type": "application/json" },
};

const validarExtructura = (data = {}) => {
  if (data.constructor.name !== "Object" || Object.keys(data).length == 0)
    return { status: 400, message: `Usuario envie los datos` };
  const {
    userId = null,
    bookId = null,
    dateBooking = null,
    dateBookingEnd = null,
    state = null,
  } = data;
  let dateLoan = new Date(dateBooking);

  if (!(dateLoan && dateLoan.getFullYear() <= 2040))
    return {
      status: 400,
      message: `La dateBooking '${dateBooking}' no cumple con el formato`,
    };
  let dateReturn = new Date(dateBookingEnd);
  if (!(dateReturn && dateReturn.getFullYear() <= 2040))
    return {
      status: 400,
      message: `La dateBookingEnd '${dateBookingEnd}' no cumple con el formato`,
    };
  if (typeof userId !== "number")
    return {
      status: 400,
      message: `El userId '${userId}' no cumple con el formato`,
    };
  if (typeof bookId !== "number")
    return {
      status: 400,
      message: `El bookId '${bookId}' no cumple con el formato`,
    };
  if (typeof dateBooking !== "string")
    return {
      status: 400,
      message: `El dateBooking '${apellido}' no cumple con el formato`,
    };
  if (typeof dateBookingEnd !== "string")
    return {
      status: 400,
      message: `La dateBookingEnd '${nacionality}' no cumple con el formato`,
    };
  if (typeof state !== "string")
    return {
      status: 400,
      message: `La state '${state}' no cumple con el formato`,
    };
  return data;
};
export const post = async (obj = {}) => {
  obj = validarExtructura(obj);
  if (obj.status) return obj;

  config.method = "POST";
  config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/booking`, config)).json();
  return res;
};
export const getOne = async (id) => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/booking/${id}`, config)).json();
  return res;
};

export const getAll = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/booking`, config)).json();
  return res;
};
export const getRelationships = async () => {
  config.method = "GET";
  // config.body = "";
  let res = await (await fetch(`${uri}/booking`, config)).json();
  res = await Promise.all(
    res.map(async (data, id) => {
      let { userId: usId, bookId: booId} = data;
      let us = await getOneUser(usId);
      let boo = await getOneBook(booId);
      data.userId = us;
      data.bookId = boo;
      return data;
    })
  );

  return res;
};
export const deleteOne = async (id) => {
  if (typeof id !== "number")
    return {
      status: 400,
      message: `El datos '${id}' no cumple con el formato`,
    };
  config.method = "DELETE";
  // config.body = JSON.stringify(obj);
  let res = await (await fetch(`${uri}/booking/${id}`, config)).json();
  return res;
};

// console.log(
//   await post({
//     userId: 1,
//     bookId: 1,
//     bookId: 1,
//     dateBooking: "2021-06-05",
//     dateBookingEnd: "2020-03-03",
//     state: "Excelente"
//   })
// );

// console.log( await getOne(1));
// console.log(await getAll());

// console.log(await getRelationships());
// console.log(deleteOne(1));