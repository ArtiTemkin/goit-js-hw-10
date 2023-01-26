import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('#search-box');
const contryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let fetchCountryDebounced = debounce(createListOfCountries, DEBOUNCE_DELAY);

inputCountryName.addEventListener('input', fetchCountryDebounced);

function createListOfCountries(event) {
  if (event.target.value === '') {
    return;
  }
  fetchCountries(event.target.value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length < 10 && countries.length >= 2) {
        countryInfo.innerHTML = '';
        contryList.innerHTML = generateListItem(countries);
      } else {
        contryList.innerHTML = '';
        countryInfo.innerHTM = generateCountryCard(countries);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      contryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function generateListItem(name, flagUrl) {
  return (markUpList = `<li class="list-item-header" id=${name}>
        <img
        src="${flagUrl}"
        width=20px
        height=15px>
        <h3 class="country-name">${name}</h3>
      </li>`);
}

function generateCountryCard(countries) {
  contryList.innerHTML = '';
  return (markUpCard = `<div class="list-item-header">
        <img src="${countries[0].flag}" width=30px height=25px>
        <h2 class="country-name">${countries[0].name}</h2></div>
        <h3>Capital: ${countries[0].capital}</h3>
        <h3>Population: ${countries[0].population}</h3>
        <h3>Languages: ${countries[0].languages
          .map(language => language.name)
          .join(',')}</h3>`);
}
