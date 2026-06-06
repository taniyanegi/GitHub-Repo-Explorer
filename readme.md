# GitHub Explorer

A full-stack web application to search GitHub users and explore their public repositories.

Built as a take-home assessment for Studio Graphene — Node.js + React Programme.

---

## Features

### Must Have
- 🔍 Search any GitHub username
- 👤 View profile — avatar, name, bio, location, followers, following, public repo count
- 📁 Browse public repositories — name, description, language, stars, last updated
- 🔽 Sort repos by stars, name, or last updated (backend-powered, correct with pagination)
- ❌ Clear error messages — username not found, rate limit exceeded, network errors

### Should Have
- ⚡ Server-side caching — same username within 60 seconds returns cached response
- ⏳ Skeleton loading states while requests are in flight
- 📄 Pagination — "Load More" button for users with many repos
- 🔽 Expand any repo card to see open issues, forks, and default branch

### Bonus
- 🍩 Language distribution donut chart across loaded repositories

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Vanilla CSS (glassmorphism, Inter font) |
| Charts | Recharts |
| Backend | Node.js, Express |
| HTTP Client | Axios |
| Cache | In-memory (Map, 60s TTL) |
| External API | GitHub REST API v3 |

---

## Project Structure

```
github-explorer/
├── client/                   # React frontend (Vite)
│   └── src/
│       ├── api/
│       │   └── github.js     # Axios API layer
│       ├── components/
│       │   ├── SearchBar.jsx
│       │   ├── UserProfile.jsx
│       │   ├── RepoList.jsx
│       │   ├── RepoCard.jsx
│       │   ├── LanguageChart.jsx
│       │   ├── SkeletonLoader.jsx
│       │   └── ErrorMessage.jsx
│       ├── hooks/
│       │   └── useGitHub.js  # Custom hook — all state and API logic
│       └── App.jsx
└── server/                   # Express backend
    ├── routes/
    │   └── user.js           # API route handlers
    ├── services/
    │   └── githubService.js  # GitHub API service layer
    ├── cache.js              # In-memory cache (60s TTL)
    └── index.js              # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- A GitHub Personal Access Token ([create one here](https://github.com/settings/tokens))

### 1. Clone the repository
```bash
git clone https://github.com/taniyanegi/GitHub-Repo-Explorer.git
cd GitHub-Repo-Explorer
```

### 2. Setup the server
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:
```
GITHUB_TOKEN=your_github_personal_access_token
CLIENT_URL=http://localhost:5173
PORT=5000
```

Start the server:
```bash
npm run dev
```

### 3. Setup the client
```bash
cd ../client
npm install
npm run dev
```

### 4. Open the app
Visit [http://localhost:5173](http://localhost:5173)

---

## Key Design Decisions

**Backend proxy pattern** — The frontend never calls GitHub directly. All requests go through the Express server, keeping the GitHub token secure and enabling server-side caching.

**Server-side sorting** — Sort parameters are passed to the GitHub API, not applied client-side. This ensures correct results even across paginated responses (e.g. a user with 90 repos sorted by stars).

**Cache-Aside pattern** — On each request, the cache is checked first. On a miss, GitHub is called and the result is stored with a timestamp. Expired entries are evicted lazily on next read.

---

## What I Would Add With More Time

- Redis for distributed, persistent caching
- TypeScript for type safety
- Unit tests for API routes and utility functions
- Recently searched list persisted in localStorage
- Debounced search-as-you-type
