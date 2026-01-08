/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Shader support for Three.js
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    },
    // Optimize for 3D content
    images: {
        remotePatterns: [],
    },
};

export default nextConfig;
