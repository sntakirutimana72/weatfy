import storage from '../helpers/storage.js';
import env from '../helpers/env.js';

export default class {
  static getCountries() {
    return new Promise((resolve, reject) => {
      storage.countries = [];
      storage.cities = [];
      storage.current = undefined;

      fetch(env.COUNTRIES_SNOW_API_URL)
        .then((resp) => resp.json()).then(({ data }) => {
          storage.countries = data.map(({ name }) => name);
          resolve(storage.countries);
        })
        .catch(() => { reject(); });
    });
  }

  static getCities(country) {
    storage.cities = [];
    storage.current = country;

    return new Promise((resolve, reject) => {
      fetch(env.CITIES_SNOW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      })
        .then((resp) => resp.json()).then(({ data }) => {
          storage.cities = data;
          resolve(data);
        })
        .catch(() => { reject(); });
    });
  }

  static getStats(city) {
    return new Promise((resolve, reject) => {
      fetch(`${env.WEATHER_API_URL}${city}`)
        .then((resp) => resp.json())
        .then(resolve)
        .catch((exc) => { reject(); });
    });
  }
}
