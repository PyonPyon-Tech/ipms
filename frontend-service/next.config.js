/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // TODO: INI HARUS DIHAPUS DI PRODUCTION
    return [
      {
        source: "/api/v1/authenticate/:path*",
        destination: "http://localhost:8080/api/v1/authenticate/:path*",
      },
      {
        source: "/api/v1/customers/:path*",
        destination: "http://localhost:8081/api/v1/customers/:path*",
      },
      {
        source: "/api/v1/employees/:path*",
        destination: "http://localhost:8082/api/v1/employees/:path*",
      },
      {
        source: "/api/v1/inventory/:path*",
        destination: "http://localhost:8083/api/v1/inventory/:path*",
      },
      {
        source: "/api/v1/reports/:path*",
        destination: "http://localhost:8084/api/v1/reports/:path*",
      },
      {
        source: "/api/v1/schedules/:path*",
        destination: "http://localhost:8085/api/v1/schedules/:path*",
      },
      {
        source: "/api/v1/images/:path*",
        destination: "http://localhost:8086/api/v1/images/:path*",
      },
      {
        source: "/api/v1/notifications/:path*",
        destination: "http://localhost:8087/api/v1/notifications/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
