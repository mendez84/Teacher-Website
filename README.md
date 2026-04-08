# Mr. Mendez — Teacher Portfolio Site

Personal website and classroom hub for Mario Mendez, Math Teacher at Palm Springs Unified School District.

Built with plain HTML, CSS, and JavaScript — no frameworks, no dependencies, no build tools. Edit any file with any editor or AI assistant.

## Structure

```
mendez-site/
├── index.html       ← All page content and sections
├── style.css        ← All styles and design tokens
├── script.js        ← Nav, animations, portfolio toggle
├── assets/          ← Images and media (add yours here)
└── README.md        ← This file
```

## How to customize

**Change the accent color:**  
Open `style.css` and change `--accent: #2979d9;` to any hex color.

**Add your photo:**  
Drop your image in the `assets/` folder, then in `index.html` replace the placeholder div with:
```html
<img src="assets/your-photo.jpg" alt="Mr. Mendez" style="width:100%; border-radius: 12px;" />
```

**Update class info:**  
In `index.html`, find the `announcement` div and update the text for the current class/session.

**Turn on the Portfolio section:**  
The portfolio section is hidden by default (only shows during job application season).  
To activate it, visit your site with `?portfolio=true` at the end of the URL.  
Or open `index.html` and change `<body>` to `<body class="portfolio-mode">`.

## Hosting on GitHub Pages

1. Push this folder to a GitHub repo named `yourusername.github.io`
2. Go to Settings → Pages → Source: Deploy from branch → main
3. Your site will be live at `https://yourusername.github.io`

For a custom domain (like mrmendez.com):
- Add a file called `CNAME` to the repo containing just your domain name
- Point your domain's DNS to GitHub Pages (Namecheap instructions vary)

## Built with intention

- No frameworks or libraries
- Mobile responsive
- Dark mode by design
- Accessible and fast
- Edit with any LLM or by hand
