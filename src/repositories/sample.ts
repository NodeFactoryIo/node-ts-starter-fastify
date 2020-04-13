import {EntityRepository, Repository} from "typeorm";
import {Sample} from "../entities";

@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {

  public findByName(name: string): Promise<Sample[]> {
    return this.find({
      where: {
        name
      }
    });
  }

}