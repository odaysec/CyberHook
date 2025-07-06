import { DiscordMessage, DiscordEmbed, WebhookConfig } from '../types';

export const RATE_LIMIT_DELAY = 2000; // 2 seconds between messages
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_EMBED_FIELDS = 25;

export const validateWebhookUrl = (url: string): boolean => {
  const webhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
  return webhookRegex.test(url);
};

export const validateMessage = (content: string, embeds: DiscordEmbed[] = []): string | null => {
  if (!content.trim() && embeds.length === 0) {
    return 'Message content or embed is required';
  }
  
  if (content.length > MAX_MESSAGE_LENGTH) {
    return `Message content cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
  }
  
  return null;
};

export const sendDiscordWebhook = async (
  config: WebhookConfig,
  content: string,
  embeds: DiscordEmbed[] = [],
  attachments: File[] = []
): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    const payload = {
      content: content.trim() || undefined,
      username: config.username,
      avatar_url: config.avatar_url || undefined,
      embeds: embeds.length > 0 ? embeds : undefined,
    };

    formData.append('payload_json', JSON.stringify(payload));
    
    // Add file attachments
    attachments.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const response = await fetch(config.url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Discord webhook error:', errorData);
      throw new Error(`Discord API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
    throw error;
  }
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const hexToDecimal = (hex: string): number => {
  return parseInt(hex.replace('#', ''), 16);
};

export const getAvatarUrl = (avatarUrl?: string): string => {
  return avatarUrl || `https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=64&h=64&fit=crop&crop=face`;
};