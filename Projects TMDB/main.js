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

// the following part from hua: This function is triggered when the "Random Film" button is clicked
document.getElementById("random-film-btn").onclick = async function () {
  const apiKey = "fcb5f9f40d9acdf7af2d8c38ded9bb12"; // <-- Replace with your TMDB API key
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    if (!movies || movies.length === 0) {
      document.getElementById("film-result").innerHTML = "No movies found.";
      return;
    }
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    document.getElementById("film-result").innerHTML = `
      <div class="flex flex-col items-center">
        <img src="https://image.tmdb.org/t/p/w300${randomMovie.poster_path}" alt="${randomMovie.title}" class="mb-4 rounded shadow-lg" />
        <h2 class="text-2xl font-bold mb-2">${randomMovie.title}</h2>
        <p class="text-gray-700 mb-2">${randomMovie.release_date}</p>
        <p class="text-gray-600 max-w-md">${randomMovie.overview}</p>
        <button id="write-thoughts-btn" class="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition">Write your thoughts</button>
      </div>
    `;

    // Add event listener for the new button
    document.getElementById("write-thoughts-btn").onclick = function () {
      // Save movie info to localStorage
      localStorage.setItem("selectedMovie", JSON.stringify(randomMovie));
      // Redirect to journal.html
      window.location.href = "journal.html";
    };
  } catch (error) {
    document.getElementById("film-result").innerHTML = "Error fetching movies.";
  }
};
