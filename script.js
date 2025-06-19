// URL de la API
const apiUrl = 'https://684aef4c165d05c5d35ae62b.mockapi.io/clubes';

// Función para obtener los datos de la API
async function obtenerClubes() {
    try {
        const respuesta = await fetch(apiUrl);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const clubes = await respuesta.json();
        mostrarClubes(clubes);
    } catch (error) {
        console.error('Error al obtener los clubes:', error);
    }
}

// Función para mostrar los clubes en la cuadrícula
function mostrarClubes(clubes) {
    const lista = document.getElementById('clubes-list');
    clubes.forEach(club => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${club.img}" alt="${club.nombre}">
                <h2>${club.nombre}</h2>
            </div>
            <div class="details">
                <p><strong>Fundación:</strong> ${club.fundacion}</p>
                <p><strong>Estadio:</strong> ${club.estadio}</p>
                <p><strong>Capacidad:</strong> ${club.capacidad}</p>
                <p><strong>Títulos:</strong> ${club.titulos}</p>
            </div>
        `;

        // Evento de clic para mostrar/ocultar detalles
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });

        lista.appendChild(card);
    });
}

// Ejecutar función al cargar
obtenerClubes();