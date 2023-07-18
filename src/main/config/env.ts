export default {
    mongoJustUrl: process.env.MONGODB_JEST_URI as string,
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/auth-service",
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "dsa45=6TSg!xz",
};
