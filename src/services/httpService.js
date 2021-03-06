import axios from "axios";
import { toast } from 'react-toastify';
import logService from './logService';

axios.interceptors.response.use(null, error => {  
    const expectedErrors = error.response && error.response.status >=400 && error.response.status <500;
    if(!expectedErrors)
      {
        // console.log('Logging the error', error);
        logService.log(error);
        toast.error('An unexpedted error occurred');
        // toast('An unexpedted error occurred');
        // toast.info('An unexpedted error occurred');
      }
  
    return Promise.reject(error);
  });

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}  