const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');


// run before every test case
beforeEach((done) => {
    // wipe all todos
    Todo.remove({}).then(() => done());
});

// define tests
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var testText = 'mysterions testText';

        // make request with supertestText
        request(app)
            .post('/todos')
            .send({
                text: testText
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(testText);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is saved in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(testText);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is saved in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});