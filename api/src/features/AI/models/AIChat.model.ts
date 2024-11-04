import type { AIMessage } from "./AIMessage.model.ts";

export class AIChat {
  constructor(
    readonly chatId: string,
    readonly userId: string,
    readonly messages: AIMessage[],
  ) {}
}
