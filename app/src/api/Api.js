// export const SERVER_ADDRESS = 'http://172.16.1.127:3000';
import {getToken} from "../util/Store";

// export const SERVER_ADDRESS = 'http://172.16.0.117:8123';
export const SERVER_ADDRESS = 'http://bgm-php.global-abilities.jp';
export const BEARER = 'Bearer';
// export const SERVER_ADDRESS = 'https://maxbox.io';
export const API_ENDPOINT = SERVER_ADDRESS + '/api/';

const getParam = (method: string, data: any, token = null) => {

    return {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${BEARER} ${token}`
        },
        body: data && JSON.stringify(data)
    }
};

export const request = async (endpoint: string, method: string, body: any, navigate_token) => {
    const token = navigate_token || await getToken();
    // console.warn('endpoint', API_ENDPOINT + endpoint);
    // console.warn('params', JSON.stringify(body));
    return fetch(
        API_ENDPOINT + endpoint,
        getParam(method, body, token)
    )
        .then(res => {
            try {
                return res.json()
            } catch (e) {
                throw e;
            }
        })
        .then((data) => {
            return handleError(data)
        })
        .catch(error => {
            throw error;
        });
};

const handleError = (response) => {
    const error = response && response.status;
    if (!error) {
        throw {
            message: response.result.message,
            code: response.result.code,
        };
    } else {
        return response.result;
    }
};

export const register = (body) => {
    return request('devices/register', 'POST', body);
}

export const updateDeviceToken = (device_token) => {
    return request('devices/device-token', 'PATCH', {device_token});
}

export const getDetailDevice = () => {
    return request('devices/detail', 'GET');
}

export const payment = (receipt_data, os) => {
    return request(`payment`, 'POST', {receipt_data, os});
};

export const getTags = () => {
    return request('tags', 'GET');
};

export const searchKey = (isTag, text) => {
    return request(`musics/search? ${isTag ? 'tag' : 'text'}=${text}`, 'GET');
};

export const searchByTag = (tag) => {
    return request(`musics/search?tag=${tag}`, 'GET');
};

export const getDetailMusic = (id_music) => {
    return request(`musics/${id_music}`, 'GET');
};

export const getUrlDownloadMusic = (id_music) => {
    return request(`musics/${id_music}/download`, 'GET');
};

export const getPlaylist = (token) => {
    return request(`playlists`, 'GET', null, token);
};

export const addMusicToPlaylist = (playlistId, body) => {
    return request(`playlists/${playlistId}/musics`, 'POST', body);
};

export const editPlaylist = (playlistId, body) => {
    return request(`playlists/${playlistId}`, 'PATCH', body);
};

export const getListByPlaylist = (playlistId, body) => {
    return request(`playlists/${playlistId}/musics`, 'GET');
};

export const requestMusic = (body) => {
    return request(`request-music`, 'POST', body);
};

export const getNews = (type, page, language) => {
    return request(`news?&type=${type}&language=${language}&page=${page}`, 'GET');
};

export const readNews = (id, language) => {
    return request(`news/${id}?language=${language}`, 'GET');
};

export const readOnlyNews = (id) => {
    return request(`news/${id}/read-only`, 'POST');
};

export const readAllNews = () => {
    return request(`news/read-all`, 'POST');
};

export const getTotalNews = () => {
    return request(`news/total-unread`, 'GET');
};

export const getPaymentInfo = () => {
    return request(`payment/info`, 'GET');
};

export const agreeService = () => {
    return request(`devices/agree-service`, 'POST');
};

export const agreePolicy = () => {
    return request(`devices/agree-policy`, 'POST');
};

export const countPlayDemo = (musicId) => {
    return request(`musics/history-play-demo/log`, 'POST', {musicId});
};

export const syncMusic = (playlists) => {
    return request(`playlists/sync`, 'POST', {playlists});
};

export const syncHistoryPlay = (data) => {
    return request(`musics/history-play/log`, 'POST', {data});
};

export const settingDevice = () => {
    return request(`devices/settings`, 'GET');
};

export const getPolicyContent = (language) => {
    return request(`webview/policy?lang=${language}`, 'GET');
};