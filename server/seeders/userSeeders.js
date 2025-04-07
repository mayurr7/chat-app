import { faker } from "@faker-js/faker";
import { User } from "../models/userSchema.js";

const createUser = async (numUser) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUser; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "123456789",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);

    // console.log(`${numUser} users created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
};


export { createUser };

