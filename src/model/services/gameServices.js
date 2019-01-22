import axios from 'axios';

const url = '/api';
export const saveGame = game => axios.post(`${url}/saveGame`, { data: game });
export const loadGame = () => axios.get(`${url}/loadGame`);
export const saveConfig = config => axios.post(`${url}/saveConfig`, { data: config });
export const loadConfig = () => axios.get(`${url}/loadGame/config`);
export const deleteRecord = id => axios.delete(`${url}/deleteGame?id=${id}`, { params: { id } });
