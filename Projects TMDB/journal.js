// Display selected movie info if available
const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
if (selectedMovie) {
  document.getElementById("commentar").insertAdjacentHTML(
    "afterbegin",
    `<div class="flex flex-col items-center">
      <img src="https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}" alt="${selectedMovie.title}" class="mb-4 rounded shadow-lg" />
      <h2 class="text-2xl font-bold mb-2">${selectedMovie.title}</h2>
      <p class="text-gray-700 mb-2">${selectedMovie.release_date}</p>
      <p class="text-gray-600 max-w-md">${selectedMovie.overview}</p>
    </div>`
  );
}

// Save comment logic
document.getElementById("save-comment-btn").onclick = function () {
  const textarea = document.getElementById("comment-textarea");
  const comment = textarea.value.trim();
  if (!comment) {
    alert("Please write a comment before saving.");
    return;
  }
  if (!selectedMovie) {
    alert("No movie selected.");
    return;
  }
  // Save comment with movie id
  let comments = JSON.parse(localStorage.getItem("movieComments") || "{}");
  comments[selectedMovie.id] = comment;
  localStorage.setItem("movieComments", JSON.stringify(comments));
  alert("Comment saved!");
};
