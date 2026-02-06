/*
 * Heavy Equipment Rental & Leasing - Main JS
 */

/* =========================================
   Theme Toggle (Dark/Light)
   ========================================= */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check if theme is already set by head script
    let currentTheme = document.documentElement.getAttribute('data-theme');

    // If not set (fallback), check storage or preference
    if (!currentTheme) {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light';
        }
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    // Update button icon to match current state
    updateToggleIcon(currentTheme === 'dark' ? 'moon' : 'sun');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateToggleIcon('sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcon('moon');
            }
        });
    }
}

function updateToggleIcon(iconType) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    if (iconType === 'moon') {
        themeToggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
        themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
}

/* =========================================
   Mobile Menu
   ========================================= */
function initMobileMenu() {
    const toggler = document.getElementById('navbar-toggler');
    const menu = document.getElementById('nav-menu');

    if (toggler && menu) {
        toggler.addEventListener('click', () => {
            menu.classList.toggle('active');
            const isExpanded = menu.classList.contains('active');
            toggler.setAttribute('aria-expanded', isExpanded);
        });
    }
}

/* =========================================
   Path Helpers
   ========================================= */
// Path Helpers
// Calculate root path based on current location depth
const getRootPath = () => {
    const path = window.location.pathname.toLowerCase();

    // Check for 2-level deep folders (dashboards)
    if (path.includes('/dashboards/admin/') || path.includes('/dashboards/client/')) {
        return '../../';
    }

    // Check for 1-level deep folders (pages)
    if (path.includes('/pages/')) {
        return '../';
    }

    // Default to root
    return '';
};

// Get correct path for assets (images, css, js)
// Always returns path relative to current file location pointing to root assets folder
const getAssetPath = (path) => {
    // If path is external (http/https), return as is
    if (path.startsWith('http')) return path;

    // Clean path: remove any existing ../ or assets/ prefixes to get a clean "assets/..." string
    // We want the input to be treated as "assets/foo.png"
    let cleanPath = path;
    if (cleanPath.startsWith('../assets/')) cleanPath = cleanPath.substring(3);
    if (cleanPath.startsWith('../../assets/')) cleanPath = cleanPath.substring(6);
    if (!cleanPath.startsWith('assets/')) cleanPath = 'assets/' + cleanPath;

    return getRootPath() + cleanPath;
};

// Get correct path for links to other pages
// Assumes input is a filename in 'pages/' OR 'index.html'
const getLinkPath = (page) => {
    if (page === 'index.html') {
        return getRootPath() + 'index.html';
    }

    // For all other pages, they are located in pages/
    // So we need to go to root, then into pages/
    return getRootPath() + 'pages/' + page;
};


/* =========================================
   Equipment Gallery (Public)
   ========================================= */
const equipmentGalleryData = [
    {
        id: 1,
        name: "Cat 320 Excavator",
        category: "Excavators",
        specs: "20 Ton • 160 HP • 22ft Dig Depth",
        price: 450,
        popularity: 90,
        image: "assets/images/cat-320.png",
        available: true
    },
    {
        id: 2,
        name: "Komatsu D65 Dozer",
        category: "Dozers",
        specs: "20 Ton • 205 HP • 3.4m Blade",
        price: 550,
        popularity: 85,
        image: "assets/images/komatsu-d65.png",
        available: true
    },
    {
        id: 3,
        name: "Liebherr LTM Crane",
        category: "Cranes",
        specs: "50 Ton Lift • 120ft Boom",
        price: 1200,
        popularity: 70,
        image: "assets/images/liebherr-crane.png",
        available: true
    },
    {
        id: 4,
        name: "Bobcat S650 Skid Steer",
        category: "Loaders",
        specs: "3.8 Ton • 74 HP • High Flow",
        price: 250,
        popularity: 95,
        image: "assets/images/bobcat-s650.png",
        available: true
    },
    {
        id: 5,
        name: "Hitachi ZX210 Excavator",
        category: "Excavators",
        specs: "22 Ton • 172 HP • 21ft Dig Depth",
        price: 480,
        popularity: 75,
        image: "assets/images/hitachi-zx210.png",
        available: true
    },
    {
        id: 6,
        name: "Cat 950 Wheel Loader",
        category: "Loaders",
        specs: "19 Ton • 250 HP • 4.5 yd³ Bucket",
        price: 600,
        popularity: 80,
        image: "assets/images/cat-950.png",
        available: true
    },
    {
        id: 7,
        name: "JLG 1250AJP Boom Lift",
        category: "Cranes",
        specs: "125ft Height • 1000lb Capacity",
        price: 350,
        popularity: 88,
        image: "assets/images/jlg-boom-lift.png",
        available: true
    },
    {
        id: 8,
        name: "Volvo A40G Hauler",
        category: "Loaders",
        specs: "39 Ton Payload • 469 HP",
        price: 800,
        popularity: 78,
        image: "assets/images/volvo-hauler.png",
        available: true
    },
    {
        id: 9,
        name: "Cat D11 Dozer",
        category: "Dozers",
        specs: "104 Ton • 850 HP • 6.7m Blade",
        price: 1500,
        popularity: 65,
        image: "assets/images/cat-d11-dozer.png",
        available: true
    },
    {
        id: 10,
        name: "Terex RT90 Crane",
        category: "Cranes",
        specs: "90 Ton • Rough Terrain • 47m Boom",
        price: 950,
        popularity: 72,
        image: "assets/images/terex-rt90-crane.png",
        available: true
    },
    {
        id: 11,
        name: "Case 580 Backhoe",
        category: "Excavators",
        specs: "7.5 Ton • 97 HP • loader/Hoe",
        price: 320,
        popularity: 82,
        image: "assets/images/case-580-backhoe.png",
        available: true
    },
    {
        id: 12,
        name: "Liebherr R9800",
        category: "Excavators",
        specs: "800 Ton • 4000 HP • Biggest Dig",
        price: 5000,
        popularity: 50,
        image: "assets/images/liebherr-r9800.png",
        available: false
    },
    {
        id: 13,
        name: "Kobelco SK210 Excavator",
        category: "Excavators",
        specs: "21 Ton • 160 HP • Mid-size",
        price: 460,
        popularity: 78,
        image: "assets/images/kobelco-sk210.png",
        available: true
    },
    {
        id: 14,
        name: "Tadano GR-1000XL Crane",
        category: "Cranes",
        specs: "100 Ton • Rough Terrain • 47m Boom",
        price: 1100,
        popularity: 68,
        image: "assets/images/tadano-gr-1000xl.png",
        available: true
    },
    {
        id: 15,
        name: "Komatsu PC210-11 Excavator",
        category: "Excavators",
        specs: "22 Ton • 165 HP • iMC 2.0",
        price: 475,
        popularity: 85,
        image: "assets/images/komatsu-pc210.png",
        available: true
    },
    {
        id: 16,
        name: "Cat 336 Excavator",
        category: "Excavators",
        specs: "36 Ton • 311 HP • Deep Reach",
        price: 750,
        popularity: 92,
        image: "assets/images/cat-320.png",
        available: true
    },
    {
        id: 17,
        name: "Volvo A45G Articulated Hauler",
        category: "Loaders",
        specs: "45 Ton Payload • 469 HP",
        price: 850,
        popularity: 74,
        image: "assets/images/volvo-hauler.png",
        available: true
    },
    {
        id: 18,
        name: "Case 580N Backhoe",
        category: "Excavators",
        specs: "8 Ton • 97 HP • 4WD",
        price: 340,
        popularity: 80,
        image: "assets/images/case-580-backhoe.png",
        available: true
    },
    {
        id: 19,
        name: "Cat D11T Dozer",
        category: "Dozers",
        specs: "104 Ton • 850 HP • Mining Grade",
        price: 1550,
        popularity: 60,
        image: "assets/images/cat-d11-dozer.png",
        available: true
    },
    {
        id: 20,
        name: "Bobcat T650 Compact Track Loader",
        category: "Loaders",
        specs: "4.3 Ton • 74 HP • Vertical Lift",
        price: 280,
        popularity: 94,
        image: "assets/images/bobcat-s650.png",
        available: true
    }
];

/* =========================================
   Blog System Data
   ========================================= */
const blogPosts = [
    {
        id: 1,
        title: "Top 10 Safety Tips for Excavator Operators",
        category: "Safety",
        date: "Oct 12, 2025",
        author: "John Safety",
        excerpt: "Essential guidelines to ensure safety on the construction site while operating heavy machinery.",
        image: "assets/images/blog-safety.png",
        content: `
            <p>Operating heavy equipment like excavators requires skill, attention to detail, and a strict adherence to safety protocols. Whether you're a seasoned pro or a new operator, reviewing these safety tips can prevent accidents and ensure a smooth project.</p>
            <h3>1. Inspect Before You Operate</h3>
            <p>Before climbing into the cab, always perform a walk-around inspection. Check for fluid leaks, broken lights, and loose bolts.</p>
            <h3>2. Know Your Surroundings</h3>
            <p>Always be aware of what is around you. Use mirrors and cameras to check blind spots, and ensure ground personnel are at a safe distance.</p>
            <h3>3. Use Three Points of Contact</h3>
            <p>When entering or exiting the cab, always maintain three points of contact (two hands and one foot, or two feet and one hand) to prevent slips and falls.</p>
            <blockquote class="p-4 my-4" style="background-color: var(--color-bg-surface); border-left: 4px solid var(--color-primary); font-style: italic;">
                "Safety is not just a checkbox; it's a mindset that saves lives."
            </blockquote>
        `
    },
    {
        id: 2,
        title: "Preventive Maintenance Checklist",
        category: "Maintenance",
        date: "Sep 28, 2025",
        author: "Mark Tech",
        excerpt: "How to keep your leased equipment in top condition to avoid costly downtime.",
        image: "assets/images/blog-maintenance.png",
        content: `
            <p>Maintenance is the key to longevity for any heavy machinery. A well-maintained machine is safer, more efficient, and less likely to break down at a critical moment.</p>
            <h3>1. Daily Fluid Checks</h3>
            <p>Check engine oil, hydraulic fluid, and coolant levels every morning. Low fluids can lead to overheating and catastrophic failure.</p>
            <h3>2. Greasing Moving Parts</h3>
            <p>Ensure all pivot points and joints are properly greased according to the manufacturer's schedule. This reduces wear and tear on expensive pins and bushings.</p>
            <h3>3. Monitoring Filter Health</h3>
            <p>Air and fuel filters should be checked regularly, especially in dusty construction environments. Clean filters mean a happy engine.</p>
        `
    },
    {
        id: 3,
        title: "The Future of Autonomous Construction Vehicles",
        category: "Technology",
        date: "Sep 15, 2025",
        author: "Sarah Future",
        excerpt: "Exploring the impact of AI and robotics on the modern construction site.",
        image: "assets/images/blog-tech.png",
        content: `
            <p>The construction industry is on the brink of a digital revolution. Autonomous vehicles are no longer science fiction—they are appearing on sites around the world.</p>
            <h3>1. Increased Efficiency</h3>
            <p>Autonomous machines can work 24/7 without fatigue, following precise GPS-guided paths for grading and excavation with millimeter accuracy.</p>
            <h3>2. Remote Operation</h3>
            <p>Operators can now control machines from a safe, air-conditioned office miles away from the hazardous environment of a mine or construction site.</p>
            <h3>3. Data Integration</h3>
            <p>Every movement of an autonomous vehicle is tracked and recorded, providing valuable data for project managers to optimize workflows and reduce waste.</p>
        `
    },
    {
        id: 4,
        title: "Hydraulic System Care and Troubleshooting",
        category: "Maintenance",
        date: "Aug 15, 2025",
        author: "Kevin Fluid",
        excerpt: "Keep your machine's muscle in top shape with our guide to hydraulic maintenance and common issue identification.",
        image: "assets/images/cat-320.png",
        content: `
            <p>The hydraulic system is the lifeblood of most heavy equipment. Without it, you have no lifting power, no steering, and no movement. Understanding how to care for this system is vital.</p>
            <h3>1. Check for Leaks Regularly</h3>
            <p>High-pressure oil leaks are not just a maintenance issue; they are a severe safety hazard. Even a pinhole leak can cause serious injury.</p>
            <h3>2. Maintain Fluid Cleanliness</h3>
            <p>Contamination is the #1 killer of hydraulic components. Ensure you are using the correct oil and that filters are changed before they bypass.</p>
            <h3>3. Listen for Unusual Noises</h3>
            <p>Cavitation or aeration in the pump will create distinct whine or knock. Addressing these sounds early can save you from a multi-thousand dollar pump replacement.</p>
        `
    },
    {
        id: 5,
        title: "Workplace Ergonomics for Machinery Operators",
        category: "Safety",
        date: "Jul 22, 2025",
        author: "Emma Comfort",
        excerpt: "Reducing fatigue and injury through better cab setups and operator habits for long shifts on the job site.",
        image: "assets/images/komatsu-pc210.png",
        content: `
            <p>Operating heavy machinery for 8-12 hours a day takes a toll on the body. Proper ergonomics can prevent chronic pain and keep operators alert and safe.</p>
            <h3>1. Adjust Your Seat</h3>
            <p>Ensure your feet reach the pedals comfortably and your back is fully supported. A poorly adjusted seat leads to lower back strain and leg numbness.</p>
            <h3>2. Control Positioning</h3>
            <p>Joysticks and levers should be within easy reach without overextending. Frequent reaching can cause shoulder and neck issues over time.</p>
            <h3>3. Take Regular Breaks</h3>
            <p>Micro-breaks—stepping out of the cab to stretch and reset your eyes—are essential for maintaining focus and reducing muscle stiffness.</p>
        `
    },
    {
        id: 6,
        title: "Telematics: Optimizing Your Rental Fleet",
        category: "Technology",
        date: "Jun 30, 2025",
        author: "David Data",
        excerpt: "Learn how real-time tracking and sensors are revolutionizing heavy equipment management and site productivity.",
        image: "assets/images/dashboard_hero_tech.png",
        content: `
            <p>Modern rental equipment is smarter than ever. Telematics allows both the owner and the lessee to track performance in real-time.</p>
            <h3>1. Fuel Management</h3>
            <p>By monitoring idle time vs. work time, project managers can identify operators who need training or sites that are inefficiently organized.</p>
            <h3>2. Remote Diagnostics</h3>
            <p>Sensors can alert technicians to an issue before the operator even notices a performance drop, allowing for proactive maintenance that prevents downtime.</p>
            <h3>3. Geofencing</h3>
            <p>Setting up virtual boundaries ensures that equipment stays on the intended job site and helps prevent unauthorized use or theft.</p>
        `
    }
];

let galleryFilter = 'all';
let gallerySort = 'popularity';
let currentPage = 1;
const itemsPerPage = 6;

function initEquipmentGallery() {
    const listContainer = document.getElementById('equipment-list');
    if (!listContainer) return; // Only run on equipment page

    // Initial Hash Check
    const hash = window.location.hash;
    if (hash && hash.startsWith('#page-')) {
        const pageNum = parseInt(hash.replace('#page-', ''));
        if (!isNaN(pageNum)) currentPage = pageNum;
    }

    // Hash Change Listener
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash;
        if (newHash && newHash.startsWith('#page-')) {
            const pageNum = parseInt(newHash.replace('#page-', ''));
            if (!isNaN(pageNum) && pageNum !== currentPage) {
                currentPage = pageNum;
                renderGallery();
            }
        }
    });

    // Initial Render
    renderGallery();

    // Filter Listeners (Delegate)
    const filterContainer = document.getElementById('equipment-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            // UI Update
            const allButtons = filterContainer.querySelectorAll('button');
            allButtons.forEach(b => {
                b.classList.remove('btn-primary', 'active');
                b.classList.add('btn-outline');
            });
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary', 'active');

            // Logic Update
            galleryFilter = btn.getAttribute('data-filter');
            currentPage = 1; // Reset to page 1 on filter
            renderGallery();
        });
    }

    // Pagination Listeners
    const paginationContainer = document.querySelector('.mt-5.gap-2');
    if (paginationContainer) {
        paginationContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || btn.classList.contains('disabled')) return;

            const text = btn.textContent.trim();
            if (text === 'Previous') {
                if (currentPage > 1) currentPage--;
            } else if (text === 'Next') {
                const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);
                if (currentPage < totalPages) currentPage++;
            } else {
                const pageNum = parseInt(text);
                if (!isNaN(pageNum)) currentPage = pageNum;
            }

            // Update URL Hash
            window.location.hash = `page-${currentPage}`;

            renderGallery();

            // Scroll to top of list
            listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Sort Listener
    const sortSelect = document.getElementById('equipment-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            gallerySort = e.target.value;
            renderGallery();
        });
    }
}

function getFilteredData() {
    let filtered = equipmentGalleryData.filter(item => {
        if (galleryFilter === 'all') return true;
        return item.category === galleryFilter;
    });

    filtered.sort((a, b) => {
        switch (gallerySort) {
            case 'popularity': return b.popularity - a.popularity;
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            default: return 0;
        }
    });

    return filtered;
}

function renderGallery() {
    const listContainer = document.getElementById('equipment-list');
    if (!listContainer) return;

    const filtered = getFilteredData();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // Clamp current page
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    // Slice for Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filtered.slice(start, end);

    // Render Items
    listContainer.innerHTML = '';
    if (paginatedItems.length === 0) {
        listContainer.innerHTML = '<div class="w-100 text-center py-5 text-muted">No equipment found matching your criteria.</div>';
        renderPagination(0);
        return;
    }

    paginatedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card card-fade-in';

        const badgeHtml = item.available
            ? `<span style="background: var(--color-primary); color: black; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; position: relative; top: 10px; left: 10px;">Available</span>`
            : `<span style="background: #eee; color: #666; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; position: relative; top: 10px; left: 10px;">Rented</span>`;

        card.innerHTML = `
            <div style="aspect-ratio: 16/9; width: 100%; background-color: #eee; border-radius: var(--radius-md); margin-bottom: 1rem; background-image: url('${getAssetPath(item.image)}'); background-size: cover; background-position: center;">
                ${badgeHtml}
            </div>
            <h3 class="h5 mb-1">${item.name}</h3>
            <p class="text-muted small mb-2">${item.specs}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold" style="color: var(--color-primary);">$${item.price} / day</span>
                <a href="${getLinkPath('contact.html')}?inquiry=${encodeURIComponent(item.name)}" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.9rem;">Rent</a>
            </div>
        `;
        listContainer.appendChild(card);
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const paginationContainer = document.querySelector('.mt-5.gap-2');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous
    const prevBtn = document.createElement('button');
    prevBtn.className = `btn btn-outline ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.textContent = 'Previous';
    paginationContainer.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `btn ${currentPage === i ? 'btn-primary active' : 'btn-outline'}`;
        pageBtn.textContent = i;
        paginationContainer.appendChild(pageBtn);
    }

    // Next
    const nextBtn = document.createElement('button');
    nextBtn.className = `btn btn-outline ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.textContent = 'Next';
    paginationContainer.appendChild(nextBtn);
}

/* =========================================
   RTL Toggle
   ========================================= */
function initRTL() {
    // Robust selection for multiple buttons (desktop, mobile, dashboard)
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle');
    const currentDir = localStorage.getItem('dir');

    // Helper to update UI
    const updateUI = (dir) => {
        if (dir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.classList.add('rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.classList.remove('rtl');
        }

        // Update all RTL toggle buttons to use the translate icon
        rtlToggleBtns.forEach(btn => {
            btn.innerHTML = '<i class="bi bi-translate"></i>';
            btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
            // Ensure the button has the premium class
            btn.classList.add('rtl-toggle');
        });
    };

    // Initial Load
    if (currentDir === 'rtl') {
        updateUI('rtl');
    } else {
        updateUI('ltr');
    }

    // Toggle Listener
    rtlToggleBtns.forEach(btn => {
        // Clone node to remove old listeners if needed, or just add new one safely
        // But since we are initing once per page load, single listener is fine.
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                localStorage.setItem('dir', 'ltr');
                updateUI('ltr');
            } else {
                localStorage.setItem('dir', 'rtl');
                updateUI('rtl');
            }
        });
    });
}

/* =========================================
   Testimonial Carousel
   ========================================= */
function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-carousel');
    const indicatorsContainer = document.getElementById('testimonial-indicators');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (!track) return;

    const cards = Array.from(track.children);
    let currentIndex = 0;

    // Helper to get items per view
    const getItemsPerView = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    // Create Indicators
    const updateIndicators = () => {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';
        const itemsPerView = getItemsPerView();
        const totalindicators = Math.ceil(cards.length / itemsPerView);

        for (let i = 0; i < totalindicators; i++) {
            const indicator = document.createElement('button');
            indicator.className = `indicator ${Math.floor(currentIndex / itemsPerView) === i ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                currentIndex = i * itemsPerView;
                if (currentIndex > cards.length - itemsPerView) currentIndex = cards.length - itemsPerView;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        }
    };

    const updateCarousel = () => {
        const itemsPerView = getItemsPerView();

        // Ensure index doesn't overshoot
        if (currentIndex > cards.length - itemsPerView) {
            currentIndex = Math.max(0, cards.length - itemsPerView);
        }

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseInt(getComputedStyle(track).gap) || 0;

        // Calculate offset
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(${isRTL ? offset : -offset}px)`;

        updateIndicators();

        // Update Button States
        if (prevBtn) prevBtn.classList.toggle('disabled', currentIndex === 0);
        if (nextBtn) nextBtn.classList.toggle('disabled', currentIndex >= cards.length - itemsPerView);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const itemsPerView = getItemsPerView();
            if (currentIndex < cards.length - itemsPerView) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    // Initialize
    updateCarousel();

    // Resize Handler
    window.addEventListener('resize', updateCarousel);

    // Auto-play
    let autoPlay = setInterval(() => {
        const itemsPerView = getItemsPerView();
        if (currentIndex < cards.length - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            const itemsPerView = getItemsPerView();
            if (currentIndex < cards.length - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    });
}

/* =========================================
   Blog System
   ========================================= */
function initBlog() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    const searchInput = document.getElementById('blog-search');
    const filterContainer = document.getElementById('blog-filters');

    // Initial state from URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';
    let searchQuery = urlParams.get('search') || '';

    const renderBlog = () => {
        const filtered = blogPosts.filter(post => {
            const matchesCategory = currentCategory === 'all' || post.category.toLowerCase() === currentCategory.toLowerCase();
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        blogList.innerHTML = '';
        if (filtered.length === 0) {
            blogList.innerHTML = '<div class="w-100 text-center py-5 text-muted">No articles found matching your criteria.</div>';
            return;
        }

        filtered.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card card-fade-in';
            card.style.flex = '1';
            card.style.minWidth = '300px';

            card.innerHTML = `
                <div style="height: 200px; background-color: #eee; border-radius: var(--radius-md); margin-bottom: 1rem; background-image: url('${getAssetPath(post.image)}'); background-size: cover; background-position: center;"></div>
                <div class="mb-2">
                    <span class="text-primary small fw-bold">${post.category.toUpperCase()}</span>
                    <span class="text-muted small mx-2">•</span>
                    <span class="text-muted small">${post.date}</span>
                </div>
                <h3 class="mb-2"><a href="${getLinkPath('blog-details.html')}?id=${post.id}">${post.title}</a></h3>
                <p class="text-muted mb-3">${post.excerpt}</p>
                <a href="${getLinkPath('blog-details.html')}?id=${post.id}" class="text-primary fw-bold">Read More →</a>
            `;
            blogList.appendChild(card);
        });

        // Update UI state
        if (searchInput) searchInput.value = searchQuery;
        if (filterContainer) {
            filterContainer.querySelectorAll('button').forEach(b => {
                const isMatch = b.textContent.trim().toLowerCase() === currentCategory;
                b.classList.toggle('btn-primary', isMatch);
                b.classList.toggle('active', isMatch);
                b.classList.toggle('btn-outline', !isMatch);
            });
        }
    };

    // Filter Listeners
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            currentCategory = btn.textContent.trim().toLowerCase();
            renderBlog();
        });
    }

    // Search Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderBlog();
        });
    }

    renderBlog();
}

function initBlogDetails() {
    const detailContainer = document.getElementById('blog-detail-content');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

    // Sidebar Search Logic
    const sidebarSearch = document.querySelector('.card input[placeholder="Search..."]');
    if (sidebarSearch) {
        sidebarSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = `${getLinkPath('blog.html')}?search=${encodeURIComponent(sidebarSearch.value)}`;
            }
        });
    }

    // Populate Headers
    const titleEl = document.getElementById('post-title');
    const categoryEl = document.getElementById('post-category');
    const metaEl = document.getElementById('post-meta');
    const imageEl = document.getElementById('post-image');

    if (titleEl) titleEl.textContent = post.title;
    if (categoryEl) categoryEl.textContent = post.category.toUpperCase();
    if (metaEl) metaEl.textContent = `${post.date} • By ${post.author}`;
    if (imageEl) {
        imageEl.src = getAssetPath(post.image);
        imageEl.alt = post.title;
    }

    // Populate Content
    detailContainer.innerHTML = post.content;

    // Recent Posts Sidebar
    const recentList = document.getElementById('recent-posts-list');
    if (recentList) {
        recentList.innerHTML = blogPosts
            .filter(p => p.id !== post.id)
            .slice(0, 3)
            .map(p => `
                <li>
                    <a href="${getLinkPath('blog-details.html')}?id=${p.id}" class="d-flex gap-3 align-items-center">
                        <div style="width: 60px; height: 60px; background-image: url('${getAssetPath(p.image)}'); background-size: cover; background-position: center; border-radius: var(--radius-sm);"></div>
                        <div>
                            <h6 class="mb-1" style="font-size: 0.9rem;">${p.title}</h6>
                            <small class="text-muted">${p.date}</small>
                        </div>
                    </a>
                </li>
            `).join('');
    }
}

// Initialize all functions when DOM is ready
/* =========================================
   Services Data & System
   ========================================= */
const servicesData = [
    {
        id: 'short-term',
        title: "Short-Term Rental",
        subtitle: "Flexible daily and weekly rental options for your urgent project needs.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
        overview: "Our short-term rental service is designed for contractors and businesses that need heavy machinery for a limited time. Whether it's a day, a week, or a month, we have the fleet to support your productivity.",
        benefits: [
            "Access to the latest models of excavators, dozers, and cranes.",
            "No long-term commitment or depreciation costs.",
            "Full maintenance and support included during the rental period.",
            "Option to add certified operators."
        ],
        pricing: {
            daily: "$350 - $1,200",
            weekly: "$1,200 - $4,000"
        },
        faqs: [
            {
                question: "What documents are required for rental?",
                answer: "We require a valid business license, proof of insurance, and a valid ID for the authorized signer."
            },
            {
                question: "Is delivery included?",
                answer: "Delivery fees depend on the distance from our yard to your job site. We offer competitive rates for transport."
            }
        ]
    },
    {
        id: 'long-term',
        title: "Long-Term Leasing",
        subtitle: "Cost-effective solutions for multi-year projects with full support.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
        overview: "For extended projects lasting six months or more, our long-term leasing program offers significant cost savings and operational stability. We handle the fleet management so you can focus on the job.",
        benefits: [
            "Lower monthly rates compared to short-term rentals.",
            "Dedicated maintenance schedules prioritized for your fleet.",
            "Customizable leasing terms (6, 12, 24, or 36 months).",
            "Option to upgrade equipment mid-lease if project needs change."
        ],
        pricing: {
            daily: "Contact for Quote",
            weekly: "Starting at $800"
        },
        faqs: [
            {
                question: "Can I purchase the equipment at the end of the lease?",
                answer: "Yes, we offer lease-to-own options. Please speak with our sales team for details."
            },
            {
                question: "Who handles major repairs?",
                answer: "All major mechanical repairs are covered by HeavyRent. You are only responsible for daily checks and damage caused by misuse."
            }
        ]
    },
    {
        id: 'operator',
        title: "Operator Services",
        subtitle: "Certified and experienced professionals to man your heavy machinery.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
        overview: "Don't let a lack of skilled personnel slow you down. Our pool of NCCCO-certified operators is ready to step in. Vetted for safety, skill, and professionalism, they ensure your project stays on track.",
        benefits: [
            "NCCCO-certified and insured professionals.",
            "Experienced in various machine types and brands.",
            "Available for temporary or project-based duration.",
            "Strict adherence to safety and site protocols."
        ],
        pricing: {
            daily: "$200 - $500 (Operator Only)",
            weekly: "Contact for Quote"
        },
        faqs: [
            {
                question: "Are your operators insured?",
                answer: "Yes, all our operators are fully insured and covered by workers' compensation."
            },
            {
                question: "Can I hire an operator for my own equipment?",
                answer: "Absolutely. You can hire our operators even if you are not renting equipment from us."
            }
        ]
    },
    {
        id: 'maintenance',
        title: "Maintenance & Repairs",
        subtitle: "Expert servicing to keep your fleet running at peak performance.",
        image: "assets/images/service-maintenance.png",
        overview: "Our state-of-the-art maintenance facilities and mobile service trucks allow us to handle everything from routine oil changes to major engine overhauls. We service all major brands.",
        benefits: [
            "24/7 Mobile Service Units for on-site repairs.",
            "Certified technicians for Cat, Komatsu, Volvo, and more.",
            "Preventative maintenance programs to avoid downtime.",
            "Genuine parts inventory for faster turnaround."
        ],
        pricing: {
            daily: "$150/hr (Labor)",
            weekly: "Custom Maintenance Plans Available"
        },
        faqs: [
            {
                question: "Do you service equipment that wasn't rented from you?",
                answer: "Yes! We offer our maintenance services for customer-owned fleets as well."
            },
            {
                question: "What is your typical response time?",
                answer: "For emergency breakdowns, we aim to be on-site within 2-4 hours depending on location."
            }
        ]
    },
    {
        id: 'logistics',
        title: "Logistics & Transport",
        subtitle: "Heavy haulage solutions to move your machinery safely and on time.",
        image: "assets/images/service-logistics.png",
        overview: "Moving heavy equipment requires specialized trailers and permits. Our logistics team handles the entire process, ensuring your machines arrive at the job site ready to work.",
        benefits: [
            "Fleet of lowboys, flatbeds, and RGN trailers.",
            "Permit acquisition and route planning included.",
            "Oversize load escort services.",
            "Coast-to-coast transport capabilities."
        ],
        pricing: {
            daily: "Distance Based",
            weekly: "Contract Haulage Available"
        },
        faqs: [
            {
                question: "How much notice do you need for a move?",
                answer: "We typically require 48 hours notice for standard loads, and 1 week for oversize loads requiring permits."
            },
            {
                question: "Is my equipment insured during transport?",
                answer: "Yes, we carry comprehensive cargo insurance for all equipment we transport."
            }
        ]
    },
    {
        id: 'consultancy',
        title: "Project Consultancy",
        subtitle: "Expert advice on fleet sizing and site optimization.",
        image: "assets/images/service-consultancy.png",
        overview: "Not sure which machine is right for the job? Our consultants analyze your project requirements to recommend the most efficient and cost-effective equipment mix.",
        benefits: [
            "Site analysis and fleet optimization.",
            "Cost-benefit analysis of renting vs. leasing vs. buying.",
            "Sustainability and fuel efficiency audits.",
            "Safety protocol implementation."
        ],
        pricing: {
            daily: "Free Initial Consultation",
            weekly: "Project Retainers Available"
        },
        faqs: [
            {
                question: "Do you help with bidding?",
                answer: "Yes, we can assist with equipment cost estimation for your project bids."
            },
            {
                question: "Can you train our team?",
                answer: "We offer on-site safety and operational training for your crew."
            }
        ]
    }
];

function initServiceDetails() {
    // Check if we are on the details page by looking for a specific container
    const detailsContainer = document.getElementById('service-details-container');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    // Default to short-term if no ID or invalid ID found
    let service = servicesData.find(s => s.id === serviceId);
    if (!service && !serviceId) {
        service = servicesData[0]; // Default
    } else if (!service) {
        // Handle invalid ID case gracefully
        detailsContainer.innerHTML = `<div class="container py-5 text-center"><h2>Service Not Found</h2><a href="${getLinkPath('services.html')}" class="btn btn-primary mt-3">Return to Services</a></div>`;
        return;
    }

    // Populate Data
    document.title = `${service.title} - Service Details`;

    // Header
    const headerTitle = document.getElementById('service-title');
    const headerSubtitle = document.getElementById('service-subtitle');
    if (headerTitle) headerTitle.textContent = service.title;
    if (headerSubtitle) headerSubtitle.textContent = service.subtitle;

    // Image
    const mainImage = document.getElementById('service-image');
    if (mainImage) {
        mainImage.src = getAssetPath(service.image);
        mainImage.alt = service.title;
    }

    // Overview
    const overview = document.getElementById('service-overview');
    if (overview) overview.textContent = service.overview;

    // Benefits
    const benefitsList = document.getElementById('service-benefits');
    if (benefitsList) {
        benefitsList.innerHTML = service.benefits.map(b => `<li class="mb-2">${b}</li>`).join('');
    }

    // Pricing
    const dailyRate = document.getElementById('price-daily');
    const weeklyRate = document.getElementById('price-weekly');
    if (dailyRate) dailyRate.textContent = service.pricing.daily;
    if (weeklyRate) weeklyRate.textContent = service.pricing.weekly;

    // FAQs
    const faqContainer = document.getElementById('service-faqs');
    if (faqContainer) {
        faqContainer.innerHTML = service.faqs.map(faq => `
            <details class="mb-2" style="background: var(--color-bg-surface); padding: 1rem; border-radius: var(--radius-md);">
                <summary style="font-weight: 600; cursor: pointer;">${faq.question}</summary>
                <p class="mt-2 text-muted">${faq.answer}</p>
            </details>
        `).join('');
    }
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initEquipmentGallery();
    initRTL();
    initTestimonialCarousel();
    initBlog();
    initBlogDetails();
    initServiceDetails();
});
