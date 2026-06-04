import { useState } from 'react';

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

      {
        repo.description && (
            <p className="repo-description">{repo.description}</p>
        )
    }

    <div className="repo-meta">
        {repo.language && (
            <span className="repo-language">🔵 {repo.language}</span>
        )}
        <span className="repo-stars">⭐ {repo.stargazers_count}</span>
        <span className="repo-updated">
            Updated {formatDate(repo.updated_at)}
        </span>
    </div>

    {
        expanded && (
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
        )
    }
    </div >
  );
}

export default RepoCard;