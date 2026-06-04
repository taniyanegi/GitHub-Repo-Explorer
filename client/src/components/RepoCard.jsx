import { useState } from 'react';

const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Shell: '#89e051',
    Vue: '#41b883',
    Dart: '#00B4AB',
};

function RepoCard({ repo }) {
    const [expanded, setExpanded] = useState(false);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] || '#8b949e') : null;

    return (
        <div className="repo-card">
            <div className="repo-header">
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="repo-name"
                >
                    {repo.name}
                </a>
                <button
                    className="expand-button"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Less ▲' : 'More ▼'}
                </button>
            </div>

            {repo.description && (
                <p className="repo-description">{repo.description}</p>
            )}

            <div className="repo-meta">
                {repo.language && (
                    <span className="repo-language">
                        <span
                            className="lang-dot"
                            style={{ backgroundColor: langColor }}
                        />
                        {repo.language}
                    </span>
                )}
                <span className="repo-stars">⭐ {repo.stargazers_count.toLocaleString()}</span>
                <span className="repo-updated">
                    Updated {formatDate(repo.updated_at)}
                </span>
            </div>

            {expanded && (
                <div className="repo-details">
                    <div className="detail-item">
                        <span className="detail-label">Default Branch:</span>
                        <span className="detail-value">{repo.default_branch}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Open Issues:</span>
                        <span className="detail-value">{repo.open_issues_count}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Forks:</span>
                        <span className="detail-value">{repo.forks_count}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RepoCard;
