const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Article = require('./models/Article');
const Gallery = require('./models/Gallery');
const Event = require('./models/Event');
const Wisata = require('./models/Wisata');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Article.deleteMany();
        await Gallery.deleteMany();
        await Event.deleteMany();
        await Wisata.deleteMany();
        
        console.log('Data cleared');
        
        // Create admin user
        const admin = await User.create({
            name: 'Admin Budaya Batak',
            email: 'admin@budayabatak.com',
            password: 'batak123',
            role: 'admin',
            profilePicture: 'default-avatar.png'
        });
        
        console.log('Admin created:', admin.email);
        
        // Create articles
        const articles = await Article.create([
            {
                title: 'Sejarah dan Asal Usul Suku Batak',
                title_en: 'History and Origins of the Batak Tribe',
                slug: 'sejarah-suku-batak',
                content: '<p>Suku Batak adalah salah satu suku bangsa terbesar di Indonesia yang berasal dari Sumatera Utara. Menurut kepercayaan masyarakat Batak, mereka berasal dari daerah Pusuk Buhit di tepi Danau Toba...</p>',
                excerpt: 'Mengenal asal-usul dan sejarah panjang suku Batak dari masa ke masa.',
                category: 'sejarah',
                featuredImage: 'sejarah-batak.jpg',
                author: admin._id,
                tags: ['sejarah', 'asal-usul', 'batak'],
                isPublished: true
            },
            {
                title: 'Filosofi Ulos: Lebih dari Sekadar Kain',
                title_en: 'The Philosophy of Ulos: More Than Just Cloth',
                slug: 'filosofi-ulos',
                content: '<p>Ulos bukan sekadar kain tenun biasa. Dalam adat Batak, ulos melambangkan kasih sayang, restu, dan perlindungan. Ada berbagai jenis ulos dengan makna yang berbeda...</p>',
                excerpt: 'Memahami makna mendalam di balik setiap helai benang ulos Batak.',
                category: 'budaya',
                featuredImage: 'ulos-filosofi.jpg',
                author: admin._id,
                tags: ['ulos', 'tenun', 'filosofi'],
                isPublished: true
            }
        ]);
        
        console.log('Articles created:', articles.length);
        
        // Create gallery
        const gallery = await Gallery.create([
            {
                title: 'Ulos Ragidup',
                description: 'Ulos yang digunakan dalam upacara pernikahan adat Batak',
                imageUrl: 'ulos-ragidup.jpg',
                category: 'ulos',
                uploader: admin._id
            },
            {
                title: 'Rumah Bolon',
                description: 'Rumah adat tradisional Batak Toba',
                imageUrl: 'rumah-bolon.jpg',
                category: 'rumah-adat',
                uploader: admin._id
            },
            {
                title: 'Tarian Tortor',
                description: 'Tarian sakral dalam upacara adat Batak',
                imageUrl: 'tari-tortor.jpg',
                category: 'tarian',
                uploader: admin._id
            }
        ]);
        
        console.log('Gallery created:', gallery.length);
        
        // Create events
        const events = await Event.create([
            {
                title: 'Festival Danau Toba',
                title_en: 'Lake Toba Festival',
                description: 'Perayaan tahunan budaya Batak di tepi Danau Toba',
                location: 'Parapat, Sumatera Utara',
                startDate: new Date('2024-06-15'),
                endDate: new Date('2024-06-20'),
                image: 'festival-toba.jpg',
                category: 'festival',
                organizer: 'Dinas Pariwisata Sumut',
                contact: {
                    phone: '061-1234567',
                    email: 'info@festivaltoba.com',
                    website: 'www.festivaltoba.com'
                },
                isFeatured: true
            },
            {
                title: 'Pameran Ulos Internasional',
                title_en: 'International Ulos Exhibition',
                description: 'Pameran dan workshop tenun ulos dengan peserta dari berbagai negara',
                location: 'Medan, Sumatera Utara',
                startDate: new Date('2024-08-10'),
                endDate: new Date('2024-08-12'),
                image: 'pameran-ulos.jpg',
                category: 'workshop',
                organizer: 'Dewan Kerajinan Nasional',
                contact: {
                    phone: '061-7654321',
                    email: 'ulos@dekrannas.com'
                },
                isFeatured: true
            }
        ]);
        
        console.log('Events created:', events.length);
        
        // Create wisata
        const wisata = await Wisata.create([
            {
                name: 'Danau Toba',
                name_en: 'Lake Toba',
                description: 'Danau vulkanik terbesar di dunia dengan pulau Samosir di tengahnya',
                location: {
                    address: 'Kabupaten Toba Samosir',
                    city: 'Parapat',
                    province: 'Sumatera Utara',
                    coordinates: {
                        lat: 2.6845,
                        lng: 98.8756
                    }
                },
                category: 'alam',
                images: ['danau-toba-1.jpg', 'danau-toba-2.jpg'],
                rating: 4.8,
                totalRatings: 1250,
                facilities: ['Parkir', 'Restoran', 'Penginapan', 'Dermaga'],
                ticketPrice: {
                    adult: 15000,
                    child: 10000,
                    foreign: 50000
                },
                openingHours: {
                    open: '08:00',
                    close: '18:00'
                },
                contact: {
                    phone: '0625-41234',
                    email: 'info@danautoba.com'
                },
                isActive: true
            },
            {
                name: 'Museum Batak TB Silalahi Center',
                name_en: 'TB Silalahi Batak Museum Center',
                description: 'Museum yang menyimpan berbagai koleksi sejarah dan budaya Batak',
                location: {
                    address: 'Jl. Balige - Porsea',
                    city: 'Balige',
                    province: 'Sumatera Utara',
                    coordinates: {
                        lat: 2.3333,
                        lng: 99.0667
                    }
                },
                category: 'sejarah',
                images: ['museum-1.jpg', 'museum-2.jpg'],
                rating: 4.5,
                totalRatings: 450,
                facilities: ['Museum', 'Perpustakaan', 'Kafetaria', 'Toko Souvenir'],
                ticketPrice: {
                    adult: 25000,
                    child: 15000,
                    foreign: 75000
                },
                openingHours: {
                    open: '09:00',
                    close: '17:00'
                },
                contact: {
                    phone: '0632-12345',
                    email: 'info@tbsilalahicenter.com'
                },
                isActive: true
            }
        ]);
        
        console.log('Wisata created:', wisata.length);
        console.log('✅ Database seeding completed!');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();