import {ApiController} from "../services/fastify-types";
import {SampleRepository} from "../repositories/sample";
import {logger} from "../services/logger";

interface GetQuery {
  name?: string;
}

export const get: ApiController<GetQuery> = {
  handler: async function(request, reply) {
    logger.info("Fetching samples", {requestId: request.id});
    const sampleRepository = this.db.getCustomRepository(SampleRepository);
    if(request.query.name) {
      reply.send(
        await sampleRepository.findByName(request.query.name)
      );
    } else {
      reply.send(await sampleRepository.find());
    }
  },
  opts: {
    schema: {
      querystring: {
        type: "object",
        required: [],
        properties: {
          "name": {
            type: "string"
          },
        }
      }  
    }  
  }
};