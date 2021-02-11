import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";

import {Sample} from "../entities";

@EventSubscriber()
export class SampleSubscriber implements EntitySubscriberInterface<Sample> {

  beforeInsert(event: InsertEvent<Sample>): void {
    // eslint-disable-next-line no-console
    console.log(event);
  }

}
