const { MongoClient } = require('mongodb');
const Collection = require('mongodb/lib/collection');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((er) => {
        console.error('Error connection to MongoDB:', err);
      });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
