import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.7:3333',
});

// command to know the ip addresses tested on Ubuntu 18.04
// ip a | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'

export default api;
