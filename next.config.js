/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
// const config = {};

// module.exports = {
//     images: {
//       domains: ['proeng-5r0c5koj2-proengs-projects.vercel.app'],
//     },
//   };
//   module.exports = config;

// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xaljbeozaieyoecnxvum.supabase.co'], // Adicione o domínio aqui
  },
};

export default nextConfig;


  // export default {
  //   images: {
  //     domains: ['proeng-5r0c5koj2-proengs-projects.vercel.app'],
  //   },
  // };