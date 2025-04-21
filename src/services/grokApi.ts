
export interface GrokMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GrokChatCompletionRequest {
  model: string;
  messages: GrokMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  // ... add other Grok API parameters as needed
}

export interface GrokChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: GrokMessage;
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Calls Grok API chat completions endpoint.
 * @param apiKey Your Grok API key
 * @param request The chat completion request object
 * @returns The Grok chat completion response
 */
export async function getGrokChatCompletion(apiKey: string, request: GrokChatCompletionRequest): Promise<GrokChatCompletionResponse> {
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Grok API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data: GrokChatCompletionResponse = await response.json();
  return data;
}
