async function fetchCharacterData() {
    try {
      const response = await fetch("https://api.disneyapi.dev/character/6448");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching character data:", error);
      return null;
    }
  }
  
  async function displayMovies() {
    const data = await fetchCharacterData();
    const moviesGrid = document.getElementById("movies-grid");
  
    moviesGrid.innerHTML = "";
  
    if (!data || !data.data || !data.data.films) {
      moviesGrid.innerHTML = `<p class="text-darkblue">No movies found or failed to fetch data.</p>`;
      return;
    }
  
    const movies = data.data.films.filter(
      (movie) => !excludeMovies.includes(movie)
    );
  
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className =
        "bg-teal rounded-lg shadow-lg p-4 flex flex-col items-center";
  
      const movieImage = document.createElement("img");
      movieImage.src = imagePathMap[movie] || "images/noImage.jpg";
      movieImage.alt = movie;
      movieImage.className =
        "h-40 w-auto rounded mb-4 border-2 border-lightblue";
  
      const movieTitle = document.createElement("p");
      movieTitle.textContent = movie;
      movieTitle.className = "text-darkblue text-lg font-roboto";
  
      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      moviesGrid.appendChild(movieCard);
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayMovies);
  