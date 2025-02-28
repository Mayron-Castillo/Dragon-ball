const main = document.querySelector(".main");
const apiBaseURL = "https://dragonball-api.com/api/characters"; 

// Función para obtener todos los personajes de la API
//en el que recorremos todas las paginas para obtener 
// todos los personajes
async function dragonballCharacters() {
    let allCharacters = [];
    let page = 1;
    let totalPages = 1; 

    try {
        while (page <= totalPages) {
            const response = await fetch(`${apiBaseURL}?page=${page}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            if (page === 1) {
                totalPages = data.meta.totalPages; 
            }

            allCharacters = allCharacters.concat(data.items); 
            console.log(`Página ${page} de ${totalPages} cargada.`);
            page++; 
        }
        renderCharacters(allCharacters); 

    } catch (error) {
        console.error("Error al obtener los personajes:", error);
    }
}

// Función para mostrar los personajes
function renderCharacters(characters) {
    main.textContent = ''; 

    characters.forEach(element => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add("character");

        characterDiv.innerHTML = `
            <h2 class="name">${element.name}</h2>
            <p class="ki"><strong>Ki:</strong> ${element.ki}</p>
            <p class="maxKi"><strong>MaxKi:</strong> ${element.maxKi}</p>
            <p class="race"><strong>Race:</strong> ${element.race}</p>
            <p class="gender"><strong>Gender:</strong> ${element.gender}</p>
            <img class="image" src="${element.image}" alt="${element.name}">`;

        main.appendChild(characterDiv);
    });
}

dragonballCharacters(); 

