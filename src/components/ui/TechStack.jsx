'use client';

export default function TechStack() {
    const stackCategories = [
        {
            title: 'Numerical & Optimization',
            tools: ['Python', 'NumPy', 'SciPy', 'Custom PDE Solvers', 'Gurobi', 'CVXPY']
        },
        {
            title: 'Stochastic Modeling & PDE Methods',
            tools: [
                'Finite Difference Methods',
                'Free Boundary Techniques',
                'Fractional PDE Approaches',
                'Stochastic Control Models',
                'Lévy Processes'
            ]
        },
        {
            title: 'Systems & Tooling',
            tools: ['Rust', 'Linux', 'Bash', 'Git', 'Docker']
        },
        {
            title: 'Experimentation & Evaluation',
            tools: [
                'Backtesting Frameworks',
                'Baseline Comparison Pipelines',
                'Data Validation Utilities',
                'Monte Carlo Simulation'
            ]
        }
    ];

    return (
        <section className="min-h-screen py-32">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-5xl font-bold mb-16 text-center">Tech Stack</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {stackCategories.map((category, index) => (
                        <div
                            key={index}
                            className="glass rounded-lg p-8 hover:bg-white/5 transition-smooth"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-gray-200">
                                {category.title}
                            </h3>

                            <ul className="space-y-3">
                                {category.tools.map((tool, toolIndex) => (
                                    <li
                                        key={toolIndex}
                                        className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                                    >
                                        <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 flex-shrink-0"></span>
                                        <span className="text-sm">{tool}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Additional Context */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                        Tools are selected based on numerical stability, transparency, and validation requirements.
                        Performance is optimized only after correctness is established.
                    </p>
                </div>
            </div>
        </section>
    );
}
