// Ambil elemen dari HTML
const form = document.getElementById("formTugas");
const listTugas = document.getElementById("listTugas");

// Ambil data tugas dari localStorage kalau ada
let tugasList = JSON.parse(localStorage.getItem("tugasList")) || [];

// Fungsi menampilkan daftar tugas
function tampilkanTugas() {
  listTugas.innerHTML = ""; // Kosongkan dulu
  tugasList.forEach((tugas, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <span><strong>${tugas.namaTugas}</strong></span>
        <span>${tugas.mataPelajaran}</span>
        <span>📅 ${tugas.tanggalDeadline}</span>
      </div>
      <button class="hapus" data-index="${index}">❌</button>
    `;
    listTugas.appendChild(li);
  });

  // Tombol hapus
  const hapusButtons = document.querySelectorAll(".hapus");
  hapusButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      hapusTugas(index);
    });
  });
}

// Fungsi tambah tugas baru
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const namaTugas = document.getElementById("namaTugas").value;
  const mataPelajaran = document.getElementById("mataPelajaran").value;
  const tanggalDeadline = document.getElementById("tanggalDeadline").value;

  if (namaTugas && mataPelajaran && tanggalDeadline) {
    const tugasBaru = {
      namaTugas,
      mataPelajaran,
      tanggalDeadline
    };

    tugasList.push(tugasBaru);
    simpanKeLocalStorage();
    tampilkanTugas();

    form.reset();
  }
});

// Fungsi hapus tugas
function hapusTugas(index) {
  tugasList.splice(index, 1);
  simpanKeLocalStorage();
  tampilkanTugas();
}

// Fungsi simpan ke localStorage
function simpanKeLocalStorage() {
  localStorage.setItem("tugasList", JSON.stringify(tugasList));
}

// Tampilkan tugas saat halaman dibuka
tampilkanTugas();
