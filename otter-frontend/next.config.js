/* The code is configuring the Next.js application. */
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.dicebear.com']
    },
    experimental: {
        appDir: true, 
    },
};