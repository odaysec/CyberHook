import { useState, useCallback } from 'react';
import { DiscordMessage, DiscordEmbed, WebhookConfig, AppState } from '../types';
import { sendDiscordWebhook, generateRandomId, RATE_LIMIT_DELAY } from '../utils/discord';

const STORAGE_KEY = 'cyberhook_data';

export const useDiscordWebhook = () => {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          messages: parsed.messages || [],
          currentConfig: parsed.currentConfig || { url: '', username: 'CyberHook' },
          isLoading: false,
          lastSentTime: 0,
          rateLimitRemaining: 100,
        };
      } catch (error) {
        console.error('Failed to parse stored data:', error);
      }
    }
    return {
      messages: [],
      currentConfig: { url: '', username: 'CyberHook' },
      isLoading: false,
      lastSentTime: 0,
      rateLimitRemaining: 100,
    };
  });

  const saveToStorage = useCallback((newState: AppState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        messages: newState.messages,
        currentConfig: newState.currentConfig,
      }));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }, []);

  const updateConfig = useCallback((config: WebhookConfig) => {
    setState(prev => {
      const newState = { ...prev, currentConfig: config };
      saveToStorage(newState);
      return newState;
    });
  }, [saveToStorage]);

  const sendMessage = useCallback(async (
    content: string,
    embeds: DiscordEmbed[] = [],
    attachments: File[] = []
  ) => {
    const now = Date.now();
    const timeSinceLastSent = now - state.lastSentTime;

    if (timeSinceLastSent < RATE_LIMIT_DELAY) {
      throw new Error(`Rate limit: Please wait ${Math.ceil((RATE_LIMIT_DELAY - timeSinceLastSent) / 1000)} seconds`);
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await sendDiscordWebhook(state.currentConfig, content, embeds, attachments);

      const newMessage: DiscordMessage = {
        id: generateRandomId(),
        content,
        username: state.currentConfig.username,
        avatar_url: state.currentConfig.avatar_url,
        embeds,
        timestamp: new Date(),
        webhookUrl: state.currentConfig.url,
        attachments: attachments.map(file => ({
          id: generateRandomId(),
          filename: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
          content_type: file.type,
        })),
      };

      setState(prev => {
        const newState = {
          ...prev,
          messages: [newMessage, ...prev.messages].slice(0, 100), // Keep last 100 messages
          isLoading: false,
          lastSentTime: now,
          rateLimitRemaining: Math.max(0, prev.rateLimitRemaining - 1),
        };
        saveToStorage(newState);
        return newState;
      });

      return true;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [state.currentConfig, state.lastSentTime, saveToStorage]);

  const clearMessages = useCallback(() => {
    setState(prev => {
      const newState = { ...prev, messages: [] };
      saveToStorage(newState);
      return newState;
    });
  }, [saveToStorage]);

  return {
    ...state,
    updateConfig,
    sendMessage,
    clearMessages,
  };
};