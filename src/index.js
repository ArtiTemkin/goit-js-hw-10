import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountry.js';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('#search-box');
const contryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let fetchCountryDebounced = debounce(a, DEBOUNCE_DELAY);

contryList.addEventListener('click', selectCountry);

inputCountryName.addEventListener('input', fetchCountryDebounced);

let dataArrayOfCountries = [];

function a(event) {
  fetchCountries(event.target.value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        generateCountryCard(countries[0]);
      } else if (countries.length > 1) {
        dataArrayOfCountries = [];
        countryInfo.innerHTML = '';
        const markUpOfList = countries
          .map(country => {
            dataArrayOfCountries.push(country);
            return generateListItem(country.name, country.flag);
          })
          .join('');
        contryList.innerHTML = '';
        contryList.insertAdjacentHTML('beforeend', markUpOfList);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      contryList.innerHTML = '';
      dataArrayOfCountries = [];
      countryInfo.innerHTML = '';
    });
}

function generateListItem(name, flagUrl) {
  return `<li class="list-item-header" id=${name}>
        <img
        src="${flagUrl}"
        width=20px
        height=15px>
        <h3 class="country-name">${name}</h3>
      </li>`;
}

function selectCountry(event) {
  console.log(event.target);
  let selectedCountry = event.target;
  if (selectedCountry.tagName !== 'LI') {
    selectedCountry = selectedCountry.closest('li');
  }
  let selectedCountryData = dataArrayOfCountries.find(
    country => country.name === selectedCountry.id
  );
  generateCountryCard(selectedCountryData);
}

function generateCountryCard(country) {
  contryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const markUpCard = `<div class="list-item-header">
        <img src="${country.flag}" width=30px height=25px>
      <h2 class="country-name">${country.name}</h2></div>
      <h3>Capital: ${country.capital}</h3>
      <h3>Population: ${country.population}</h3>
      <h3>Languages: ${country.languages
        .map(language => language.name)
        .join(',')}</h3>`;
  countryInfo.insertAdjacentHTML('beforeend', markUpCard);
}
