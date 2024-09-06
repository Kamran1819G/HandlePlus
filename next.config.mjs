/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Ensure you have set GOOGLE_API_KEY in your environment variables
    // Do not expose the actual API key here
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  // Add custom webpack config if needed for Gemini AI library
  webpack: (config, { isServer }) => {
    // Example: If you need to add a specific loader or plugin
    // config.plugins.push(new YourCustomPlugin())
    return config
  },
}

export default nextConfig
