# Heavy Equipment Rental Template - Documentation

## 1. Installation Guide
This is a static HTML template. No compilation or build step is strictly required to view the files.
1. Unzip the project folder.
2. Open `pages/index.html` in any web browser.

## 2. File Structure
```
project/
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet (Variables, Reset, Components)
│   ├── js/
│   │   ├── main.js        # Global scripts (Theme toggle, Mobile menu)
│   │   └── dashboard.js   # Admin dashboard specific scripts
│   ├── images/            # Image assets
│   └── fonts/             # Font files (if local)
├── pages/
│   ├── index.html         # Main Landing Page
│   ├── home-2.html        # SaaS/Niche Landing Page
│   ├── about.html         # About Us
│   ├── services.html      # Services Listing
│   ├── service-details.html # Service Details
│   ├── equipment.html     # Equipment Catalog
│   ├── blog.html          # Blog Listing
│   ├── blog-details.html  # Blog Post
│   ├── contact.html       # Contact Page
│   ├── pricing.html       # Pricing Page
│   ├── dashboard.html     # Admin Dashboard
│   ├── login.html         # Login Page
│   ├── register.html      # Register Page
│   ├── 404.html           # 404 Error Page
│   └── coming-soon.html   # Maintenance Page
└── documentation/
    └── README.md
```

## 3. Customization Guide
### Colors & Fonts
Open `assets/css/style.css` and find the `:root` section at the top.
Change the `--color-primary` variable to update the main brand color.

### Dark Mode
Dark mode is implemented using the `[data-theme="dark"]` selector in `style.css`.
The toggle logic is in `assets/js/main.js`.

### RTL Support
For RTL (Right-to-Left) languages, add `dir="rtl"` to the `<html>` tag.
Additional RTL adjustments can be added in `style.css` under the `[dir="rtl"]` block.

## 4. Credits
- Fonts: Google Fonts (Inter, Outfit)
- Icons: Unicode symbols (can be replaced with FontAwesome or RemixIcon)
- Images: Unsplash (Placeholders)

## 5. Changelog
- v1.0.0 - Initial Release
