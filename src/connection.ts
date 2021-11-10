import {createConnection} from "typeorm";
import {Assists} from "./entity/assists.entity";
import {Material} from "./entity/material.entity";
import {Meeting} from "./entity/meeting.entity";
import {User} from "./entity/user.entity";

export const connection = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.POSTGRE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Material, Assists, Meeting],
  });
};
