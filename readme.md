# GitHub Explorer

**Exercise 3: GitHub Repo Explorer** — Take-home assessment for Studio Graphene, Node.js + React Programme.

A full-stack web application where a user types a GitHub username and the app displays that user's public profile along with a list of their public repositories. The Node.js backend acts as a proxy — the frontend never calls the GitHub API directly. This enables server-side caching and keeps the GitHub API token secure.

---

## Live Demo

- **Frontend (Live App):** [https://git-hub-repo-explorer-gamma.vercel.app/](https://git-hub-repo-explorer-gamma.vercel.app/)
- **Backend API:** [https://github-repo-explorer-khde.onrender.com](https://github-repo-explorer-khde.onrender.com)

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | React 19 + Vite | Vite gives near-instant HMR; React hooks handle all state cleanly without extra libraries |
| Styling | Vanilla CSS | No extra dependencies; full control over glassmorphism design and animations |
| Charts | Recharts | Lightweight, React-native, composable — perfect for the language donut chart |
| Backend | Node.js + Express | Minimal setup, great middleware ecosystem, ideal for a small proxy API |
| HTTP Client | Axios | Consistent API, automatic JSON parsing, easy error status code access |
| Cache | In-memory (JS Map) | Simple, zero-dependency; a Map with timestamps is sufficient for 60s TTL caching |
| External API | GitHub REST API v3 | Official, well-documented, supports sorting and pagination natively |

---

## Project Structure

```
github-explorer/
├── client/                   # React frontend (Vite)
│   └── src/
│       ├── api/
│       │   └── github.js          # Axios instance + API functions
│       ├── components/
│       │   ├── SearchBar.jsx      # Search input + form submit
│       │   ├── UserProfile.jsx    # Avatar, name, bio, stats
│       │   ├── RepoList.jsx       # Sort controls + repo grid
│       │   ├── RepoCard.jsx       # Single repo + expand toggle
│       │   ├── LanguageChart.jsx  # Recharts donut chart
│       │   ├── SkeletonLoader.jsx # Loading placeholder
│       │   └── ErrorMessage.jsx   # Error display
│       ├── hooks/
│       │   └── useGitHub.js       # All state, API calls, pagination
│       ├── App.jsx
│       └── App.css
└── server/                   # Express backend
    ├── routes/
    │   └── user.js           # Route handlers
    ├── services/
    │   └── githubService.js  # GitHub API calls
    ├── cache.js              # In-memory cache (60s TTL)
    └── index.js              # Server entry point
```

---

## API Documentation

### GET `/api/user/:username`

Fetches a GitHub user's public profile.

**Request**
```
GET /api/user/torvalds
```

**Response (200)**
```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "bio": null,
  "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
  "followers": 305975,
  "following": 0,
  "public_repos": 12,
  "html_url": "https://github.com/torvalds",
  "location": "Portland, OR",
  "fromCache": false
}
```

**Error Responses**

| Status | Meaning |
|---|---|
| 400 | Invalid username format |
| 404 | GitHub user not found |
| 429 | GitHub rate limit exceeded |
| 500 | Unexpected server error |

---

### GET `/api/user/:username/repos`

Fetches a paginated, sorted list of the user's public repositories.

**Query Parameters**

| Param | Type | Default | Options |
|---|---|---|---|
| `page` | number | `1` | Any positive integer |
| `sort` | string | `updated` | `updated`, `stars`, `name` |

**Request**
```
GET /api/user/torvalds/repos?page=1&sort=stars
```

**Response (200)**
```json
{
  "repos": [
    {
      "id": 2325298,
      "name": "linux",
      "description": "Linux kernel source tree",
      "language": "C",
      "stargazers_count": 180000,
      "updated_at": "2024-06-01T10:00:00Z",
      "html_url": "https://github.com/torvalds/linux",
      "open_issues_count": 0,
      "default_branch": "master",
      "forks_count": 54000
    }
  ],
  "hasMore": false,
  "fromCache": false
}
```

**Error Responses**

| Status | Meaning |
|---|---|
| 400 | Invalid username format |
| 404 | GitHub user not found |
| 429 | GitHub rate limit exceeded |
| 500 | Unexpected server error |

---

## How to Run Locally

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

## Features Implemented

### Must Have ✅
- Search GitHub username and display profile (avatar, name, bio, location, followers, following, public repos)
- Repo list with name, description, language, stars, last updated
- Sort by stars / name / last updated (server-side, correct across all pages)
- Clear error messages — user not found, rate limit exceeded, network errors

### Should Have ✅
- Server-side caching with 60s TTL (Cache-Aside pattern)
- Skeleton loading states while requests are in flight
- Pagination — "Load More" button (GitHub returns 30 per page)
- Expand repo card to see open issues, forks, and default branch

### Bonus ✅
- Language distribution donut chart (Recharts) across loaded repositories

---

## Next Steps

Given more time, I would:

- **Deploy** to Render (backend) and Vercel (frontend)
- **Add Redis** for distributed, persistent caching instead of in-memory
- **Add TypeScript** for type safety across both client and server
- **Write tests** — Jest for backend route handlers, Vitest for custom hooks
- **Recently searched list** persisted in localStorage
- **Debounced search-as-you-type** to reduce unnecessary API calls

---

## Notes on AI Tool Usage

I used AI tools during development. As required by the brief — I understand every line of code in this submission and can walk through the full implementation in the follow-up technical discussion.

Key decisions I made and understand:
- Backend proxy pattern chosen for token security and shared caching across all users
- Server-side sorting chosen over client-side to ensure correctness with pagination
- Cache-Aside pattern with lazy eviction chosen for simplicity at this scale
