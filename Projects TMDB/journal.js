//HUA
async function fetch() {
  const apiKey = "fcb5f9f40d9acdf7af2d8c38ded9bb12";
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
    document.getElementById("commentar").innerHTML = `
      <div class="flex flex-col items-center">
        <img src="https://image.tmdb.org/t/p/w300${randomMovie.poster_path}" alt="${randomMovie.title}" class="mb-4 rounded shadow-lg" />
        <h2 class="text-2xl font-bold mb-2">${randomMovie.title}</h2>
        <p class="text-gray-700 mb-2">${randomMovie.release_date}</p>
        <p class="text-gray-600 max-w-md">${randomMovie.overview}</p>
        <button id="write-comment-btn" class="mt-4 mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition">Write a Comment</button>
      </div>
    `;
    // Add event listener for the new button
    document.getElementById("write-comment-btn").onclick = function () {
      // Save movie info to localStorage
      localStorage.setItem("selectedMovie", JSON.stringify(randomMovie));
      // Redirect to journal.html
      window.location.href = "favorites.html";
    };
  } catch (error) {
    document.getElementById("film-result").innerHTML = "Error fetching movies.";
  }
}
