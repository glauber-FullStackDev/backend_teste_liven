import { app } from "../../server";
import request from "supertest";
import { _Knex } from "../../database/mysql.config";
import { STATUS } from "../../Utils/Constants.utils";

const table = "adresses";

describe("Address API test", () => {
  let requestBase = request(app);
  let email = "glauber.edif2@gmail.com";
  let password = "123456";
  let token: any = null;
  let id: any = null;
  let idAddress: any = null;

  afterAll(async () => {
    await _Knex.delete().table(table).where({ id: idAddress });
    await _Knex.delete().table('users').where({ id: id });
    _Knex.destroy();
  });

  it("create a address for user registred", async () => {
    let resCreate = await requestBase.post("/v1/users/create-user").send({
      email: email,
      password: password,
      firstname: "Glauber",
      lastname: "de Souza",
      age: 32,
      gender: "M",
    });

    id = resCreate.body.data.id;

    let resSignIn = await requestBase.post("/v1/users/sign-in").send({
      email: email,
      password: password,
    });

    token = resSignIn.body.data.token;

    let resCreateAddress = await requestBase
      .post("/v1/adresses/create-address")
      .set("Authorization", token)
      .send({
        street: "Aristides Pereira da Silva",
        number: "25",
        neighborhood: "Jardim Carioca",
        city: "Cardoso Moreira",
        complement: "casa",
        state: "RJ",
        country: "Brasil",
      });

    idAddress = resCreateAddress.body.data.id;

    expect(resCreateAddress.status).toBe(200);
    expect(resCreateAddress.body.message).toBe("success");
    expect(resCreateAddress.body.data).toHaveProperty("id");
  });


  it('update data address', async () => {
    let numberChanged = '29-3'
    let res = await requestBase.put("/v1/adresses/update").set('Authorization', token).send({
      inputs: {
        number: numberChanged 
      },
      id: idAddress
    });

    let dataUserUpdated = (await _Knex.select().table(table).where({id: idAddress}).limit(1))[0];

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
    expect(dataUserUpdated.number).toBe(numberChanged)
  });

  it('delete Address by userID', async () => {
    let res = await requestBase.delete(`/v1/adresses/delete/${idAddress}`).set('Authorization', token).send({});

    let dataUserDeleted = (await _Knex.select().table(table).where({id: idAddress}).limit(1))[0];

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('address deleted');
    expect(dataUserDeleted.id).toBe(idAddress);
    expect(dataUserDeleted.status).toBe(STATUS.deleted);

  })
});
