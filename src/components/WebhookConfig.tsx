import React, { useState, useEffect } from 'react';
import { Settings, Globe, User, Image, CheckCircle, AlertCircle } from 'lucide-react';
import { WebhookConfig as WebhookConfigType } from '../types';
import { validateWebhookUrl } from '../utils/discord';

interface WebhookConfigProps {
  config: WebhookConfigType;
  onConfigChange: (config: WebhookConfigType) => void;
  className?: string;
}

export const WebhookConfig: React.FC<WebhookConfigProps> = ({
  config,
  onConfigChange,
  className = '',
}) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [showConfig, setShowConfig] = useState(true);

  useEffect(() => {
    setLocalConfig(config);
    setIsValidUrl(validateWebhookUrl(config.url));
    if (!config.url) {
      setShowConfig(true);
    }
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl) {
      onConfigChange(localConfig);
    }
  };

  const handleUrlChange = (url: string) => {
    setLocalConfig(prev => ({ ...prev, url }));
    setIsValidUrl(validateWebhookUrl(url));
  };

  return (
    <div className={`bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <span className="text-gray-900 dark:text-gray-200 font-medium">Webhook Configuration</span>
          {isValidUrl && (
            <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm">
              ✓ Connected
            </span>
          )}
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
        >
          {showConfig ? 'Hide' : 'Show'}
        </button>
      </div>

      {!showConfig && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            {isValidUrl ? (
              <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Connected
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Not configured - Click "Show" to setup
              </span>
            )}
          </div>
          {config.username && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Bot:</span>
              <span className="text-gray-900 dark:text-gray-200 text-sm">{config.username}</span>
            </div>
          )}
        </div>
      )}

      {showConfig && (
        <div className="space-y-4">
          {!config.url && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 transition-colors duration-300">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                <strong>Cara mendapatkan Webhook URL:</strong>
              </p>
              <ol className="text-blue-600 dark:text-blue-200 text-sm mt-2 space-y-1 list-decimal list-inside">
                <li>Buka Discord dan pilih server/channel yang diinginkan</li>
                <li>Klik Settings channel → Integrations → Webhooks</li>
                <li>Klik "New Webhook" atau "Create Webhook"</li>
                <li>Copy URL webhook dan paste di bawah ini</li>
              </ol>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Discord Webhook URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={localConfig.url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/123456789/abcdefghijklmnop"
                  className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                  required
                />
                <div className="absolute right-3 top-2.5">
                  {localConfig.url && (
                    isValidUrl ? (
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                    )
                  )}
                </div>
              </div>
              {localConfig.url && !isValidUrl && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  Format URL webhook tidak valid. Pastikan URL dimulai dengan https://discord.com/api/webhooks/
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Username Bot
                </label>
                <input
                  type="text"
                  value={localConfig.username}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="CyberHook"
                  className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Avatar URL (opsional)
                </label>
                <input
                  type="url"
                  value={localConfig.avatar_url || ''}
                  onChange={(e) => setLocalConfig(prev => ({ ...prev, avatar_url: e.target.value }))}
                  placeholder="https://example.com/avatar.png"
                  className="w-full bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValidUrl}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isValidUrl ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Simpan Konfigurasi
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Masukkan URL Webhook Valid
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};