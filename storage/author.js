import {env} from "../config.js";

const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type": "application/json"}};


const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        name=null, 
        lastName=null, 
        nacionality=null, 
    } = data;

    if(typeof name !== 'string') return {status: 400, message: `El name '${name}' no cumple con el formato`};
    if(typeof lastName !== 'string') return {status: 400, message: `El lastName '${apellido}' no cumple con el formato`};
    if(typeof nacionality !== 'string') return {status: 400, message: `La nacionality '${nacionality}' no cumple con el formato`};
    return data;
}
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/author`, config)).json();
    return res;
}
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/author/${id}`, config)).json();
    return res;
}
export const getAll = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/categories?_embed=books`, config)).json();
    return res;
}




// console.log(await post({
//     name:"Miguel",
//     lastName:"Castro", 
//     nacionality:"Europeo", 
// }));
// console.log(await post({
//     name:"Santiago",
//     lastName:"Marquez", 
//     nacionality:"Venezolano", 
// }));
// console.log(await post({
//     name:"Kevin",
//     lastName:"Esteba", 
//     nacionality:"Japones", 
// }));
// console.log(await post({
//     name:"Cristian",
//     lastName:"Pardo", 
//     nacionality:"Italiano", 
// }));