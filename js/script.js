// onLoad
// fetch Pokemon ALL
fetch("https://pokeapi.co/api/v2/pokemon")
  .then(function (response) {
    if (response.status != 200) {
      console.log("Ooops" + response.status);
      return;
    }
    response.json().then(function (data) {
      const pokemons = data.results;
      pokemons.forEach((pokemon) => {
        document
          .getElementById("pokemon-list")
          .insertAdjacentHTML(
            "beforeend",
            `<li onclick="detail('${pokemon.url}')">${pokemon.name}</li>`
          );
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });
