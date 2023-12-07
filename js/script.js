fetch("https://pokeapi.co/api/v2/pokemon")
  .then(function (response) {
    if (response.status !== 200) {
      console.log("Ooops " + response.status);
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

function detail(url) {
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Ooops " + response.status);
        return;
      }
      return response.json();
    })
    .then(function (pokemon) {
      const skills = pokemon.moves
        .slice(0, 5)
        .map((move) => move.move.name)
        .join(", ");
      document.getElementById("detail").innerHTML = `
          <h3>${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>Height: ${pokemon.height}</p>
          <p>Weight: ${pokemon.weight}</p>
          <p>Skills: ${skills}</p>
        `;
    })
    .catch(function (err) {
      console.log(err);
    });
}
