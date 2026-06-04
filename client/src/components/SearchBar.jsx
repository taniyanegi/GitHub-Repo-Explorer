import { useState } from 'react';

function SearchBar({ onSearch, loading }) {
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    }

    return (
        <div className="search-container">
            <h1 className="app-title">GitHub Explorer</h1>
            <p className="app-subtitle">Search any GitHub user to explore their profile and repositories</p>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter GitHub username..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    autoComplete="off"
                    spellCheck="false"
                />
                <button
                    type="submit"
                    className="search-button"
                    disabled={loading || !input.trim()}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
