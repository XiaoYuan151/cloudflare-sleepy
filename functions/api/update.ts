import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  SECRET: string;
  KV: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body: {
    secret: string;
    status: number;
    device: { type: string; status: string };
  } = await request.json();
  if (!body.secret === env.SECRET) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (body.status) {
    env.KV.put("status", body.status);
  }
  if (body.device.type && body.device.status) {
    env.KV.put(body.device.type, body.device.status);
  }
  return new (Response as any)(JSON.stringify({ message: "Successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
