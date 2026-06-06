import { useEffect } from 'react';
import { useGitHub } from './hooks/useGitHub';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorMessage from './components/ErrorMessage';
import LanguageChart from './components/LanguageChart';
import './App.css';


function App() {
  const {
    user,
    repos,
    loading,
    error,
    hasMore,
    sortBy,
    setSortBy,
    searchUser,
    loadMoreRepos
  } = useGitHub();

  useEffect(() => {
    document.title = user
      ? `${user.login} — GitHub Explorer`
      : 'GitHub Explorer';
  }, [user]);

  return (
    <div className="app">
      <SearchBar
        onSearch={searchUser}
        loading={loading}
      />

      {loading && !user && (
        <SkeletonLoader />
      )}

      {error && (
        <ErrorMessage message={error} />
      )}

      {user && (
        <>
          <UserProfile user={user} />
          {repos.length > 0 && <LanguageChart repos={repos} />}
          <RepoList
            repos={repos}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreRepos}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </>
      )}
    </div>
  );
}

export default App;
