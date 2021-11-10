import {Arg, Ctx, Mutation, Resolver} from "type-graphql";

import {User} from "../../entity/user.entity";
import {CiPasswordInput, UserInput} from "../../inputs/user.input";
import {UserResponse} from "../../errors/user.response";
import {MyContext} from "../../types/MyContext";
import {getRepository} from "typeorm";
import argon2 from "argon2";

@Resolver()
export class UserMutations {
  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => CiPasswordInput) options: CiPasswordInput,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.ci = ${options.ci}`)
      .getOne();

    if (!user) {
      return {
        errors: [
          {path: "ci", message: "Esta cedula no existe, intentalo de nuevo."},
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            path: "password",
            message: "Contrasñea incorrecta, intentalo de nuevo.",
          },
        ],
      };
    }

    console.log(user);

    req.session.ci = user.ci;
    return {user};
  }

  @Mutation(() => Boolean)
  logout(@Ctx() {req, res}: MyContext): Promise<unknown> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse, {nullable: true})
  async createUser(
    @Arg("options", () => UserInput) options: UserInput
  ): Promise<UserResponse> {
    const hashed_pass = await argon2.hash(options.password);

    const user = await User.create({
      ci: options.ci,
      email: options.email,
      name: options.name,
      password: hashed_pass,
    }).save();

    return {user};
  }
}
