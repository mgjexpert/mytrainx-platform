type GatewayConfig = {
  baseUrl: string;
  token: string;
  agent: string;
};

function getConfig(): GatewayConfig | null {
  const baseUrl = process.env.ATENDIMENTO_CENTER_AGENT_URL?.trim().replace(/\/$/, "");
  const token = process.env.ATENDIMENTO_CENTER_AGENT_TOKEN?.trim();
  const agent = process.env.ATENDIMENTO_CENTER_TRAINER_AGENT?.trim() || "trainer-x";
  if (!baseUrl || !token) return null;
  return { baseUrl, token, agent };
}

export function getAtendimentoGatewayStatus() {
  const config = getConfig();
  return {
    configured: Boolean(config),
    agent: config?.agent ?? "trainer-x",
  };
}

function headers(config: GatewayConfig, userId: string) {
  return {
    Authorization: `Bearer ${config.token}`,
    "Content-Type": "application/json",
    "X-MyTrainX-User-Id": userId,
    "X-MyTrainX-Product": "mytrainx",
  };
}

export async function createAtendimentoConversation(userId: string) {
  const config = getConfig();
  if (!config) throw new Error("ATENDIMENTO_CENTER_GATEWAY_NOT_CONFIGURED");

  const response = await fetch(
    `${config.baseUrl}/api/v1/agents/${encodeURIComponent(config.agent)}/conversations`,
    {
      method: "POST",
      headers: headers(config, userId),
      body: JSON.stringify({
        external_user_id: userId,
        product: "mytrainx",
        channel: "web",
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`ATENDIMENTO_CENTER_CREATE_CONVERSATION_FAILED:${response.status}`);
  }
  return response.json() as Promise<{ id: string; [key: string]: unknown }>;
}

export async function sendAtendimentoMessage(
  userId: string,
  conversationId: string,
  message: string
) {
  const config = getConfig();
  if (!config) throw new Error("ATENDIMENTO_CENTER_GATEWAY_NOT_CONFIGURED");

  return fetch(
    `${config.baseUrl}/api/v1/agents/${encodeURIComponent(config.agent)}/conversations/${encodeURIComponent(conversationId)}/messages`,
    {
      method: "POST",
      headers: {
        ...headers(config, userId),
        Accept: "text/event-stream, application/json",
      },
      body: JSON.stringify({ message }),
      cache: "no-store",
    }
  );
}
