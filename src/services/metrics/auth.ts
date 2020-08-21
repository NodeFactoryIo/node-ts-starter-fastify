import {FastifyError, FastifyReply, FastifyRequest} from "fastify";
import {ServerResponse} from "http";

export async function onlyWhitelisted(
  request: FastifyRequest
): Promise<FastifyReply<ServerResponse> | void> {
  const whiteList = process.env.METRICS_IP_WHITELIST?.split(',');
  if (whiteList?.length === 1 && whiteList[0] === "*") {
    return;
  }
  if (!whiteList?.includes(request.ip ?? "")) {
    request.log.warn("Unathorized access", {whiteList, remoteIp: request.ip});
    throw {
      statusCode: 401,
      message: "You are not authorized to access metrics"
    } as FastifyError;
  }
}
