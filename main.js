// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Load data from backend
async function loadData() {
    try {
        // Test koneksi
        const test = await fetch(`${API_BASE_URL}/test`);
        const testData = await test.json();
        console.log('✅ Backend connected:', testData);
        
        // Load articles
        const articles = await fetch(`${API_BASE_URL}/articles`);
        const articlesData = await articles.json();
        console.log('📚 Articles:', articlesData);
        
        // Load gallery
        const gallery = await fetch(`${API_BASE_URL}/gallery`);
        const galleryData = await gallery.json();
        console.log('🖼️ Gallery:', galleryData);
        
        // Load events
        const events = await fetch(`${API_BASE_URL}/events`);
        const eventsData = await events.json();
        console.log('📅 Events:', eventsData);
        
        // Load wisata
        const wisata = await fetch(`${API_BASE_URL}/wisata`);
        const wisataData = await wisata.json();
        console.log('🏝️ Wisata:', wisataData);
        
    } catch (error) {
        console.error('❌ Backend error:', error);
        console.log('⚠️ Pastikan backend sudah running di port 5000');
    }
}

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submission (untuk halaman kontak)
    const contactForm = document.querySelector('.kontak-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pesan Anda telah terkirim. Horas! Terima kasih telah menghubungi kami.');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih telah berlangganan newsletter Budaya Batak. Horas!');
            this.querySelector('input').value = '';
        });
    }
});

// Video play function (fallback)
function playVideo() {
    // Tidak perlu alert, video langsung diputar dari iframe
    console.log('Video siap diputar');
}