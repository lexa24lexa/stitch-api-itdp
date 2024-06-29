async function fetchCharacterData() {
    try {
        const response = await fetch('https://api.disneyapi.dev/character/6448');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching character data:', error);
        return null;
    }
}

async function displayInformation(type, containerId, property) {
    const characterData = await fetchCharacterData();
    const container = document.getElementById(containerId);

    if (!characterData || !characterData.data || !characterData.data[property]) {
        container.textContent = `No ${type} found or failed to fetch data.`;
        return;
    }

    const items = characterData.data[property];

    const filteredItems = property === 'films'
        ? items.filter(item => !excludeMovies.includes(item))
        : property === 'tvShows'
            ? items.filter(item => !excludeTVShows.includes(item))
            : items;

    const table = document.createElement('div');
    table.classList.add('table-container');

    filteredItems.forEach(item => {
        const cell = document.createElement('div');
        cell.classList.add('table-cell');

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        const itemImage = document.createElement('img');
        itemImage.src = imagePathMap[item] || 'path_to_default_image.jpg';
        itemImage.alt = item;
        itemImage.classList.add('item-image');

        const itemName = document.createElement('div');
        itemName.classList.add('item-name');
        itemName.textContent = item;

        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);

        cell.appendChild(itemContainer);
        table.appendChild(cell);
    });

    container.appendChild(table);
}

document.addEventListener('DOMContentLoaded', () => {
    displayInformation('films', 'films-container', 'films');
    displayInformation('short films', 'shortFilms-container', 'shortFilms');
    displayInformation('TV shows', 'tvShows-container', 'tvShows');
    displayInformation('video games', 'videoGames-container', 'videoGames');
    displayInformation('park attractions', 'parkAttractions-container', 'parkAttractions');
});
