import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const status = await env.KV.get("status");
  const device = await env.KV.get("device");
  return new (Response as any)(
    JSON.stringify({ status: status, device: device }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
