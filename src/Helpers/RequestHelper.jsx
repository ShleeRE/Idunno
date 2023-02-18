import axios from "axios";
import cfg from "../configuration.json"

export async function getRequest(noun, params = null)
{
    const response = await axios.get(cfg.Development.API_SERVER + noun, {withCredentials : true})
    return response.data
}

export async function postRequest(noun, reqBody){

    const response = await axios.post(cfg.Development.API_SERVER + noun, reqBody, {withCredentials : true})
    return response.data
}