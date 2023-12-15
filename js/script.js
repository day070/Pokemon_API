let offset = 0;

function fetchPokemonList(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Ooops " + response.status);
        return;
      }
      response.json().then(function (data) {
        const pokemons = data.results;
        const pokemonListElement = document.getElementById("pokemon-list");

        pokemons.forEach((pokemon) => {
          fetch(pokemon.url)
            .then(function (response) {
              if (response.status !== 200) {
                console.log("Ooops " + response.status);
                return;
              }
              return response.json();
            })
            .then(function (pokemonData) {
              const imgSrc =
                pokemonData.sprites.other.dream_world.front_default;

              const listItem = document.createElement("li");
              listItem.innerHTML = `
                <img src="${imgSrc}" alt="${pokemonData.name}" class="pokemon-image"/>
                <p onclick="detail('${pokemon.url}')">${pokemonData.name}</p>
              `;
              pokemonListElement.appendChild(listItem);
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

// load page
function loadPage() {
  offset += 10;
  document.getElementById("pokemon-list").innerHTML = "";
  fetchPokemonList(offset);
}

function prevPage() {
  offset -= 10;
  document.getElementById("pokemon-list").innerHTML = "";
  fetchPokemonList(offset);
}

fetchPokemonList(offset);

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
      <div class="pokemon-view">
      <img src="${pokemon.sprites.other.dream_world.front_default}" class="img-detail">
      <h2 class="nama-pkm">${pokemon.name}</h2>
          <p>Height: ${pokemon.height}</p>
          <p>Weight: ${pokemon.weight}</p>
          <p>Skills: ${skills}</p>
          </div>
        `;
    })
    .catch(function (err) {
      console.log(err);
    });
}

fetchPokemonList(offset);
