const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const dummyTodos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    done: true,
    completedAt: 222
}];


// run before every test case
beforeEach((done) => {
    // wipe all todos
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then(() => done());
});

// define tests
describe('POST /todos', () => {
    it('create a new todo', (done) => {
        var testText = 'mysterions testText';

        // make request with supertestText
        supertest(app)
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
                Todo.find({text: testText}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(testText);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('don\'t create a todo with invalid data', (done) => {
        supertest(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is saved in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[0].text).toBe(dummyTodos[0].text);
                    expect(todos[1].text).toBe(dummyTodos[1].text);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('get all todos', (done) => {
        supertest(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                // console.log('## res', res);
                // console.log('## res.body', require('util').inspect(res.body.todos, true, 5, true));
                expect(res.body.todos.length).toBe(2);
                expect(res.body.todos[0].text).toBe(dummyTodos[0].text);
                expect(res.body.todos[1].text).toBe(dummyTodos[1].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is saved in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[0].text).toBe(dummyTodos[0].text);
                    expect(todos[1].text).toBe(dummyTodos[1].text);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos/:id', () => {
    it('get todo by id', (done) => {
        supertest(app)
            .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                // console.log('## res', res);
                // console.log('## res.body', require('util').inspect(res.body, true, 5, true));
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end(done);
    });

    it('get 404 if id not found', (done) => {
        supertest(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('get 400 if id is not an obejct id', (done) => {
        supertest(app)
            .get(`/todos/123abc`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('remove todo by id', (done) => {
        supertest(app)
            .delete(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                // console.log('## res', res);
                // console.log('## res.body', require('util').inspect(res.body, true, 5, true));
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record was removed in database
                Todo.findById(dummyTodos[0]._id.toHexString()).then((todo) => {
                    expect(todo).toBe(null);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('get 404 if id not found', (done) => {
        supertest(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('get 400 if id is not an obejct id', (done) => {
        supertest(app)
            .delete(`/todos/123abc`)
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('update a todo', (done) => {
        var testText = 'mysterions testText';

        // make request with supertestText
        supertest(app)
            .patch(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .send({
                text: testText,
                done: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(testText);
                expect(res.body.todo.done).toBe(true);
                // expect(res.body.todo.completedAt).toNotBe(null);
                // expect(res.body.todo.completedAt).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is updated in database
                Todo.find({text: testText}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(testText);
                    done();
                }).catch((err) => done(err));
            });
    });

    it(`reset 'completedAt' if todo not 'done'`, (done) => {
        supertest(app)
            .patch(`/todos/${dummyTodos[1]._id.toHexString()}`)
            .send({
                done: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.done).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // check if record is updated in database
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[1].done).toBe(false);
                    done();
                }).catch((err) => done(err));
            });
    });
});