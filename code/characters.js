const characterList = document.querySelector(".character_list");
const pagination = document.querySelector(".pagination");

const fetchCharacters = async (page = 1) => {
    
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();

    
    if (data.results) {
        renderCharacters(data.results);
        renderPagination(data.info.pages, page);
    } else {
        console.log("Ошибка при получении данных");
    }
};


const renderCharacters = (characters) => {
    characterList.innerHTML = ""; 

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "character_card";
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Type:</strong> ${character.type}</p>
            <p><strong>Origin:</strong> <a href="${character.origin.url}" target="_blank">${character.origin.name}</a></p>
            <p><strong>Location:</strong> <a href="${character.location.url}" target="_blank">${character.location.name}</a></p>
            <p><strong>Episodes:</strong> ${character.episode.length}</p>
        `;
        characterList.appendChild(card);
    });
};



const renderPagination = (totalPages, currentPage) => {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = "page_button";
        if (i === currentPage) {
            pageBtn.disabled = true;
        }
        pageBtn.addEventListener("click", () => {
            fetchCharacters(i);
        });
        pagination.appendChild(pageBtn);
    }
};


fetchCharacters(1); 
