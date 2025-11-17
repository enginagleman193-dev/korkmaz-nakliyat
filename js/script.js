/* ============================================= */
/* TEMEL DOM ELEMENTLERİ */
/* ============================================= */
// Sayfa yüklendiğinde tüm fonksiyonları çalıştır
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader (Yükleniyor Ekranı) Fonksiyonu
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Sayfa tam olarak yüklendiğinde (resimler vb. dahil)
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hidden');
        });
    }

    // 2. Header (Menü) Kaydırma Fonksiyonu
    const header = document.querySelector('.main-header');
    // Sadece .header-transparent class'ına sahip header'ları etkile
    if (header && header.classList.contains('header-transparent')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Ana Sayfa Hero Slider Fonksiyonu
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slider .slide');
        const prevBtn = document.querySelector('.hero-slider-container .prev');
        const nextBtn = document.querySelector('.hero-slider-container .next');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 saniyede bir değişir
        let autoSlide;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            currentSlide = index;
        }

        function nextSlide() {
            let newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            let newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }

        if (slides.length > 0) {
            showSlide(0); // İlk slaytı göster
            autoSlide = setInterval(nextSlide, slideInterval); // Otomatik başlat
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                clearInterval(autoSlide); // Manuel basınca otomatiği durdur
                autoSlide = setInterval(nextSlide, slideInterval); // Yeniden başlat
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                clearInterval(autoSlide); // Manuel basınca otomatiği durdur
                autoSlide = setInterval(nextSlide, slideInterval); // Yeniden başlat
            });
        }
    }

    // 4. AOS (Aşağı Kaydırma Animasyonları) Başlatma
    // AOS kütüphanesi HTML'e eklendiği için burada sadece başlatıyoruz.
    AOS.init({
        duration: 800, // Animasyon süresi (ms)
        once: true, // Sadece bir kez çalışsın
        offset: 50, // Tetiklenme mesafesi
    });

    // 5. Rakamlarla Biz (Sayaç) Fonksiyonu
    const counters = document.querySelectorAll('.stat-item .counter');
    if (counters.length > 0) {
        const speed = 200; // Animasyon hızı (daha küçük = daha hızlı)

        const startCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15); // Her 15ms'de güncelle
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };

        // Sayaçları sadece ekrana geldiklerinde başlatmak için Intersection Observer kullan
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target); // Bir kez çalıştıktan sonra izlemeyi bırak
                }
            });
        }, {
            threshold: 0.5 // %50'si görününce başla
        });

        counters.forEach(counter => {
            counter.innerText = '0'; // Başlangıçta 0 yaz
            observer.observe(counter);
        });
    }
    
    // 6. İş Ortakları (Swiper JS) Slider'ı
    // Swiper kütüphanesi HTML'e eklendiği için burada sadece başlatıyoruz.
    if (document.querySelector('.partners-slider')) {
        new Swiper('.partners-slider', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            slidesPerView: 2, // Mobil için
            spaceBetween: 20,
            breakpoints: {
                // Ekran 640px'den büyükse
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // Ekran 768px'den büyükse
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                // Ekran 1024px'den büyükse
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }
        });
    }

});