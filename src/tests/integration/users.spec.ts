import { app } from '../../server';
import request from "supertest";
import { _Knex } from '../../database/mysql.config'
import { STATUS } from '../../Utils/Constants.utils';

const table = 'users';

describe("User API test", () => {
  let requestBase = request(app);
  let email = 'glauber.edif@gmail.com';
  let password = '123456';
  let token: any = null;
  let id: any = null;
  let emailDeleted = `${email}_deleted`;

  afterAll(async () => {
    await _Knex.delete().table(table).where({email: emailDeleted});
    _Knex.destroy()
  })

  it("create a new user", async () => {
    let res = await requestBase.post("/v1/users/create-user").send({
      email: email,
      password: password,
      firstname: "Glauber",
      lastname: "de Souza",
      age: 32,
      gender: "M",
    });

    let dataUserAdd = (await _Knex.select().table(table).where({email}).limit(1))[0];
    id = dataUserAdd.id;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toBe(dataUserAdd?.id);
  });

  it('login to authenticate in API', async () => {
    let res = await requestBase.post("/v1/users/sign-in").send({
      email: email,
      password: password,
    });

    token = res.body.data.token;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(res.body.data).toHaveProperty('token');
  });

  it('update data user', async () => {
    let firstnameChanged = 'Glauber_teste'
    let res = await requestBase.put("/v1/users/update").set('Authorization', token).send({
      firstname: firstnameChanged
    });

    let dataUserUpdated = (await _Knex.select().table(table).where({email}).limit(1))[0];

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(dataUserUpdated.firstname).toBe(firstnameChanged)
  });

  it('delete user by userID', async () => {
    let res = await requestBase.delete(`/v1/users/delete/${id}`).set('Authorization', token).send({});

    let dataUserDeleted = (await _Knex.select().table(table).where({email: emailDeleted}).limit(1))[0];

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('user deleted');
    expect(dataUserDeleted.id).toBe(id);
    expect(dataUserDeleted.status).toBe(STATUS.deleted);

  })
  
});
