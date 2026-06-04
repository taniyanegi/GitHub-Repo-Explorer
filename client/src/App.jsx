import { useGitHub } from './hooks/useGitHub';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const {
    user,
    repos,
    loading,
    error,
    hasMore,
    searchUser,
    loadMoreRepos
  } = useGitHub();

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
          <RepoList
            repos={repos}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreRepos}
          />
        </>
      )}
    </div>
  );
}

export default App;