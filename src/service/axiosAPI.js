import axios from 'axios';

export default axios.create({
	baseURL: `https://tealistserver.herokuapp.com/`,
});
