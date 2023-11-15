export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
    ttl: process.env.REDIS_TTL ? parseInt(process.env.REDIS_TTL, 10) : null,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL ? parseInt(process.env.JWT_TTL, 10) : 3600,
  },
});
