import axios from 'axios'

axios.defaults.baseURL = 'https://backend-projet-7.herokuapp.com';

axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem( 'token');