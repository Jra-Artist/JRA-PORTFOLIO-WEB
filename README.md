# JRA Portfolio

## Folder structure

```
portfolio/
├── index.html          ← page content (text, sections)
├── css/style.css       ← all the styling (colors/fonts at the top)
├── js/
│   ├── artworks.js     ← ✏️ ADD YOUR ARTWORKS HERE
│   └── script.js       ← behavior (menu, filter, lightbox) — no need to edit
└── images/             ← put your picture files here
    ├── hero.jpg        ← big featured artwork at the top
    ├── profile.jpg     ← your photo in the About section
    └── (your artworks)
```

## How to add your artwork

1. Copy your image into the `images/` folder.
2. Open `js/artworks.js` and add one line for it (instructions are inside the file).
3. Refresh the page. The gallery and filter buttons update by themselves.

Empty slots show a dashed box with the file name it's waiting for, so you can see exactly where each picture goes.

## Change colors / fonts

Open `css/style.css` and edit the values inside `:root { ... }` at the top.

## Run it

Just double-click `index.html`. To publish for free, upload the whole folder to Netlify, GitHub Pages, or Vercel.
