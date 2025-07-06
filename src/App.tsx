import React, { useState } from 'react';
import { Header } from './components/Header';
import { WebhookConfig } from './components/WebhookConfig';
import { EmbedBuilder } from './components/EmbedBuilder';
import { MessageInput } from './components/MessageInput';
import { MessageHistory } from './components/MessageHistory';
import { StatusBar } from './components/StatusBar';
import { DocsPage } from './components/DocsPage';
import { useDiscordWebhook } from './hooks/useDiscordWebhook';
import { useTheme } from './hooks/useTheme';
import { validateWebhookUrl } from './utils/discord';
import { DiscordEmbed } from './types';

function App() {
  const [embeds, setEmbeds] = useState<DiscordEmbed[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home');
  
  const { theme, toggleTheme } = useTheme();
  
  const {
    messages,
    currentConfig,
    isLoading,
    lastSentTime,
    rateLimitRemaining,
    updateConfig,
    sendMessage,
    clearMessages,
  } = useDiscordWebhook();

  const isConfigured = validateWebhookUrl(currentConfig.url);

  const handleSendMessage = async (content: string, embedsToSend: DiscordEmbed[], attachments: File[]) => {
    try {
      setError(null);
      await sendMessage(content, embedsToSend, attachments);
      setEmbeds([]); // Clear embeds after successful send
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (currentPage === 'docs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/50 to-cyan-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
        <Header 
          onNavigate={setCurrentPage} 
          currentPage={currentPage}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <DocsPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/50 to-cyan-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show setup guide if not configured */}
        {!isConfigured && (
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/50 dark:to-cyan-900/50 border border-purple-200 dark:border-purple-500/30 rounded-lg p-6 transition-colors duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Selamat Datang di CyberHook! 🚀
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Untuk memulai, silakan konfigurasi webhook Discord Anda di bawah ini.
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pastikan Anda sudah memiliki webhook URL dari Discord server Anda.
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <WebhookConfig 
              config={currentConfig} 
              onConfigChange={updateConfig}
            />
            
            {isConfigured && (
              <>
                <EmbedBuilder 
                  embeds={embeds}
                  onEmbedsChange={setEmbeds}
                />
                
                <MessageInput
                  onSendMessage={handleSendMessage}
                  embeds={embeds}
                  isLoading={isLoading}
                  isConfigured={isConfigured}
                />
                
                <StatusBar
                  isConnected={isConfigured}
                  lastSentTime={lastSentTime}
                  rateLimitRemaining={rateLimitRemaining}
                  isLoading={isLoading}
                />
              </>
            )}
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 dark:text-red-400 font-medium">Error:</span>
                  <span className="text-red-700 dark:text-red-300">{error}</span>
                </div>
              </div>
            )}

            {!isConfigured && (
              <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center transition-colors duration-300">
                <div className="text-gray-600 dark:text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <p className="text-lg font-medium mb-2">Konfigurasi Diperlukan</p>
                  <p className="text-sm">
                    Silakan masukkan URL webhook Discord di atas untuk mulai mengirim pesan.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <MessageHistory 
              messages={messages}
              onClearHistory={clearMessages}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                CyberHook - Professional Discord Webhook Manager
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Built for cybersecurity communities with security and reliability in mind
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>🔒 Secure</span>
              <span>⚡ Fast</span>
              <span>🛡️ Reliable</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              <strong>Copyright © 2024 ANDRI Zerodaysec - All Rights Reserved</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-600 text-xs mt-1">
              <a 
                href="https://github.com/odaysec/CyberHook" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-400 dark:hover:text-gray-400 transition-colors"
              >
                https://github.com/odaysec/CyberHook
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;