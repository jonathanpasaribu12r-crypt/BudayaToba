const mongoose = require('mongoose');

const HomepageSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        badgeText: {
            type: String,
            default: 'ᯂᯬᯒᯘ᯲'
        },
        welcomeText: {
            type: String,
            default: 'Horas! Selamat Datang'
        },
        title: {
            type: String,
            default: 'Jelajahi Kekayaan Budaya Batak'
        },
        description: {
            type: String,
            default: 'Temukan keindahan tradisi, seni, kuliner, dan warisan budaya Batak yang memperkaya Indonesia.'
        },
        button1Text: {
            type: String,
            default: 'Mulai Perjalanan'
        },
        button1Link: {
            type: String,
            default: '#eksplorasi'
        },
        button2Text: {
            type: String,
            default: 'Tonton Video'
        },
        button2Link: {
            type: String,
            default: '#video-section'
        },
        stats: [
            {
                number: { type: String, default: '300+' },
                label: { type: String, default: 'Marga Batak' }
            },
            {
                number: { type: String, default: '50+' },
                label: { type: String, default: 'Jenis Ulos' }
            },
            {
                number: { type: String, default: '100+' },
                label: { type: String, default: 'Situs Budaya' }
            }
        ],
        imageUrl: {
            type: String,
            default: '/uploads/homepage/ulos-hero.jpg'
        },
        imageTag: {
            type: String,
            default: 'Ulos Batak'
        }
    },

    // Eksplorasi Section
    eksplorasi: {
        subtitle: {
            type: String,
            default: 'Kearifan Lokal'
        },
        title: {
            type: String,
            default: 'Eksplorasi Budaya Batak'
        },
        description: {
            type: String,
            default: 'Pelajari berbagai aspek budaya Batak melalui kategori berikut:'
        },
        cards: [
            {
                icon: { type: String, default: 'fas fa-users' },
                title: { type: String, default: 'Tradisi & Upacara' },
                description: { type: String, default: 'Mempelajari berbagai upacara adat Batak seperti pernikahan, kematian, mangongkal holi, dan upacara syukuran.' },
                link: { type: String, default: 'tradisi.html' },
                linkText: { type: String, default: 'Selengkapnya' },
                active: { type: Boolean, default: true }
            },
            {
                icon: { type: String, default: 'fas fa-paint-brush' },
                title: { type: String, default: 'Seni & Kerajinan' },
                description: { type: String, default: 'Menjelajahi keindahan tenun ulos, ukiran gorga, aksesoris tradisional, dan seni musik gondang.' },
                link: { type: String, default: 'seni.html' },
                linkText: { type: String, default: 'Selengkapnya' },
                active: { type: Boolean, default: true }
            },
            {
                icon: { type: String, default: 'fas fa-utensils' },
                title: { type: String, default: 'Kuliner Tradisional' },
                description: { type: String, default: 'Mengenal berbagai hidangan khas Batak seperti Saksang, Naniura, Mie Gomak, Arsik, dan Dengke Mas na Niura.' },
                link: { type: String, default: 'kuliner.html' },
                linkText: { type: String, default: 'Selengkapnya' },
                active: { type: Boolean, default: true }
            },
            {
                icon: { type: String, default: 'fas fa-landmark' },
                title: { type: String, default: 'Warisan Budaya' },
                description: { type: String, default: 'Mengunjungi situs-situs bersejarah seperti Rumah Bolon, Makam Raja-raja, Danau Toba, dan Museum Batak.' },
                link: { type: String, default: 'warisan.html' },
                linkText: { type: String, default: 'Selengkapnya' },
                active: { type: Boolean, default: true }
            }
        ]
    },

    // Statistik Section
    statistik: {
        items: [
            {
                number: { type: String, default: '300+' },
                label: { type: String, default: 'Marga Batak' },
                description: { type: String, default: 'Sub-suku dan klan' }
            },
            {
                number: { type: String, default: '50+' },
                label: { type: String, default: 'Jenis Ulos' },
                description: { type: String, default: 'Kain tenun tradisional' }
            },
            {
                number: { type: String, default: '100+' },
                label: { type: String, default: 'Makanan Tradisional' },
                description: { type: String, default: 'Kuliner khas Batak' }
            },
            {
                number: { type: String, default: '20+' },
                label: { type: String, default: 'Situs Warisan' },
                description: { type: String, default: 'Cagar budaya' }
            }
        ]
    },

    // Ulos Feature Section
    ulosFeature: {
        subtitle: {
            type: String,
            default: 'Kain Sakral Batak'
        },
        title: {
            type: String,
            default: 'Filosofi Ulos'
        },
        quote: {
            type: String,
            default: '"Ijuk pangihot ni hodong, ulos pangihot ni holong"'
        },
        description: {
            type: String,
            default: 'Ulos bukan sekadar kain tenun biasa. Dalam falsafah hidup orang Batak, Ulos melambangkan kasih sayang, restu, perlindungan, dan ikatan batin antara pemberi dan penerima. Setiap helai benang yang ditenun mengandung doa dan harapan.'
        },
        filosofi: [
            {
                icon: { type: String, default: 'fas fa-heart' },
                title: { type: String, default: 'Kasih Sayang' }
            },
            {
                icon: { type: String, default: 'fas fa-shield-alt' },
                title: { type: String, default: 'Perlindungan' }
            },
            {
                icon: { type: String, default: 'fas fa-crown' },
                title: { type: String, default: 'Penghormatan' }
            },
            {
                icon: { type: String, default: 'fas fa-pray' },
                title: { type: String, default: 'Restu & Doa' }
            }
        ],
        buttonText: {
            type: String,
            default: 'Pelajari Tentang Ulos'
        },
        buttonLink: {
            type: String,
            default: 'ulos.html'
        },
        imageUrl: {
            type: String,
            default: '/uploads/homepage/ulos-feature.jpg'
        }
    },

    // Footer
    footer: {
        aboutText: {
            type: String,
            default: 'Melestarikan dan memperkenalkan kekayaan budaya Batak kepada dunia. "Horas jala gabe ma di hita saluhutna" - Semoga kita semua selamat dan berhasil.'
        },
        address: {
            type: String,
            default: 'Medan, Sumatera Utara'
        },
        phone: {
            type: String,
            default: '+62 61 1234 5678'
        },
        email: {
            type: String,
            default: 'info@budayabatak.com'
        },
        workingHours: {
            type: String,
            default: 'Senin - Jumat: 08:00 - 17:00<br>Sabtu: 09:00 - 14:00'
        },
        socialLinks: {
            facebook: { type: String, default: '#' },
            instagram: { type: String, default: '#' },
            youtube: { type: String, default: '#' },
            tiktok: { type: String, default: '#' }
        }
    },

    // SEO
    seo: {
        title: {
            type: String,
            default: 'Budaya Batak | Warisan Leluhur Sumatera Utara'
        },
        description: {
            type: String,
            default: 'Website resmi untuk memperkenalkan kekayaan budaya Batak kepada masyarakat luas dan wisatawan.'
        },
        keywords: {
            type: String,
            default: 'batak, budaya batak, ulos, tortor, gondang, danau toba, sumatera utara'
        }
    },

    // Metadata
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Homepage', HomepageSchema);