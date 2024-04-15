import axios from "axios"

export const POST_ACRONIMO = "POST_ACRONIMO"
export const GET_ACRONIMO = "GET_ACRONIMO"
export const GET_HISTORIAL = "GET_HISTORIAL"

const BASE_URL = "https://apiacronimo-production.up.railway.app"

export function busqueda(payload) {
  return async function (dispatch) {
    const info = await axios.post(`${BASE_URL}/api/busquedas`, payload,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(
      "QUE INFO TRAE DE POST:",
      info.data,
      "INFO QUE LE ENVIO ",
      payload
    );
    return dispatch({
      type: POST_ACRONIMO,
      payload: info.data,
    });
  };
}

export const searchAcronimo = (sf) => {
  return async function (dispatch) {
    const acronimo = await axios.get(`${BASE_URL}/api?sf=${sf}`)
    console.log("probando ", acronimo);
    dispatch({type:GET_ACRONIMO , payload:acronimo.data})
    if (acronimo.length > 1 ){
       dispatch({
        type: POST_ACRONIMO,
        payload: acronimo.data,
      });
    }else{
      console.log(acronimo, "algo");
    }
  }
}


export const historial_busqueda = () => {
  return async function (dispatch){
    const peticion = await axios.get(`${BASE_URL}/api/historial`)

    return dispatch ({type:GET_HISTORIAL, payload: peticion.data})
  }
}