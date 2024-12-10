// Mengimpor modul readline untuk mengambil input dari pengguna
const readline = require('readline');

// Membuat antarmuka readline untuk input dan output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi untuk mencetak papan permainan
function printBoard(board) {
    // Mencetak setiap baris papan
    for (let i = 0; i < 3; i++) {
        console.log(board[i].join(' | ')); // Mencetak simbol pada posisi baris i
        if (i < 2) {
            console.log('---------'); // Mencetak pemisah antar baris
        }
    }
}

// Fungsi untuk memeriksa apakah ada pemenang
function checkWinner(board) {
    // Memeriksa baris dan kolom untuk pemenang
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            return board[i][0]; // Mengembalikan simbol pemenang
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
            return board[0][i]; // Mengembalikan simbol pemenang
        }
    }
    // Memeriksa diagonal untuk pemenang
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
        return board[0][0]; // Mengembalikan simbol pemenang
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
        return board[0][2]; // Mengembalikan simbol pemenang
    }
    return ' '; // Mengembalikan spasi jika tidak ada pemenang
}

// Fungsi untuk mereset papan permainan
function resetBoard() {
    return [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]; // Mengembalikan papan kosong
}

// Fungsi utama untuk menjalankan permainan
function main() {
    let board = resetBoard(); // Inisialisasi papan
    let winner = ' '; // Menyimpan pemenang
    let turn = 0; // Menghitung giliran

    // Fungsi untuk meminta input dari pengguna
    function askForMove() {
        printBoard(board); // Mencetak papan
        rl.question(`Giliran pemain ${turn % 2 === 0 ? 'X' : 'O'} (masukkan baris dan kolom [1-3] atau 0 untuk reset): `, (input) => {
            if (input === '0') {
                board = resetBoard(); // Mereset papan permainan
                turn = 0; // Mengatur ulang giliran
                askForMove(); // Meminta input lagi
                return; // Keluar dari fungsi ini
            }

            const [row, col] = input.split(' ').map(Number); // Mengambil input dari pengguna

            // Mengubah input dari 1-3 menjadi 0-2
            const adjustedRow = row - 1;
            const adjustedCol = col - 1;

            // Memeriksa apakah posisi valid
            if (adjustedRow >= 0 && adjustedRow < 3 && adjustedCol >= 0 && adjustedCol < 3 && board[adjustedRow][adjustedCol] === ' ') {
                board[adjustedRow][adjustedCol] = turn % 2 === 0 ? 'X' : 'O'; // Menentukan simbol pemain
                winner = checkWinner(board); // Memeriksa pemenang setelah setiap langkah
                turn++; // Meningkatkan jumlah giliran
                if (winner === ' ' && turn < 9) {
                    askForMove(); // Meminta input lagi jika belum ada pemenang
                } else {
                    printBoard(board); // Mencetak papan akhir
                    if (winner !== ' ') {
                        console.log(`Pemain ${winner} menang!`); // Mengumumkan pemenang
                    } else {
                        console.log("Permainan berakhir seri!"); // Mengumumkan hasil seri
                    }
                    rl.close(); // Menutup antarmuka readline
                }
            } else {
                console.log("Posisi tidak valid, coba lagi."); // Pesan kesalahan jika posisi tidak valid
                askForMove(); // Meminta input lagi
            }
        });
    }

    askForMove(); // Memulai permainan dengan meminta input pertama
}

// Menjalankan fungsi utama
main(); 