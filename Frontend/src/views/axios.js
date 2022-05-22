import axios from 'axios'

axios.defaults.baseURL = 'https://projet7-backend.herokuapp.com/';

axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem( 'token');