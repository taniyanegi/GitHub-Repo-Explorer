import RepoCard from './RepoCard';

function RepoList({ repos, loading, hasMore, onLoadMore, sortBy, onSortChange }) {

    if (repos.length === 0) return null;

    return (
        <div className="repo-list-container">
            <div className="repo-list-header">
                <h3 className="repo-list-title">
                    Repositories ({repos.length})
                </h3>
                <div className="sort-controls">
                    <label className="sort-label">Sort by:</label>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="updated">Last Updated</option>
                        <option value="stars">Stars</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </div>

            <div className="repo-list">
                {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button
                        className="load-more-button"
                        onClick={onLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load More Repositories'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default RepoList;
