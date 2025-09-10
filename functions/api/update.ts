import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  SECRET: string;
  KV: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json();
  if (body.secret === env.SECRET) {
    try {
      if (body.status) {
        await env.KV.put("status", body.status);
      }
      if (body.devices && body.devices.type && body.devices.status) {
        await env.KV.put(body.devices.type, body.devices.status);
      }
      return new (Response as any)(JSON.stringify({ message: "Successful" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      return new (Response as any)(
        JSON.stringify({ message: "Failed: " + error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
