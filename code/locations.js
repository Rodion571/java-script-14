const locationList = document.querySelector(".location_list");
const pagination = document.querySelector(".pagination");

const fetchLocations = async (page = 1) => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/?page=${page}`);
    const data = await response.json();

    if (data.results) {
        renderLocations(data.results);
        renderPagination(data.info.pages, page);
    } else {
        console.log("Ошибка при получении данных");
    }
};

const renderLocations = (locations) => {
    locationList.innerHTML = "";

    locations.forEach(location => {
        const locationItem = document.createElement("div");
        locationItem.className = "location_item";
        locationItem.textContent = `${location.name} - [${location.type}] (${location.dimension})`;
        locationList.appendChild(locationItem);
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
            fetchLocations(i);
        });
        pagination.appendChild(pageBtn);
    }
};

fetchLocations(1);
