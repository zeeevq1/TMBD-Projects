const apiKey = "fcb5f9f40d9acdf7af2d8c38ded9bb12";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

async function fetchMovies() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    const movies = data.results;

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

    movieCard.addEventListener("click", (e) => {
      document.getElementById("popup").classList.remove("hidden");
      e.preventDefault();
      populatePopup(movie);
    });

    container.appendChild(movieCard);
  });
}

fetchMovies();

function randomFilmArray(array) {
  return array.sort(() => Math.random() - 0.5).slice(0, 4);
}

//DISPAY SHOWS FUNCTION
function displayShows(movies) {
  movies = randomFilmArray(movies);
  const showContainer = document.getElementById("liveshows");
  showContainer.innerHTML = "";

  movies.forEach((movie) => {
    const showCard = document.createElement("div");

    showCard.innerHTML = `
        <a   href="">
              <img
                class="w-full aspect-[16/24] bg-cover rounded-lg overflow-hidden mb-3  max-[910px]:w-[1000px] max-[910px]:bg-fit max-[910px]:h-[350px]"
                src="${imageBaseUrl}${movie.poster_path}"
                alt="${movie.title}"
              />
              <a
                href="#"
                class="text-[1.1rem] font-bold tracking-normal hover:text-blue-600 transition-colors"
              >
                ${movie.title}
              </a>
              <p class="mt-2 text-[0.9rem]">${movie.overview}</p>
            </a>
    `;
    showCard.addEventListener("click", (e) => {
      document.getElementById("popup").classList.remove("hidden");
      e.preventDefault();
      populatePopup(movie);
    });

    showContainer.appendChild(showCard);
  });
}

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("popupCloseBtn");

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

//POP UP FUNCTION

function populatePopup(movie) {
  currentMovieId = movie.id;

  const titlePopUp = document.querySelector(".info-container h1");
  titlePopUp.textContent = movie.title;

  const year = movie.release_date;
  const infoFilm = document.querySelector("#popup .info-film");
  infoFilm.innerHTML = `
    <p class="bg-orange-400 rounded-md px-2 py-1">Release Year: ${year}</p>
  `;

  const ratingValue = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  document.querySelector(
    "#popup .pop-container .flex.flex-col.items-center p.text-white span"
  ).textContent = ratingValue;

  const popularity = movie.popularity ? Math.round(movie.popularity) : "N/A";
  document.querySelector(
    "#popup .pop-container .flex.items-center.gap-2 p.text-gray-500 span"
  ).textContent = popularity;

  const imageElem = document.querySelector(".img-popup");
  imageElem.src = imageBaseUrl + movie.poster_path;
  imageElem.alt = movie.title;

  document.querySelector(".description").textContent = movie.overview;

  popup.classList.remove("hidden");

  loadReviewsForMovie(currentMovieId);
}

// REVIEWS

const reviewForm = document.getElementById("reviewForm");
const reviewTextarea = document.getElementById("reviewTexareat");
const reviewContainer = document.getElementById("reviewContainer");

let currentMovieId = null;

function getStorageKey(movieId) {
  return `reviews_${movieId}`;
}

function loadReviewsForMovie(movieId) {
  const reviews =
    JSON.parse(localStorage.getItem(getStorageKey(movieId))) || [];
  reviewContainer.innerHTML = "";

  reviews.forEach((review, index) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.className =
      "bg-gray-100 p-3 mb-2 rounded-md flex justify-between items-center";

    reviewDiv.innerHTML = `
      <span class="text-gray-700">${review}</span>
      <button class="text-red-500 hover:text-red-700" data-index="${index}">❌</button>
    `;

    reviewDiv.querySelector("button").addEventListener("click", () => {
      deleteReviewForMovie(movieId, index);
    });

    reviewContainer.appendChild(reviewDiv);
  });
}

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = reviewTextarea.value.trim();

  if (text && currentMovieId) {
    const key = getStorageKey(currentMovieId);
    const reviews = JSON.parse(localStorage.getItem(key)) || [];
    reviews.push(text);
    localStorage.setItem(key, JSON.stringify(reviews));

    reviewTextarea.value = "";
    loadReviewsForMovie(currentMovieId);
  } else {
    alert("Scrivi qualcosa prima di salvare!");
  }
});

function deleteReviewForMovie(movieId, index) {
  const key = getStorageKey(movieId);
  const reviews = JSON.parse(localStorage.getItem(key)) || [];
  reviews.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(reviews));
  loadReviewsForMovie(movieId);
}
