import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let fetchCountryDebounced = debounce(createListOfCountries, DEBOUNCE_DELAY);

inputCountryName.addEventListener('input', fetchCountryDebounced);

function createListOfCountries(event) {
  console.log(event.target.value);
  if (event.target.value === '') {
    return;
  }
  fetchCountries(event.target.value)
    .then(countries => {
      console.log(countries.length);
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length < 10 && countries.length >= 2) {
        console.log('sadfsda');
        countryInfo.innerHTML = '';
        countryList.innerHTML = generateListItem(countries);
      } else {
        console.log('generate single card');
        countryList.innerHTML = '';
        countryInfo.innerHTML = generateCountryCard(countries);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function generateListItem(countries) {
  console.log(countries);
  return countries
    .map(
      country =>
        `<li class="list-item-header" id=${country.name}>
        <img
        src="${country.flag}"
        width=20px
        height=15px>
        <h3 class="country-name">${country.name}</h3>
      </li>`
    )
    .join(',');
}

function generateCountryCard(countries) {
  contryList.innerHTML = '';
  return `<div class="list-item-header">
        <img src="${countries[0].flag}" width=30px height=25px>
        <h2 class="country-name">${countries[0].name}</h2></div>
        <h3>Capital: ${countries[0].capital}</h3>
        <h3>Population: ${countries[0].population}</h3>
        <h3>Languages: ${countries[0].languages
          .map(language => language.name)
          .join(',')}</h3>`;
}
