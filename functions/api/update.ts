import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  SECRET: string;
  KV: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body: { secret: string; status: string; device: string } =
    await request.json();
  if (!body.secret === env.SECRET) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (!body.status === "" || !body.status === void 0) {
    env.KV.put("status", body.status);
  }
  if (!body.device === "" || !body.device === void 0) {
    env.KV.put("device", body.device);
  }
  return new (Response as any)(JSON.stringify({ message: "Successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
