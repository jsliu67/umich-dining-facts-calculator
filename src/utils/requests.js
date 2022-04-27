import axios from 'axios';

const API_URL = `https://michigan-dining-api.tendiesti.me/v1/menus?`;
export const getMenus = async (diningHall, date, meal) => {

  const url = `${API_URL}date=${date}&diningHall=${diningHall}%20Dining%20Hall&meal=${meal}`
  const response = await axios.get(url);

  return response.data.menus;
};