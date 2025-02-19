import { IAgentRepository } from "@/domain/repositories/IAgentRepository";

declare global {
  interface Window {
    agentRepository: IAgentRepository;
  }
}
