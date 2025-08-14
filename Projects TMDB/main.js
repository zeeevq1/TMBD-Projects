const apiKey = "fcb5f9f40d9acdf7af2d8c38ded9bb12";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const LS_KEY = "favorites"; // کلید ذخیره‌سازی

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}
function saveFavorites(favs) {
  localStorage.setItem(LS_KEY, JSON.stringify(favs));
}
function isFav(id) {
  const favs = loadFavorites();
  return favs.some((m) => m.id === id);
}
function toggleFav(movie) {
  const favs = loadFavorites();
  const idx = favs.findIndex((m) => m.id === movie.id);
  if (idx >= 0) favs.splice(idx, 1);
  else
    favs.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    });
  saveFavorites(favs);
}

async function fetchMovies() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const movies = data.results;
    displayMovies(data.results);
    displayMovies(movies);
    displayShows(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const faved = isFav(movie.id);
    const movieCard = document.createElement("div");
    movieCard.className =
      "bg-white/60 backdrop-blur rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform duration-300 text-gray-900";

    movieCard.innerHTML = `
      <div class="relative">
        <img src="${imageBaseUrl}${movie.poster_path}" alt="${
      movie.title
    }" class="w-full h-auto">
        <button
          class="fav-btn absolute top-2 right-2 rounded-full p-2 bg-white/80 hover:bg-white shadow"
          aria-label="favorite"
          data-id="${movie.id}">
          ${
            faved
              ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-pink-500" viewBox="0 0 24 24"><path d="M12 21s-6.716-4.35-9.428-7.062C.86 12.226.5 10.37 1.05 8.85 1.72 7.01 3.41 5.75 5.39 5.75c1.5 0 2.86.79 3.61 2.02.75-1.23 2.11-2.02 3.61-2.02 1.98 0 3.67 1.26 4.34 3.1.55 1.52.19 3.38-1.52 5.09C18.716 16.65 12 21 12 21z"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>`
          }
        </button>
      </div>
      <div class="p-4">
        <h2 class="text-lg font-semibold">${movie.title}</h2>
        <p class="text-sm text-gray-600">Rating: ${movie.vote_average}</p>
      </div>
    `;

    movieCard.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFav(movie);

      const btn = e.currentTarget;
      const nowFav = isFav(movie.id);
      btn.innerHTML = nowFav
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-pink-500" viewBox="0 0 24 24"><path d="M12 21s-6.716-4.35-9.428-7.062C.86 12.226.5 10.37 1.05 8.85 1.72 7.01 3.41 5.75 5.39 5.75c1.5 0 2.86.79 3.61 2.02.75-1.23 2.11-2.02 3.61-2.02 1.98 0 3.67 1.26 4.34 3.1.55 1.52.19 3.38-1.52 5.09C18.716 16.65 12 21 12 21z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>`;
    });

    movieCard.addEventListener("click", (e) => {
      document.getElementById("popup").classList.remove("hidden");
      e.preventDefault();
      populatePopup(movie);
    });

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
