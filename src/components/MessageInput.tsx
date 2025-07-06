import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Upload } from 'lucide-react';
import { DiscordEmbed } from '../types';
import { validateMessage, MAX_MESSAGE_LENGTH } from '../utils/discord';

interface MessageInputProps {
  onSendMessage: (content: string, embeds: DiscordEmbed[], attachments: File[]) => void;
  embeds: DiscordEmbed[];
  isLoading: boolean;
  isConfigured: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  embeds,
  isLoading,
  isConfigured,
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateMessage(message, embeds);
    if (validationError) {
      alert(validationError);
      return;
    }

    onSendMessage(message, embeds, attachments);
    setMessage('');
    setAttachments([]);
  };

  const handleFileSelect = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => {
      const maxSize = 8 * 1024 * 1024; // 8MB
      return file.size <= maxSize;
    });
    
    setAttachments(prev => [...prev, ...newFiles].slice(0, 10));
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const messageLength = message.length;
  const isOverLimit = messageLength > MAX_MESSAGE_LENGTH;
  const canSend = isConfigured && !isLoading && !isOverLimit && (message.trim() || embeds.length > 0);

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`relative ${dragOver ? 'bg-purple-50 border-purple-300 dark:bg-purple-500/10 dark:border-purple-500' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600'} border-2 border-dashed rounded-lg transition-colors duration-300`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConfigured ? "Type your message here..." : "Configure webhook URL first"}
            disabled={!isConfigured}
            rows={4}
            className="w-full bg-transparent border-none p-4 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none resize-none"
          />
          
          {dragOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-purple-50/90 dark:bg-purple-500/10 rounded-lg">
              <div className="text-purple-600 dark:text-purple-400 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p>Drop files here to attach</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isConfigured}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
            />
            
            <span className={`text-sm ${isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {messageLength}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send
          </button>
        </div>

        {attachments.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Attachments ({attachments.length}/10)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded p-2 flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};