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
      const { countries: cList } = storage;

      if (isEmpty(cList)) {
        fetch(env.COUNTRIES_SNOW_API_URL)
          .then(resp => resp.json()).then(({ data }) => {
            storage.countries = data.map(({ iso2, name }) => ({ key: iso2, name }));
            resolve(storage.countries);
          })
          .catch(() => { resolve(cList) });
      } else {
        resolve(cList)
      }
    });
  }

  /**
   *
   * @param { string } country
   * @returns { Promise<string[]> }
   */
  static getCities(country) {
    return new Promise(resolve => {
      if (country === storage.selectedCountry) {
        resolve(storage.cities)
      } else {
        fetch(env.RAPID_API_CITIES_URL)
          .then(resp => resp.json() ).then(cities => {
            storage.selectedCountry = country;
            storage.cities = cities;
            resolve(cities);
          })
          .catch(() => {
            storage.selectedCountry = null;
            resolve([]);
          });
      }
    });
  }

  static getStats(cityName) {
    return new Promise((resolve, reject) => {
      fetch(`${env.WEATHER_API_URL}${cityName}`)
        .then(resp => resp.json()).then(resolve).catch(() => { reject() })
    });
  }
}
