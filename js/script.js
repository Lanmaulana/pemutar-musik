document.addEventListener('DOMContentLoaded', () => {
    
    // --- [KODE BARU UNTUK MEMBUAT PARTIKEL] ---
    const animationContainer = document.querySelector('.animation-container');
    const numberOfParticles = 30; // Jumlah partikel

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Atur posisi, ukuran, dan durasi animasi secara acak
        const size = Math.random() * 7 + 3; // Ukuran antara 3px - 10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`; // Posisi horizontal acak
        
        const duration = Math.random() * 15 + 10; // Durasi animasi antara 10s - 25s
        particle.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 10; // Penundaan animasi acak
        particle.style.animationDelay = `${delay}s`;

        animationContainer.appendChild(particle);
    }
    // --- [AKHIR KODE BARU] ---


    // Referensi Elemen DOM (sisa kode tetap sama)
    const songCover = document.getElementById('song-cover');
    const songTitle = document.getElementById('song-title');
    // ... sisa kode JavaScript Anda tidak perlu diubah ...
    const songArtist = document.getElementById('song-artist');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioSource = document.getElementById('audio-source');
    const playlistEl = document.getElementById('playlist');
    const backgroundContainer = document.querySelector('.background-container');

    // Daftar Lagu (Ganti dengan lagu dan gambar Anda)
    const songs = [
        {
            title: 'NEFFEX - Get Through',
            artist: 'NEFFEX',
            src: 'ms/NEFFEX - Get Through.mp3',
            cover: 'img/Neffex.jpg'
        },
        {
            title: 'Justin Bieber - Baby ft',
            artist: 'Justin Bieber',
            src: 'ms/Justin Bieber - Baby ft.mp3',
            cover: 'img/Justin.jpg'
        },
        {
            title: 'night changes - one direction  nadine abigail',
            artist: 'Nadine Abigail',
            src: 'ms/night changes - one direction  nadine abigail.mp3',
            cover: 'img/Nadine.jpg'
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // Fungsi untuk memuat lagu
    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songCover.src = song.cover;
        audioSource.src = song.src;
        backgroundContainer.style.backgroundImage = `url(${song.cover})`;
        
        // Highlight lagu yang aktif di playlist
        updatePlaylistActiveState();
    }

    // Fungsi untuk memainkan lagu
    function playSong() {
        isPlaying = true;
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
        songCover.style.transform = 'scale(1.05)';
        audioSource.play();
    }

    // Fungsi untuk memberhentikan lagu
    function pauseSong() {
        isPlaying = false;
        playPauseBtn.classList.add('fa-play');
        playPauseBtn.classList.remove('fa-pause');
        songCover.style.transform = 'scale(1)';
        audioSource.pause();
    }

    // Fungsi untuk lagu sebelumnya
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    // Fungsi untuk lagu berikutnya
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    }
    
    // Update Progress Bar & Waktu
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Update durasi
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
        // Update waktu berjalan
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Format waktu dari detik menjadi menit:detik
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set Progress Bar saat diklik
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioSource.duration;
        audioSource.currentTime = (clickX / width) * duration;
    }

    // Membuat Playlist secara dinamis
    function createPlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;
            li.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="list-cover">
                <div class="list-song-details">
                    <span class="list-song-title">${song.title}</span>
                    <span class="list-song-artist">${song.artist}</span>
                </div>
            `;
            playlistEl.appendChild(li);
        });
    }

    // Update status aktif pada playlist
    function updatePlaylistActiveState() {
        const listItems = document.querySelectorAll('.playlist li');
        listItems.forEach(item => {
            if (parseInt(item.dataset.index) === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audioSource.addEventListener('timeupdate', updateProgress);
    audioSource.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);

    playlistEl.addEventListener('click', (e) => {
        const clickedLi = e.target.closest('li');
        if (clickedLi) {
            currentSongIndex = parseInt(clickedLi.dataset.index);
            loadSong(songs[currentSongIndex]);
            playSong();
        }
    });

    // Inisialisasi
    createPlaylist();
    loadSong(songs[currentSongIndex]);
});