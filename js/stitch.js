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

// Exclude lists
const excludeMovies = [
  "Treasure Planet",
  "Brother Bear",
  "Outtakes",
  "The Lion King 1½",
  "Once Upon a Halloween",
  "Big Hero 6",
  "Ralph Breaks the Internet",
];

const excludeAttractions = [
  "It's a Small World",
  "The Golden Mickeys",
  "World of Color",
  "Fashionable Easter",
  "Wonderful World of Animation",
];

async function displayMovies() {
  const data = await fetchCharacterData();
  const moviesGrid = document.getElementById("movies-grid");

  moviesGrid.innerHTML = "";

  if (!data || !data.data || !data.data.films) {
    moviesGrid.innerHTML = `<p class="text-darkblue">No movies found or failed to fetch data.</p>`;
    return;
  }

  const movies = data.data.films.filter((movie) => !excludeMovies.includes(movie));

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

async function displayParkAttractions() {
  const data = await fetchCharacterData();
  const parkAttractionsGrid = document.getElementById("parkAttractions-grid");

  parkAttractionsGrid.innerHTML = "";

  if (!data || !data.data || !data.data.parkAttractions) {
    parkAttractionsGrid.innerHTML = `<p class="text-darkblue">No park attractions found or failed to fetch data.</p>`;
    return;
  }

  const parkAttractions = data.data.parkAttractions.filter(
    (attraction) => !excludeAttractions.includes(attraction)
  );

  parkAttractions.forEach((attraction) => {
    const attractionCard = document.createElement("div");
    attractionCard.className =
      "bg-teal rounded-lg shadow-lg p-4 flex flex-col items-center";

    const attractionImage = document.createElement("img");
    attractionImage.src = imagePathMap[attraction] || "images/noImage.jpg";
    attractionImage.alt = attraction;
    attractionImage.className =
      "h-40 w-auto rounded mb-4 border-2 border-lightblue";

    const attractionTitle = document.createElement("p");
    attractionTitle.textContent = attraction;
    attractionTitle.className = "text-darkblue text-lg font-roboto";

    attractionCard.appendChild(attractionImage);
    attractionCard.appendChild(attractionTitle);
    parkAttractionsGrid.appendChild(attractionCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
  displayParkAttractions();
});
