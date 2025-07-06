import React from 'react';
import { Trash2, Clock, ExternalLink } from 'lucide-react';
import { DiscordMessage } from '../types';
import { formatTimestamp, getAvatarUrl } from '../utils/discord';

interface MessageHistoryProps {
  messages: DiscordMessage[];
  onClearHistory: () => void;
  className?: string;
}

export const MessageHistory: React.FC<MessageHistoryProps> = ({
  messages,
  onClearHistory,
  className = '',
}) => {
  if (messages.length === 0) {
    return (
      <div className={`bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center transition-colors duration-300 ${className}`}>
        <div className="text-gray-600 dark:text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No messages sent yet</p>
          <p className="text-sm">Your message history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-500 dark:text-green-400" />
          <span className="text-gray-900 dark:text-gray-200 font-medium">Message History</span>
          <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm">
            {messages.length}
          </span>
        </div>
        <button
          onClick={onClearHistory}
          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-1 text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <img
                src={getAvatarUrl(message.avatar_url)}
                alt={message.username}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-gray-200">{message.username}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                
                {message.content && (
                  <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-wrap">{message.content}</p>
                )}

                {message.embeds && message.embeds.length > 0 && (
                  <div className="space-y-2">
                    {message.embeds.map((embed, index) => (
                      <div
                        key={index}
                        className="border-l-4 pl-4 py-2 bg-gray-100 dark:bg-gray-700/30 rounded-r transition-colors duration-300"
                        style={{ borderLeftColor: `#${embed.color?.toString(16).padStart(6, '0') || '7B68EE'}` }}
                      >
                        {embed.title && (
                          <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-1">
                            {embed.url ? (
                              <a
                                href={embed.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                {embed.title}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              embed.title
                            )}
                          </h4>
                        )}
                        {embed.description && (
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{embed.description}</p>
                        )}
                        {embed.fields && embed.fields.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {embed.fields.map((field, fieldIndex) => (
                              <div
                                key={fieldIndex}
                                className={field.inline ? 'col-span-1' : 'col-span-full'}
                              >
                                <div className="font-medium text-gray-900 dark:text-gray-200 text-sm">{field.name}</div>
                                <div className="text-gray-700 dark:text-gray-300 text-sm">{field.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {embed.image && (
                          <img
                            src={embed.image.url}
                            alt="Embed image"
                            className="mt-2 max-w-full h-auto rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span>📎</span>
                        <span>{attachment.filename}</span>
                        <span>({(attachment.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};