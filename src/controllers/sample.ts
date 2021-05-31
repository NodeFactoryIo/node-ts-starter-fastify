import { SampleRepository } from "../repositories/sample";
import { ApiController } from "../services/fastify-types";

interface GetQuery {
  name?: string;
}

export const get: ApiController<GetQuery> = {
  handler: async function (request, reply) {
    request.log.info("Fetching samples");

    const sampleRepository = this.db.getCustomRepository(SampleRepository);
    if (request.query.name) {
      reply.send(await sampleRepository.findByName(request.query.name));
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
          name: {
            type: "string",
          },
        },
      },
    },
  },
};
