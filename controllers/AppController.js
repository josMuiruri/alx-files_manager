// controllers/AppController.js
const redisClient = require('../utils/redis'); // Assuming you have a redis utility
const dbClient = require('../utils/db'); // Assuming you have a db utility

// Get status of Redis and DB
const getStatus = async (req, res) => {
    try {
        // Check Redis connection
        const redisStatus = await redisClient.ping(); // Example check

        // Check DB connection
        const dbStatus = await dbClient.ping(); // Example check

        res.status(200).json({
            redis: redisStatus === 'PONG',
            db: dbStatus === 'ok'
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get statistics from DB
const getStats = async (req, res) => {
    try {
        const db = dbClient.db(); // Get the database connection

        // Count users
        const usersCount = await db.collection('users').countDocuments();

        // Count files
        const filesCount = await db.collection('files').countDocuments();

        res.status(200).json({
            users: usersCount,
            files: filesCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getStatus,
    getStats
};
