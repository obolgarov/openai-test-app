import type { AIMessageSource } from "../enums/AI.enums.ts";

export class AIMessage {
  constructor(
    readonly messageId: string,
    readonly userId: string,
    readonly messageSource: AIMessageSource,
    readonly content: string,
  ) {}
}
