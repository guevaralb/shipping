import axios from 'axios';
import * as types from './actionTypes';

export function addPacket(packet) {
    return { type: types.ADD_PACKET, packet};
}

export function editPacket(packet) {
    return { type: types.EDIT_PACKET, packet};
}

export function deletePacket(id) {
    return { type: types.DELETE_PACKET, id};
}

export function setPackets(packets) {
    return { type: types.SET_PACKETS, packets};
}

export function ajaxLoading(status) {
    return { type: types.AJAX_LOADING, status};
}

export function getPackets() {
    return dispatch => {
        dispatch(ajaxLoading(true));
        axios.get('http://127.0.0.1:3002/productos')
            .then(response => {
                dispatch(setPackets(response.data));
                dispatch(ajaxLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(ajaxLoading(false));
            });
    };
}