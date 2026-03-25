# YonoB WCM Theme

**Drupal 11 custom theme** for the YonoB Wealth & Capital Management platform.

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Grid, components, utilities |
| jQuery UI | 1.14 | Date picker, widgets |
| Owl Carousel | Latest | Testimonials, carousels |
| Bootstrap Datepicker | Latest | Date input fields |
| DataTables + BS5 | Latest | Sortable, searchable tables |
| Masonry | Latest | Masonry/grid layout |
| Chart.js | 3.7.1 | Dashboard charts |
| Chartjs Doughnut Plugin | — | Doughnut label overlay |
| Roboto Variable Font | — | Primary typography |

---

## Directory Structure

```
yonob_wcm_theme/
│
├── yonob_wcm_theme.info.yml         ← Theme declaration
├── yonob_wcm_theme.libraries.yml    ← Asset library definitions
├── yonob_wcm_theme.theme            ← PHP preprocess hooks
├── yonob_wcm_theme.breakpoints.yml  ← Bootstrap 5 responsive breakpoints
│
├── css/
│   ├── bootstrap-5.3.3.min.css
│   ├── bootstrap-datepicker.in.css
│   ├── dataTable-bootstrap5.css
│   ├── jquery-ui.css
│   ├── owl.carousel.min.css
│   ├── owl.theme.default.min.css
│   ├── yb-pre-login.css             ← Your existing custom CSS
│   └── yb-custom-overrides.css      ← Theme design tokens & overrides
│
├── js/
│   ├── bootstrap-5.3.3.min.js
│   ├── bootstrap-datepicker.in.js
│   ├── datatable-bootstrap5.js
│   ├── jquery-ui-1.14.js
│   ├── masonry.pkgd.min.js
│   ├── owl.carousel.min.js
│   ├── yb-pre-login.js              ← Custom Drupal.behaviors JS
│   └── chart-3.7.1/
│       ├── chart.min.js
│       └── chartjs-plugin-doughnutlabel.js
│
├── fonts/                           ← Roboto variable fonts
├── images/                          ← Theme images, logo, favicon
│
├── config/
│   └── install/
│       └── system.theme.global.yml  ← Logo / favicon defaults
│
└── templates/
    ├── layout/
    │   ├── html.html.twig           ← Outer HTML document
    │   ├── page.html.twig           ← Default page layout
    │   └── page--node--homepage.html.twig ← Full-width homepage
    ├── block/
    │   ├── block.html.twig          ← Generic block fallback
    │   └── block--system-branding-block.html.twig ← Logo/site name
    ├── navigation/
    │   └── menu--main.html.twig     ← Bootstrap 5 navbar + dropdowns
    ├── node/
    │   ├── node.html.twig           ← Generic node fallback
    │   ├── node--homepage.html.twig ← Homepage with all sections
    │   └── node--article--full.html.twig ← Article detail page
    └── misc/
        └── status-messages.html.twig ← Bootstrap alerts
```

---

## Installation

### 1. Copy vendor assets

Copy your existing CSS/JS files into the `css/` and `js/` directories (see structure above).

```
# Copy CSS files
copy path\to\your\css\*.css web\themes\custom\yonob_wcm_theme\css\

# Copy JS files
copy path\to\your\js\*.js web\themes\custom\yonob_wcm_theme\js\
copy path\to\your\js\chart-3.7.1\* web\themes\custom\yonob_wcm_theme\js\chart-3.7.1\

# Copy fonts / images
copy path\to\fonts\* web\themes\custom\yonob_wcm_theme\fonts\
copy path\to\images\* web\themes\custom\yonob_wcm_theme\images\
```

### 2. Enable the theme

```bash
# Via Drush
drush theme:enable yonob_wcm_theme
drush config:set system.theme default yonob_wcm_theme
drush cr
```

Or go to `/admin/appearance` and click **Install and set as default**.

### 3. Clear caches

```bash
drush cr
```

---

## Libraries Reference

| Library key | Use case |
|---|---|
| `yonob_wcm_theme/global-styling` | Loaded on every page (all CSS) |
| `yonob_wcm_theme/global-scripts` | Loaded on every page (all JS) |
| `yonob_wcm_theme/chart` | Attach on pages with charts |
| `yonob_wcm_theme/datatable` | Attach on pages with tables |
| `yonob_wcm_theme/owl-carousel` | Attach on pages with carousels |

**Attaching in Twig:**
```twig
{{ attach_library('yonob_wcm_theme/chart') }}
```

**Attaching in PHP preprocess:**
```php
$variables['#attached']['library'][] = 'yonob_wcm_theme/chart';
```

---

## Node Template Suggestions

Drupal will look for templates in this order (most specific first):

| Template | When used |
|---|---|
| `node--homepage--full.html.twig` | Homepage in full view mode |
| `node--homepage.html.twig` | Any homepage view mode |
| `node--article--full.html.twig` | Article in full view mode |
| `node--article.html.twig` | Any article view mode |
| `node.html.twig` | All other nodes |

---

## Adding New Content Type Templates

1. Create `templates/node/node--YOUR_TYPE.html.twig`
2. Run `drush cr`
3. Drupal will automatically pick up the new template

---

## Drupal 11 Best Practices Applied

- ✅ `base_theme: false` — standalone, no Stable/Classy dependency
- ✅ Named asset libraries with defined dependencies
- ✅ `once()` used in JavaScript (replaces `$.once()`)
- ✅ `Drupal.behaviors` pattern for AJAX compatibility
- ✅ Template suggestions via `hook_theme_suggestions_*_alter()`
- ✅ Preview mode support via `is_preview` variable
- ✅ CSS custom properties for design tokens
- ✅ Accessibility: skip link, ARIA roles, semantic HTML5
- ✅ Responsive breakpoints registered for picture elements
