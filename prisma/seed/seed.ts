import { mongo } from './mongo'

async function seed() {
    if (process.env.NODE_ENV === 'test') {
      await mongo.drop()
    }
    await mongo.load()
}

seed()
