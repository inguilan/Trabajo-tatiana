/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Habilitar la optimización de imágenes para mejorar la carga
    unoptimized: false,  // Cambié esto a false para permitir la optimización de imágenes
    remotePatterns: [
      {
        protocol: 'http',  // Usamos el protocolo HTTP para las imágenes
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',  // Este patrón permite todas las imágenes bajo /media/
      },
    ],
  },
}

export default nextConfig
