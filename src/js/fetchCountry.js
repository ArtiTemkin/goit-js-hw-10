export function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v2/name/' +
      name +
      '?fields=name,capital,population,flag,languages'
  ).then(response => {
    if (response.status === 404) {
      throw new Error('Oops, there is no country with that name');
    } else {
      return response.json();
    }
  });
}
