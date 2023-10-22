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
        let resultText = '';
        if (totalPoints <= 8) {
            resultText = `
                <p>Profil Resiko: Conservative</p>
                <p>Produk: Deposito Berjangka dan Reksa Dana Pasar Uang</p>
                <ul>
                    Saya adalah investor dengan tipe konservatif. Saya memiliki profil risiko yang
                    rendah dan cenderung menghindari risiko (risk averse). Saat Saya berinvestasi, Saya
                    lebih menyukai instrumen investasi yang aman dan takut jika pokok investasi (modal
                    awal) akan berkurang atau mengalami penurunan. Saya juga merasa nyaman dengan
                    instrumen investasi yang imbal hasilnya tidak terlalu besar tetapi bergerak stabil.
                    <br>
                    <br>
                    BSI Merekomendasikan produk berupa :
                    <br>•   Deposito Syariah
                    <br>•   Reksa Dana Syariah Pasar Uang
                    <br>•   Reksa Dana Pendapatan Tetap
                    <br>    
                    <br>Ini adalah produk reksa dana Syariah pasar uang yang bisa Saya investasikan
                    <br>•   Mandiri Pasar Uang Syariah (MPUS)
                    <br>•   Bahana Likuid Syariah (BLS) Kelas G
                    <br>•   Manulife Dana Kas Syariah (MDKS)
                    <br>•   Sucorinvest Sharia Money Market Fund
                    <br>•   Trimegah Kas Syariah
                    <br>•   Mandiri Investa Dana Syariah (MIDSYA)
                    <br>•   Bahana MES Syariah Fund (MES)
                    <br>•   Sucorinvest Sharia Sukuk Fund
                    <br>•   Manulife Syariah Sukuk Indonesia (MSSI)
                    <br>•   Bahana MES Syariah Fund Kelas I (BMES I)
                    <br>•   Bahana USD Nadhira Sukuk
                    <br>
                    <br>Personality 
                    <br>•   Sedikit demi sedikit lama – lama jadi bukit
                    <br>•   Risk Averse
                    <br>•   Rules No 1. Never Lose Your Money, Rules No. 2 Never Forget Rules No 1
                </ul>
            `;
        } else if (totalPoints >= 9 && totalPoints <= 16) {
            resultText = `
                <p>Profil Resiko: Moderate</p>
                <p>Produk:</p>
                <li>         Reksa Dana Pendapatan Tetap/Obligasi</li>
                <li>         Reksa Dana Terproteksi</li>
                <li>         Sukuk Negara Ritel</li>
                <ul>
                    Saya memiliki profile risiko moderat (sedang) ini memliki karakteristik yang siap menerima fluktuasi jangka pendek dengan potensi keuntungan yang diharapkan dapat lebih tinggi dari inflasi dan deposito.
                    <br>
                    <br>BSI Merekomendasikan produk berupa :
                    <br>•   Reksa Dana Syariah Pendapatan Tetap
                    <br>•   Reksa Dana Syariah Terproteksi
                    <br>•   Reksa Dana Campuran
                    <br>•   Sukuk Negara (Sukuk Ritel, Sukuk Tabungan, dan PBS)
                    <br>
                    <br>Ini adalah produk reksa dana Syariah pasar uang yang bisa Saya investasikan
                    <br>•   Mandiri Investa Dana Syariah (MIDSYA)
                    <br>•   Bahana MES Syariah Fund (MES)
                    <br>•   Sucorinvest Sharia Sukuk Fund
                    <br>•   Manulife Syariah Sukuk Indonesia (MSSI)
                    <br>•   Bahana MES Syariah Fund Kelas I (BMES I)
                    <br>•   Bahana USD Nadhira Sukuk 
                    <br>•   Mandiri Investa Syariah Berimbang (MISB)
                    <br>•   TRIM Syariah Berimbang
                    <br>
                    <br>Personality 
                    <br>•   Pelan tapi pasti
                    <br>•   Bang Bing Bung Yuk Kita Nabung
                    <br>•   Comfort Zone <li>
                </ul>
            `;
        } else if (totalPoints >= 17 && totalPoints <= 24) {
            resultText = `
                <p>Profil Resiko: Aggressive</p>
                <p>Produk:</p>
                    <li>Reksa Dana Saham</li>
                    <li>Reksa Dana Indeks</li>
                    <li>Reksa Dana Campuran</li>
                <ul> Saya memiliki profil risiko agresif sangat siap untung dan juga siap rugi (risk taker). Saya siap kehilangan sebagian besar bahkan seluruh dana investasinya demi imbal hasil yang besar.
                <br>
                <br>BSI Merekomendasikan produk berupa :
                <br>•   Reksa Dana Syariah Saham
                <br>•   Reksa Dana Syariah Campuran
                <br>
                <br>Ini adalah produk reksa dana Syariah pasar uang yang bisa Saya investasikan
                <br>•   Mandiri Investa Atraktif Syariah (MITRAS)
                <br>•   BNP Paribas Pesona Syariah (BPPS)
                <br>•   Bahana Icon Syariah (ICON Syariah)
                <br>•   Manulife Syariah Sektoral Amanah Kelas A (MSSA)
                <br>•   Batavia Dana Saham Syariah
                <br>•   Trimegah Saham Syariah
                <br>•   Mandiri Investa Syariah Berimbang (MISB)
                <br>•   TRIM Syariah Berimbang
                <br>
                <br>Personality 
                <br>•   Im risk taker
                <br>•   High Risk, High Return
                </ul>
            `;
        }

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
