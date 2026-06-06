import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const FALLBACK_COLORS = ['#58a6ff', '#a78bfa', '#34d399', '#f87171', '#fbbf24', '#60a5fa'];

function LanguageChart({ repos }) {
    const langCount = {};

    repos.forEach(repo => {
        if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
    });

    if (Object.keys(langCount).length === 0) return null;

    const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 6);
    const otherCount = sorted.slice(6).reduce((sum, [, count]) => sum + count, 0);

    const data = top.map(([name, value]) => ({ name, value }));
    if (otherCount > 0) data.push({ name: 'Other', value: otherCount });

    return (
        <div className="chart-container">
            <h3 className="chart-title">Language Distribution</h3>
            <p className="chart-subtitle">Based on {repos.length} loaded repositories</p>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={LANGUAGE_COLORS[entry.name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(10, 15, 30, 0.97)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#e6edf3',
                            fontSize: '13px',
                            fontFamily: 'Inter, sans-serif'
                        }}
                        formatter={(value, name) => [
                            `${value} repo${value > 1 ? 's' : ''}`,
                            name
                        ]}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                            fontSize: '12px',
                            color: '#8b949e',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LanguageChart;
