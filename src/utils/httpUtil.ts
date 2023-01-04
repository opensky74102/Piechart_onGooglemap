import axios from 'axios';
import {getLocalStorage} from './storageUtil';

export function fetch(url:string, endpoint:string) {
    return axios
        .get(url + endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + ' ' + getLocalStorage('token')
            }
        });
}

export function store(url:string, endpoint:string, data:any) {
    return axios
        .post(url + endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + ' ' + getLocalStorage('token')
            }
        });
}

export function update(url:string, endpoint:string, data:any) {
    return axios
        .put(url + endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + ' ' + getLocalStorage('token')
            }
        });
}

export function destroy(url:string, endpoint:string) {
    return axios
        .delete(url + endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + ' ' + getLocalStorage('token')
            }
        });
}