import storage from "../helpers/storage.js";
import env from '../helpers/env.js';
import { isEmpty } from "../helpers/utils.js";

export default class {
  /**
   *
   * @returns { Promise<string[]> }
   */
  static getCountries() {
    return new Promise(resolve => {
      storage.cities = [];
      storage.selectedCountry = '';

      if (isEmpty(storage.countries)) {
        fetch(env.COUNTRIES_SNOW_API_URL)
          .then(resp => resp.json()).then(({ data }) => {
            storage.countries = data.map(({ name }) => name);
            resolve(storage.countries);
          })
          .catch(() => { reject() });
      } else {
        resolve(storage.countries)
      }
    });
  }

  /**
   *
   * @param { string } country
   * @returns { Promise<string[]> }
   */
  static getCities(country) {
    storage.cities = [];
    storage.selectedCountry = country;

    return new Promise((resolve, reject) => {
      fetch(env.CITIES_SNOW_API_URL, {
        method: 'POST',
        body: JSON.stringify({ country }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(resp => resp.json()).then(({ data }) => {
          storage.cities = data;
          resolve(data);
        })
        .catch(() => { reject() });
    });
  }

  static getStats(cityName) {
    return new Promise((resolve, reject) => {
      fetch(`${env.WEATHER_API_URL}${cityName}`)
        .then(resp => resp.json()).then(resolve).catch(() => { reject() })
    });
  }
}
