const fastify = require('fastify')


describe('testing tests', () => {

  it('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });

  it('object assignment', () => {
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });

})

