const axios = require('axios');
const url = 'https://httpstatuses.com';

exports.post = async (object, endPoint) => {
  return await axios({
    method: 'post',
    url: url + endPoint,
    data: object,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
