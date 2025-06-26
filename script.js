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
const form = document.getElementById('club-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: form.nombre.value,
        img: form.img.value,
        fundacion: form.fundacion.value,
        estadio: form.estadio.value,
        capacidad: form.capacidad.value,
        titulos: form.titulos.value
    };

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!res.ok) throw new Error('No se pudo agregar el club');

        form.reset(); // Limpiar campos
        document.getElementById('clubes-list').innerHTML = ''; // Limpiar la lista
        obtenerClubes(); // Volver a cargar los clubes

    } catch (error) {
        console.error('Error al agregar el club:', error);
        alert('Ocurrió un error al agregar el club. Intenta nuevamente.');
    }
});
// Mostrar/ocultar formulario
const toggleBtn = document.getElementById('toggle-form-btn');
const formContainer = document.getElementById('form-container');

toggleBtn.addEventListener('click', () => {
    formContainer.classList.toggle('oculto');
    toggleBtn.textContent = formContainer.classList.contains('oculto') 
        ? '➕ Agregar nuevo club' 
        : '✖️ Ocultar formulario';
});

// Vista previa en tiempo real
const preview = {
    nombre: document.getElementById('preview-nombre'),
    img: document.getElementById('preview-img'),
    fundacion: document.getElementById('preview-fundacion'),
    estadio: document.getElementById('preview-estadio'),
    capacidad: document.getElementById('preview-capacidad'),
    titulos: document.getElementById('preview-titulos')
};

form.addEventListener('input', () => {
    preview.nombre.textContent = form.nombre.value || 'Nombre del club';
    preview.img.src = form.img.value || '';
    preview.fundacion.textContent = form.fundacion.value || '-';
    preview.estadio.textContent = form.estadio.value || '-';
    preview.capacidad.textContent = form.capacidad.value || '-';
    preview.titulos.textContent = form.titulos.value || '-';
});
