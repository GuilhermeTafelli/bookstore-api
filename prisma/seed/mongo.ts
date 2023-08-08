import { PrismaClient } from '../generated/mongo'

const client = new PrismaClient()
const objectId = '641064315452fd1bc5f6973a'
const uuid = 'fc184403-2165-4876-aa99-55b9415fa232'

const seedExample = async () => {
  await client.user.create({
    data: {
      id: objectId,
      name: "John",
      email: "test@test.com",
      password: "password",
      createdAt: new Date(),
    }
  })
  console.warn('EXAMPLE CREATED')
}

const load = async () => {
  try {
    await seedExample()
  } catch (error) {
    console.error(error)
  } finally {
    await client.$disconnect()
  }
}

const drop = async () => {
  try {
    await client.user.deleteMany()
    console.warn('DATABASE DROPPED')
  } catch (error) {
    console.error(error)
  } finally {
    await client.$disconnect()
  }
}

export const mongo = { load, drop }
