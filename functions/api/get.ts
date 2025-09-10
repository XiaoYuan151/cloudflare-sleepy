import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const status = await env.KV.get("status");
  const computer = await env.KV.get("computer");
  const tablet = await env.KV.get("tablet");
  const phone = await env.KV.get("phone");
  return new (Response as any)(
    JSON.stringify({
      status: status,
      devices: { computer: computer, tablet: tablet, phone: phone },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
