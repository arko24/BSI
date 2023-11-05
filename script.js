// Fungsi untuk menghilangkan layar loading dan menampilkan pertanyaan pertama
function hideLoadingAndShowQuestions() {
    const loadingScreen = document.getElementById('loading-screen');
    const questionContainer = document.getElementById('question1');

    loadingScreen.style.display = 'none';
    questionContainer.style.display = 'block';

    showQuestion(1);
}

// Simulasikan tampilan loading selama beberapa detik (gantilah ini dengan logika sesungguhnya)
setTimeout(hideLoadingAndShowQuestions, 5000); // Ubah 2000 menjadi waktu yang sesuai

// Inisialisasi variabel global
let totalPoints = 0;
const selectedAnswers = {};

// Fungsi untuk mengatur animasi teks
function revealLetters(textContainer) {
    // Ambil teks pertanyaan dari kontainer
    let text = textContainer.innerText;

    // Kosongkan konten dari elemen <h3>
    textContainer.innerText = "";

    // Iterasi melalui setiap huruf dalam teks dan tambahkan setiap huruf dalam sebuah <span>
    for (let i = 0; i < text.length; i++) {
        let letterSpan = document.createElement("span");
        letterSpan.innerText = text[i];
        textContainer.appendChild(letterSpan);
    }

    let spans = textContainer.querySelectorAll("span");
    let currentLetter = 0;

    function showNextLetter() {
        if (currentLetter < spans.length) {
            spans[currentLetter].style.opacity = 1;
            currentLetter++;
            setTimeout(showNextLetter, 50); // Ubah durasi sesuai kebutuhan
        }
    }

    showNextLetter();
}

// Fungsi untuk menampilkan pertanyaan baru dan panggil revealLetters
function showQuestion(questionNumber) {
    for (let i = 1; i <= 5; i++) {
        const questionContainer = document.getElementById(`question${i}`);
        if (i === questionNumber) {
            questionContainer.style.display = 'block';
            const textContainer = questionContainer.querySelector("#animated-text");
            
            // Panggil fungsi revealLetters() setiap kali pertanyaan baru ditampilkan
            revealLetters(textContainer);
        } else {
            questionContainer.style.display = 'none';
        }
    }
}

// Fungsi untuk memilih jawaban
function selectAnswer(questionNumber, answer, points) {
    selectedAnswers[questionNumber] = { answer, points };
    const labels = document.querySelectorAll(`[for^="question${questionNumber}-"]`);
    labels.forEach((label) => {
        label.classList.remove('selected');
    });

    const selectedLabel = document.querySelector(`[for="question${questionNumber}-${answer}"]`);
    selectedLabel.classList.add('selected');
}

// Fungsi untuk menampilkan jawaban
function showAnswer(questionNumber) {
    const questionContainer = document.getElementById(`question${questionNumber}`);
    const answerContainer = document.getElementById(`answer${questionNumber}`);

    questionContainer.style.display = 'none';

    if (questionNumber < 5) {
        showQuestion(questionNumber + 1);
    } else {
        calculateTotalPoints();

        document.getElementById('total-points').textContent = totalPoints;
        const resultContainer = document.getElementById('answer5');
        resultContainer.style.display = 'block';

        // Determine the result based on the total points
        let imageSrc;
        if (totalPoints <= 8) {
            imageSrc = 'Konservatif.jpg';
        } else if (totalPoints >= 9 && totalPoints <= 16) {
            imageSrc = 'Moderate.jpg';
        } else if (totalPoints >= 17 && totalPoints <= 24) {
            imageSrc = 'Agresif.jpg';
        }

        // Check if the screen width is less than or equal to a specific value (e.g., 768px)
        if (window.innerWidth <= 768) {
            imageSrc = imageSrc.replace('.jpg', '2.jpg');
        }

        window.location.href = imageSrc;
        resultContainer.innerHTML = resultText;
    }
}

// Fungsi untuk menghitung total poin
function calculateTotalPoints() {
    for (let i = 1; i <= 5; i++) {
        if (selectedAnswers[i]) {
            totalPoints += selectedAnswers[i].points;
        }
    }
}

// Tampilkan pertanyaan pertama saat halaman dimuat
showQuestion(1);
