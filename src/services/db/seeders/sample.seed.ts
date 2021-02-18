import { Factory, Seeder } from "typeorm-seeding";

import { Sample } from "../../../entities";

export class SampleSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Sample)().seedMany(10);
  }
}
