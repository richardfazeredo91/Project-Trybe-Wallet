const AWESOME_BASE_API = 'https://economia.awesomeapi.com.br';

export default () => (
  fetch(`${AWESOME_BASE_API}/json/all`)
    .then((response) => (
      response.json()
        .then((data) => (
          data
        ))
        .catch((error) => (
          error
        ))
    ))
);
