function UserProfile({ user }) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="profile-name">{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="profile-username"
          >
            @{user.login}
          </a>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          {user.location && (
            <p className="profile-location">📍 {user.location}</p>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-number">{user.followers.toLocaleString()}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{user.following.toLocaleString()}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{user.public_repos.toLocaleString()}</span>
          <span className="stat-label">Repositories</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;