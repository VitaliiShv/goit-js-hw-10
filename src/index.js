import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let input = null;

const refs = {
  input: document.querySelector('#search-box'),
  countryCard: document.querySelector('.country-info'),
  countrySet: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));

function onInputType(event) {
  input = event.target.value.trim();
  if (input === '') {
    return;
  }
  fetchCountries(input).then(renderMarkup).catch(onFetchError);
}

function renderMarkup(countries) {
  refs.countrySet.innerHTML = '';
  refs.countryCard.innerHTML = '';

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length >= 2 && countries.length <= 10) {
    refs.countrySet.innerHTML = countryListTeamplate(countries);
  }

  if (countries.length === 1) {
    refs.countryCard.innerHTML = countryCardTeamplate(countries);
  }
}

function countryListTeamplate(countries) {
  return countries
    .map(countries => {
      return `<li class="list-item">
        <img class="flag" src="${countries.flags.svg}" alt="$${countries.name.official}"
      />
      <p class="name">${countries.name.official}</p></li>`;
    })
    .join('');
}

function countryCardTeamplate(countries) {
  return countries
    .map(countries => {
      return `<div class="card">
   <div class="card-header">
      <img class="flag" src="${countries.flags.svg}" alt="${
        countries.name.official
      }"
         />
      <h2 class="name">${countries.name.official}</h2>
   </div>
   <p class="capital"><span class = "info-field">Capital: </span>${countries.capital
     .map(cap => cap)
     .join(', ')}
   </p>
   <p class="population"><span class = "info-field">Population: </span>${
     countries.population
   }
   </p>
   <p class="languages"><span class = "info-field">Languages: </span>${Object.values(
     countries.languages
   ).join(', ')}
   </p>
</div>`;
    })
    .join('');
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
