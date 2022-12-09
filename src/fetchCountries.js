const BASE_URL = 'https://restcountries.com/v3.1';
const BASE_FILTERS = 'fields=name,capital,population,flags,languages';

function fetchCountries(countriesName) {
  return fetch(`${BASE_URL}/name/${countriesName}?${BASE_FILTERS}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    }
  );
}

export { fetchCountries };
