import {DefaultBody, DefaultHeaders, DefaultParams, DefaultQuery, RequestHandler, RouteShorthandOptions} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";

export type ApiHandler<Query = DefaultQuery, Params = DefaultParams, Body = DefaultBody, Headers = DefaultHeaders>
    = RequestHandler<IncomingMessage, ServerResponse, Query, Params, Headers, Body>;

export interface ApiController<
  Query = DefaultQuery, Params = DefaultParams, Body = DefaultBody, Headers = DefaultHeaders
> {
  opts: RouteShorthandOptions<Server, IncomingMessage, ServerResponse, Query, Params, Headers, Body>;
  handler: ApiHandler<Query, Params, Body, Headers>;
}