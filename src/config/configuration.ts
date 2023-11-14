export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL ? parseInt(process.env.JWT_TTL, 10) : 3600,
  },
});
