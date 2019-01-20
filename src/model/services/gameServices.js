import axios from 'axios';

export const saveGame = game => axios.post(`${ApplicationRoot}/saveGame`, { data: game });
export const loadGame = () => axios.get(`${ApplicationRoot}/loadGame`);
