const request = require('supertest')
const app = require('../app')

process.env.NODE_ENV === 'test'
const db = require('../db')

const test_movie =
    {
    title: "test",
    user_vote:1,
    direction:"up"}
afterEach(async () => {
    await db.query('DELETE FROM movies');
})
afterAll(async () => {
    await db.end()
})

describe('POST, vote a movie', () => {
    test('test voting a movie', async () => {
        let result = await request(app).post('/movie/vote').send(test_movie)
        expect(result.statusCode).toEqual(200)
        expect(result.body).toHaveProperty("message", "vote added")


    })
})
describe('GET, movie vote', () => {
    test('get the number of thumbs up and down a movie has', async () => {
        //  first, create and vote a movie up
        let result = await request(app).post('/movie/vote').send(test_movie)
        //  check it is has been added
        expect(result.statusCode).toEqual(200)
        expect(result.body).toHaveProperty("message", "vote added")
        // get the votes
        const {title} = test_movie
        let res = await request(app).get(`/movies/${title}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.votes).toEqual( { thumbs_up: 1, thumbs_down: 0 })


    })
})