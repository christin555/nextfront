import API from "../index";

const getServices = () => API.post('services/get', {})


export default getServices;
