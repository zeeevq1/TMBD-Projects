const apiKey = "fcb5f9f40d9acdf7af2d8c38ded9bb12";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";


async function fetchMovies() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const movies = data.results;

    displayMovies(movies); 
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className =
      "bg-gray-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform duration-300";

    movieCard.innerHTML = `
      <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}" class="w-full h-auto">
      <div class="p-4">
        <h2 class="text-lg font-semibold">${movie.title}</h2>
        <p class="text-sm text-gray-400">Rating: ${movie.vote_average}</p>
      </div>
    `;

    container.appendChild(movieCard);
  });
}


fetchMovies();
