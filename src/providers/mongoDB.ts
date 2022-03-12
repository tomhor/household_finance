import { MongoClient } from 'mongodb';
import * as config from './../../config.json';
import { logger } from '../utils/logger';

export class MongoDB {
  // Connection URL
  private url = '';
  private client: MongoClient;
  private dbName = '';
  private static client: MongoClient;
  private static dbName: string;

  constructor() {
    this.url = this.generateUrlWithUsernameAndPassword();
    this.dbName = config.db.mongoDB.db_name;
    this.client = new MongoClient(this.url);
  }

  static async main() {
    // Use connect method to connect to the server
    await this.client.connect();
    logger.info('Connected successfully to server');
    const db = this.client.db(this.dbName);
    const collection = db.collection('listingsAndReviews');
    await this.client.close();
    // the following code examples can be pasted here...
    return collection;
  }
  private generateUrlWithUsernameAndPassword(): string {
    const username = config.db.mongoDB.username;
    const password = config.db.mongoDB.password;
    return `mongodb+srv://${username}:${password}@householdfinance.isg1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  }

  async get(collectionName: string, query: object) {
    // Use connect method to connect to the server
    await this.client.connect();
    logger.info('Connected successfully to server');
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    const findResult = await collection.find(query).toArray();
    logger.info(`Found collection: ${collectionName} =>`, findResult);
    await this.client.close();
    return findResult;
  }

  async insert(collectionName: string, account: object) {
    // Use connect method to connect to the server
    await this.client.connect();
    logger.info('Connected successfully to server');
    const db = this.client.db(this.dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(account);
    logger.info('account insert to DB');
    await this.client.close();
    return;
  }
}
