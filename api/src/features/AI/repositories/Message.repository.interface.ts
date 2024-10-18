import type { User } from "#infrastructure/Auth/entities/User.entity.ts";
import type { AIChat } from "../models/AIChat.model.ts";
import type { AIMessage } from "../models/AIMessage.model.ts";

export interface MessageRespository {
  getChatList(chatId: string): Promise<AIChat[]>;

  getChatListForUser(userId: User): Promise<AIChat[]>;

  getMessage(messageId: string): Promise<AIMessage>;

  createMessage(message: AIMessage): Promise<AIChat>;
}
