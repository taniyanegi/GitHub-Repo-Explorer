import { useState, useCallback } from 'react';
import { getUser, getUserRepos } from '../api/github';

export function useGitHub() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [sortBy, setSortBy] = useState('updated');

    const searchUser = useCallback(async (username) => {
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setUser(null);
        setRepos([]);
        setPage(1);

        try {
            const userData = await getUser(username);
            setUser(userData);

            const repoData = await getUserRepos(username, 1, sortBy);
            setRepos(repoData.repos);
            setHasMore(repoData.repos.length === 30);

        } catch (err) {
            if (err.response?.status === 404) {
                setError('GitHub user not found. Please check the username.');
            } else if (err.response?.status === 429) {
                setError('GitHub rate limit exceeded. Please try again later.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [sortBy]);

    const loadMoreRepos = useCallback(async () => {
        if (!user || loading) return;

        const nextPage = page + 1;
        setLoading(true);

        try {
            const repoData = await getUserRepos(user.login, nextPage, sortBy);
            setRepos(prev => [...prev, ...repoData.repos]);
            setPage(nextPage);
            setHasMore(repoData.repos.length === 30);
        } catch (err) {
            setError('Failed to load more repositories.');
        } finally {
            setLoading(false);
        }
    }, [user, page, loading, sortBy]);

    return {
        user,
        repos,
        loading,
        error,
        hasMore,
        sortBy,
        setSortBy,
        searchUser,
        loadMoreRepos
    };
}
