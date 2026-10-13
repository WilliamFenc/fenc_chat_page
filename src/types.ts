export interface Project {
	id: string;
	name: string;
	createdAt: string;
}

export type Role = "user" | "assistant";

export interface Message {
	id: string;
	role: Role;
	content: string;
	createdAt: string;
}

export interface Model {
	id: string;
	name: string;
}

export interface Session {
	id: string;
	projectId: string;
	modelId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
}

export interface ChatState {
        projects: Project[];
        models: Model[];
        sessions: Session[];
        currentProjectId: string | null;
        currentSessionId: string | null;
        messagesBySession: Record<string, Message[]>;
        isStreaming: boolean;
}

