function SkeletonLoader() {
    return (
        <div className="skeleton-container">
            <div className="skeleton-profile">
                <div className="skeleton-avatar skeleton-pulse"></div>
                <div className="skeleton-profile-info">
                    <div className="skeleton-line skeleton-pulse" style={{ width: '200px' }}></div>
                    <div className="skeleton-line skeleton-pulse" style={{ width: '150px' }}></div>
                    <div className="skeleton-line skeleton-pulse" style={{ width: '250px' }}></div>
                </div>
            </div>

            <div className="skeleton-stats">
                <div className="skeleton-stat skeleton-pulse"></div>
                <div className="skeleton-stat skeleton-pulse"></div>
                <div className="skeleton-stat skeleton-pulse"></div>
            </div>

            <div className="skeleton-repos">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="skeleton-repo-card skeleton-pulse"></div>
                ))}
            </div>
        </div>
    );
}

export default SkeletonLoader;