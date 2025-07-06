export interface DiscordMessage {
  id: string;
  content: string;
  username: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
  timestamp: Date;
  webhookUrl: string;
  attachments?: DiscordAttachment[];
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  timestamp?: string;
  footer?: {
    text: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  content_type?: string;
}

export interface WebhookConfig {
  url: string;
  username: string;
  avatar_url?: string;
}

export interface AppState {
  messages: DiscordMessage[];
  currentConfig: WebhookConfig;
  isLoading: boolean;
  lastSentTime: number;
  rateLimitRemaining: number;
}