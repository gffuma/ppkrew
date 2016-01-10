import request from 'superagent';
import {Promise} from 'es6-promise';

// Get current coords using browser api
exports.getCurrentCoords = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        resolve({ latitude, longitude });
      }, reject);
    } else {
      reject('Geolocation not supported');
    }
  });
};

// Get address by coords using a reverse geocoding service
const getAddressInfoByCoordsFromAPI = ({ lat, lon }) => {
  return new Promise((resolve, reject) => {
    const baseUrl = 'http://nominatim.openstreetmap.org/reverse';
    request
      .get(`${baseUrl}?format=json&lat=${lat}&lon=${lon}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          reject();
        } else {
          if (res.body.error) {
            reject();
          } else {
            const {address, display_name} = res.body;
            resolve({address, display_name});
          }
        }
      });
  });
};

// Cache address info for better performance
exports.getAddressInfoByCoords = ({ lat, lon }) => {
  return new Promise((resolve, reject) => {
    const key = 'ppk-location:' + btoa(`${lat}-${lon}`);
    const addressInfo = localStorage.getItem(key);

    if (addressInfo) {
      resolve(JSON.parse(atob(addressInfo)));
    } else {
      getAddressInfoByCoordsFromAPI({lat, lon}).then(addressInfo => {
        localStorage.setItem(key, btoa(JSON.stringify(addressInfo)));
        resolve(addressInfo);
      }, reject);
    }
  });
};
