import axios from 'axios';
import { Credentials } from '../Types/Credentilas';
import { enqueueSnackbar } from 'notistack';
import { getCookie } from '../Helpers/CookieHelper';
import { Album } from '../Types/Album';

interface getAlbumsResponse {
    data: {
        albums?: Album[]
        msg?: string
    },
    status: number
}
export async function getAlbumsRequest() {
    const response: getAlbumsResponse = await axios({
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'get',
        url: 'http://127.0.0.1:5000/getAll',
        withCredentials: true,
        validateStatus(status) {
            return status < 500;
        },
    }).catch(function (error) {
        const response: getAlbumsResponse = {
            data: {
                msg: 'Sorry, internal error occured'
            },
            status: error.status
        }
        return response
    }
    );
    return response
}

interface getAlbumResponse {
    data: {
        album?: Album[]
        msg?: string
    },
    status: number
}
export async function getAlbumRequest(_id: string) {
    const response: getAlbumResponse = await axios({
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'post',
        url: 'http://127.0.0.1:5000/getAlbum',
        withCredentials: true,
        data: {
            "_id": _id,
        },
        validateStatus(status) {
            return status < 500;
        },
    }).catch(function (error) {
        const response: getAlbumResponse = {
            data: {
                msg: 'Sorry, internal error occured'
            },
            status: error.status
        }
        return response
    }
    );
    return response
}

interface insertAlbumResponse {
    data: {
        msg?: string
    },
    status: number
}

export async function createAlbumRequest(name: string, date: string, image_url: string) {
    const accessTokenString = getCookie("access_token");
    const accessToken = accessTokenString ? JSON.parse(accessTokenString) : accessTokenString
    const response: insertAlbumResponse = await axios({
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + accessToken
        },
        method: 'post',
        url: 'http://127.0.0.1:5000/insert',
        data: {
            "name": name,
            "date": date,
            "image_url": image_url
        },
        withCredentials: true,
        validateStatus(status) {
            return status < 500;
        },
    }).catch(function (error) {
        const response: insertAlbumResponse = {
            data: {
                msg: 'Sorry, internal error occured'
            },
            status: error.status
        }
        return response
    }
    );
    return response
}

interface updateAlbumResponse {
    data: {
        msg?: string
    },
    status: number
}

export async function updateAlbumRequest(_id: string, name: string, date: string, image_url: string) {
    const accessTokenString = getCookie("access_token");
    const accessToken = accessTokenString ? JSON.parse(accessTokenString) : accessTokenString
    const response: updateAlbumResponse = await axios({
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + accessToken
        },
        method: 'post',
        url: 'http://127.0.0.1:5000/update',
        data: {
            "_id": _id,
            "name": name,
            "date": date,
            "image_url": image_url
        },
        withCredentials: true,
        validateStatus(status) {
            return status < 500;
        },
    }).catch(function (error) {
        const response: updateAlbumResponse = {
            data: {
                msg: 'Sorry, internal error occured'
            },
            status: error.status
        }
        return response
    }
    );
    return response
}

interface deleteAlbumResponse {
    data: {
        msg?: string
    },
    status: number
}

export async function deleteAlbumRequest(_id: string) {
    const accessTokenString = getCookie("access_token");
    const accessToken = accessTokenString ? JSON.parse(accessTokenString) : accessTokenString
    const response: deleteAlbumResponse = await axios({
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + accessToken
        },
        method: 'post',
        url: 'http://127.0.0.1:5000/delete',
        data: {
            "_id": _id
        },
        withCredentials: true,
        validateStatus(status) {
            return status < 500;
        },
    }).catch(function (error) {
        const response: deleteAlbumResponse = {
            data: {
                msg: 'Sorry, internal error occured'
            },
            status: error.status
        }
        return response
    }
    );
    return response
}