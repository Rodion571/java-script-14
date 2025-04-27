const episodeList = document.querySelector(".episode_list");
const pagination = document.querySelector(".pagination");

const fetchEpisodes = async (page = 1) => {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`);
    const data = await response.json();

    if (data.results) {
        renderEpisodes(data.results);
        renderPagination(data.info.pages, page);
    } else {
        console.log("Ошибка при получении данных");
    }
};

const renderEpisodes = (episodes) => {
    episodeList.innerHTML = "";

    episodes.forEach(episode => {
        const episodeItem = document.createElement("div");
        episodeItem.className = "episode_item";
        episodeItem.textContent = `${episode.episode} - "${episode.name}" (Air Date: ${episode.air_date})`;
        episodeList.appendChild(episodeItem);
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
            fetchEpisodes(i);
        });
        pagination.appendChild(pageBtn);
    }
};

fetchEpisodes(1);
