import {define} from "typeorm-seeding";
import {Sample} from "../../../entities";

define(Sample, (faker)=> {
  const sample = new Sample();
  sample.name = faker.name.jobType();
  return sample;
});