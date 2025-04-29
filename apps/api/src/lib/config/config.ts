export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.JWT_SECRET,
  db_url: process.env.DATABASE_URL,
});
