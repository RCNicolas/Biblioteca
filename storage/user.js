import {env} from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};


const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        name=null, 
        lastName=null, 
        direction=null,
        phone = null,
        email = null 
    } = data;

    if(typeof name !== 'string') return {status: 400, message: `El name '${name}' no cumple con el formato`};
    if(typeof lastName !== 'string') return {status: 400, message: `El lastName '${apellido}' no cumple con el formato`};
    if(typeof direction !== 'string') return {status: 400, message: `La direction '${direction}' no cumple con el formato`};
    if(typeof phone !== 'string') return {status: 400, message: `La phone '${phone}' no cumple con el formato`};
    if(typeof email !== 'string') return {status: 400, message: `La email '${email}' no cumple con el formato`};
    return data;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/users`, config)).json();
    return res;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/users/${id}`, config)).json();
    return res;
}
export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/users`, config)).json();
    return res;
}




// console.log(await post({
//   name: "Mario",
//   lastName: "Luigi",
//   direction: "direccion 3",
//   phone: "3003003000",
//   email: "marioluigi@gmail.com"
// }));
// console.log(await post({

// console.log( await getAll());