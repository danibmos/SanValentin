let currentPage = 1;
const totalPages = 9;
let currentQuizPage = 1;
const totalQuizPages = 20;

document.getElementById('nextButton').addEventListener('click', () => {
    changePage(1);
});

document.getElementById('prevButton').addEventListener('click', () => {
    changePage(-1);
});

function changePage(direction) {
    document.getElementById(`page${currentPage}`).classList.remove('active');
    currentPage += direction;
    document.getElementById(`page${currentPage}`).classList.add('active');

    // Desactivar los botones prev y next si estamos en los extremos
    document.getElementById('prevButton').disabled = currentPage === 1;
    if (currentPage === totalPages) {
        document.getElementById('nextButton').style.display = 'none';  // Ocultar el botón "Siguiente"
    } else {
        document.getElementById('nextButton').style.display = 'inline-block';  // Mostrarlo en otras páginas
    }

}



document.getElementById('nextQuiz').addEventListener('click', () => {
    changeQuizPage(1);
});

document.getElementById('prevQuiz').addEventListener('click', () => {
    changeQuizPage(-1);
});

function changeQuizPage(direction) {
    document.getElementById(`quiz${currentQuizPage}`).classList.remove('active');
    currentQuizPage += direction;
    document.getElementById(`quiz${currentQuizPage}`).classList.add('active');

    document.getElementById('prevQuiz').disabled = currentQuizPage === 1;
    if (currentQuizPage === totalQuizPages) {
        document.getElementById('nextQuiz').style.display = 'none';
        document.getElementById('submitQuiz').style.display = 'inline-block';
    } else {
        document.getElementById('nextQuiz').style.display = 'inline-block';
        document.getElementById('submitQuiz').style.display = 'none';
    }
}

function checkQuiz() {
    const answers = {
        q1: "barbillar",
        q2: "lasagña",
        q3: "2024-12-01",
        q4: "morado",
        q5: "judo",
        q6: "lafavorita",
        q7: "mexico",
        q8: "informatica",
        q9: "18a",
        q10: "merli",
        q11: "uxia",
        q12: "cocacola",
        q13: "gato",
        q14: "tata",
        q15: "altea",
        q16: "sonic2",
        q17: "verano",
        q18: "aleman",
        q19: "capuccino",
        q20: "terminarañocontigo"
    };

    let score = 0;
    let correctAnswers = [];
    let incorrectAnswers = [];
    let unansweredQuestions = [];

    // Comprobar todas las preguntas
    for (let i = 1; i <= 20; i++) {
        if (i !== 3) { // Excluir la pregunta 3 de la verificación especial
            const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);

            if (selectedAnswer) {
                if (selectedAnswer.value === answers[`q${i}`]) {
                    score++;
                    correctAnswers.push(`Pregunta ${i}: Tu respuesta: ${selectedAnswer.value}`);
                } else {
                    incorrectAnswers.push(`Pregunta ${i}: Tu respuesta: ${selectedAnswer.value} - Correcta: ${answers[`q${i}`]}`);
                }
            } else {
                unansweredQuestions.push(`Pregunta ${i}`);
            }
        }
    }

    // Comprobar la pregunta 3 de manera especial
    const anniversaryAnswer = document.getElementById('q3').value;
    if (anniversaryAnswer) {
        if (anniversaryAnswer === answers.q3) {
            score++;
            correctAnswers.push(`Pregunta 3: Tu respuesta: ${anniversaryAnswer}`);
        } else {
            incorrectAnswers.push(`Pregunta 3: Tu respuesta: ${anniversaryAnswer} - Correcta: ${answers.q3}`);
        }
    } else {
        unansweredQuestions.push("Pregunta 3");
    }

    // Mostrar el resultado
    // Función para mostrar un mensaje personalizado según la puntuación del quiz
    function showQuizMessage(score) {
        const quizResult = document.getElementById('quizResult');
        if (score >= 20) {
            quizResult.innerText = `¡Felicidades mi amor! Has acertado todas las preguntas. ¡Una ración doble de besos para esta mujer!`;
        } else if (score > 16) {
            quizResult.innerText = `Mi amor as acertado ${score} de 20 preguntas. ¡Eso es casi perfecto! Te quierooo`;
        }
        else if (score > 10) {
            quizResult.innerText = `Mi amor as acertado ${score} de 20 preguntas. ¡Pensaba que acertarias mas, pero estas aprobada!`;
        } else if (score = 10) {
            quizResult.innerText = `¡Ayayay! Has acertado ${score} de 20 preguntas. ¡Un 5 raspado, como en el instituto!`;
        }
        else {
            quizResult.innerText = `Has acertado ${score} de 20 preguntas. ¡Me esperaba que esto si que lo aprobaras... Te quiero igual!`;
        }
    }

    // Llamar a esta función después de calcular el score en checkQuiz()
    showQuizMessage(score);

    // Mostrar las respuestas correctas
    const correctList = document.getElementById('correctAnswers');
    correctList.innerHTML = '<strong>Respuestas Correctas:</strong>';
    correctAnswers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        correctList.appendChild(li);
    });

    // Mostrar las respuestas incorrectas
    const incorrectList = document.getElementById('incorrectAnswers');
    incorrectList.innerHTML = '<strong>Respuestas Incorrectas:</strong>';
    incorrectAnswers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        incorrectList.appendChild(li);
    });

    // Mostrar las preguntas no respondidas
    const unansweredList = document.getElementById('unansweredQuestions');
    unansweredList.innerHTML = '<strong>Preguntas No Respondidas:</strong>';
    unansweredQuestions.forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        unansweredList.appendChild(li);
    });
}

// Función para calcular el tiempo transcurrido
const startDate = new Date('2024-12-01T00:00:00'); // Fecha de inicio (ejemplo: 14 de febrero de 2023)

function updateElapsedTime() {
    const currentDate = new Date(); // Fecha actual
    const timeDiff = currentDate - startDate; // Diferencia de tiempo en milisegundos

    // Cálculo de años, meses, días, horas, minutos, segundos, centésimas y milisegundos
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const milliseconds = timeDiff % 1000;

    // Mostrar el tiempo transcurrido en el formato deseado
    const timeDisplay = document.getElementById('timeElapsed');
    timeDisplay.innerHTML = `Han pasado: <br>
    ${years} años <br>
    ${months} meses <br>
    ${days} días <br>
    ${hours} horas <br>
    ${minutes} minutos <br>
    ${seconds} segundos <br>
    ${milliseconds} milisegundos`;
}

// Actualizar cada 100 milisegundos para mostrar las centésimas de segundo y milisegundos
setInterval(updateElapsedTime, 1);


document.addEventListener('DOMContentLoaded', function () {
    // Configuración de la galería
    const imagesPerPageGallery = 6; // Número de imágenes por página
    const allImages = [
        "img/fotos/imagen1.jpg",
        "img/fotos/imagen2.jpg",
        "img/fotos/imagen3.jpg",
        "img/fotos/imagen4.jpg",
        "img/fotos/imagen5.jpg",
        "img/fotos/imagen6.jpg",
        "img/fotos/imagen7.jpg",
        "img/fotos/imagen8.jpg",
        "img/fotos/imagen9.jpg",
        "img/fotos/imagen10.jpg",
        "img/fotos/imagen11.gif",
        "img/fotos/imagen12.jpg",
        "img/fotos/imagen13.jpg",
        "img/fotos/imagen14.jpg",
        "img/fotos/imagen15.jpg",
        "img/fotos/imagen16.jpg",
        "img/fotos/imagen17.jpg",
        "img/fotos/imagen18.jpg",
        "img/fotos/imagen19.jpg",
        "img/fotos/imagen20.jpg",
        "img/fotos/imagen21.jpg",
        "img/fotos/imagen22.jpg",
        "img/fotos/imagen23.jpg",
        "img/fotos/imagen24.jpg",
        "img/fotos/imagen25.jpg",
        "img/fotos/imagen26.jpg",
        "img/fotos/imagen27.jpg",
        "img/fotos/imagen28.jpg"
    ];

    let currentPageGallery = 1; // Página actual

    // Función para mostrar las imágenes en la galería con paginación
    function displayGallery() {
        const start = (currentPageGallery - 1) * imagesPerPageGallery;
        const end = start + imagesPerPageGallery;
        const currentImages = allImages.slice(start, end);

        // Mostrar las imágenes en la galería
        const galleryElement = document.getElementById("gallery");
        galleryElement.innerHTML = ""; // Limpiar galería antes de cargar
        currentImages.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = image;
            imgElement.classList.add("thumbnail"); // Añadir clase para miniatura
            imgElement.addEventListener("click", () => openImage(image)); // Hacer clic para abrir la imagen completa

            galleryElement.appendChild(imgElement);
        });

        updatePagination();
    }

    // Función para actualizar la paginación
    function updatePagination() {
        const paginationElement = document.getElementById("pagination");
        const totalPages = Math.ceil(allImages.length / imagesPerPageGallery);

        paginationElement.innerHTML = "";

        // Botón de "Anterior"
        const prevButton = document.createElement("button");
        prevButton.innerText = "Anterior";
        prevButton.disabled = currentPageGallery === 1;
        prevButton.addEventListener("click", () => {
            currentPageGallery--;
            displayGallery();
        });
        paginationElement.appendChild(prevButton);

        // Botones de las páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerText = i;
            pageButton.disabled = i === currentPageGallery;
            pageButton.addEventListener("click", () => {
                currentPageGallery = i;
                displayGallery();
            });
            paginationElement.appendChild(pageButton);
        }

        // Botón de "Siguiente"
        const nextButton = document.createElement("button");
        nextButton.innerText = "Siguiente";
        nextButton.disabled = currentPageGallery === totalPages;
        nextButton.addEventListener("click", () => {
            currentPageGallery++;
            displayGallery();
        });
        paginationElement.appendChild(nextButton);
    }

    // Función para abrir la imagen en su tamaño completo
    function openImage(imageSrc) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const modalImg = document.createElement("img");
        modalImg.src = imageSrc;
        modalContent.appendChild(modalImg);
        modal.appendChild(modalContent);

        // Añadir un fondo oscuro detrás de la imagen
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.addEventListener("click", () => closeModal(modal));

        modal.appendChild(overlay);
        document.body.appendChild(modal);
    }

    // Función para cerrar el modal
    function closeModal(modal) {
        document.body.removeChild(modal);
    }

    // Inicializar la galería
    displayGallery();
});

const noButton = document.getElementById('no');
const siButton = document.getElementById('si');
const respuesta = document.getElementById('respuesta');

// Función para mover y desaparecer el botón "No"
noButton.addEventListener("click", function () {
    this.style.display = "none"; // Hace desaparecer el botón "No" al hacer clic
});

noButton.addEventListener("mouseover", function () {
    this.style.display = "none"; // Hace desaparecer el botón "No" al poner el ratón encima
});

// Función para mostrar la respuesta cuando se hace clic en "Sí"
siButton.addEventListener("click", function () {
    respuesta.innerHTML = "¡Sabía que querías!"; // Cambia el contenido del div
    respuesta.classList.add("positivo"); // Añade clase para dar estilo
    respuesta.style.display = "block"; // Muestra el div con la respuesta
});


// Contraseña correcta
const correctPassword = "660128895"; // Cambia esto por la contraseña que quieras
let attemptsLeft = 3; // Número de intentos disponibles

function checkPassword() {
    const inputPassword = document.getElementById('password-input').value;

    // Verificar si la contraseña es correcta
    if (inputPassword === correctPassword) {
        // Ocultar la pantalla de contraseña
        document.getElementById('password-screen').style.display = 'none';

        // Mostrar el contenido de la página
        document.getElementById('content').style.display = 'block';

        // Activar de nuevo el contenedor de fondo
        document.getElementById('main-container').style.pointerEvents = 'auto';
        document.getElementById('main-container').style.opacity = '1';
    } else {
        attemptsLeft--; // Restar un intento
        document.getElementById('attempts-left').innerText = `Te quedan ${attemptsLeft} intentos`;

        // Si no quedan intentos
        if (attemptsLeft <= 0) {
            redirectToGoogle(); // Redirigir a Google si la contraseña es incorrecta 3 veces
        }
    }
}

function redirectToGoogle() {
    // Redirige a Google después de 3 intentos fallidos
    window.location.href = "https://www.google.com"; // Redirigir a la página de inicio de Google
}

function closePage() {
    window.location.href = "https://www.google.com"; // Redirige a Google
}


// Añadir atajo de teclado para Enter
document.getElementById('password-input').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        checkPassword(); // Llamar a la función checkPassword cuando se presiona Enter
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const audioElements = document.querySelectorAll("audio");
    let currentIndex = Math.floor(Math.random() * audioElements.length); // Selecciona una canción aleatoria al inicio

    function playNextSong() {
        currentIndex = (currentIndex + 1) % audioElements.length;
        audioElements[currentIndex].play();
    }

    audioElements.forEach((audio, index) => {
        audio.addEventListener("ended", playNextSong); // Cuando termine una, suena la siguiente
    });

    // Función para iniciar la música con interacción del usuario (requerido por navegadores modernos)
    function startMusic() {
        audioElements[currentIndex].play();
        document.removeEventListener("click", startMusic); // Solo se necesita una interacción
    }

    document.addEventListener("click", startMusic); // Iniciar música cuando el usuario haga clic en la página
});
