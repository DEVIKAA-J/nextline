# Nextline Media

> A student-driven digital publication sharing ideas, stories, and perspectives that matter in today's world.

🌐 **Live Site:** [nextline-three.vercel.app](https://nextline-three.vercel.app)

---

## What is Nextline?

Nextline Media is an independent digital publication built for students, young writers, and anyone with a perspective. We cover current affairs, politics, history, society, culture, and personal opinions, with no gatekeeping and no paywalls.

Founded in 2026, based in India, with a vision to grow as a global platform for emerging voices.

---

## Pages

| Page | Description |
|------|-------------|
| `/index.html` | Homepage - featured article + latest articles grid |
| `/article.html` | Dynamic article page - loads any article by ID |
| `/submit.html` | Submission form - contributors submit articles |
| `/about.html` | About Nextline Media |
| `/admin/index.html` | Admin login |
| `/admin/dashboard.html` | Full CMS - write, publish, edit, delete articles & manage submissions |

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (no frameworks)
- **Database:** [Supabase](https://supabase.com) (PostgreSQL)
- **Hosting:** [Vercel](https://vercel.com)
- **Fonts:** Playfair Display + DM Sans (Google Fonts)

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `articles` | Published and draft articles |
| `submissions` | Reader/contributor article submissions |
| `categories` | Article categories (Politics, History, etc.) |

---

## How It Works

### For Readers
- Browse and read articles at the live site — free, no login needed

### For Contributors
- Go to `/submit.html`
- Fill in name, email, article title, category, and content
- Submit — it goes directly to the admin for review

### For Admin (You)
1. Go to `/admin/index.html`
2. Login with your admin password
3. Use the dashboard to:
   - **Write & publish** new articles directly
   - **Review submissions** from contributors
   - **Promote submissions** to drafts with one click
   - **Edit or delete** any article
   - **Manage categories**

---

## Project Structure

```
nextline/
├── index.html          ← Homepage
├── article.html        ← Dynamic article page
├── submit.html         ← Contributor submission form
├── about.html          ← About page
├── styles.css          ← All styles
├── script.js           ← UI interactions
├── supabase.js         ← Supabase database client
└── admin/
    ├── index.html      ← Admin login
    └── dashboard.html  ← CMS dashboard
```

---

## Contact

📧 [nextline.publications@gmail.com](mailto:nextline.publications@gmail.com)
💼 [linkedin.com/company/nextlinemedia](https://www.linkedin.com/company/nextlinemedia/)

---

© 2026 Nextline Media. All rights reserved.
