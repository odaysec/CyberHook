import React, { useState } from 'react';
import { 
  Book, 
  Code, 
  Settings, 
  Shield, 
  Zap, 
  Globe, 
  ChevronRight, 
  ChevronDown,
  Copy,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface DocsSectionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  defaultOpen?: boolean;
}

const DocsSection: React.FC<DocsSectionProps> = ({ title, children, icon, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 p-4 flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 bg-white dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-400">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const DocsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Book className="w-12 h-12 text-purple-500 dark:text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            CyberHook Documentation
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Comprehensive guide for using and integrating CyberHook Discord Webhook Manager
        </p>
      </div>

      {/* Quick Start */}
      <div className="mb-8">
        <DocsSection
          title="🚀 Quick Start"
          icon={<Zap className="w-6 h-6 text-yellow-500" />}
          defaultOpen={true}
        >
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Getting Started</h4>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    Follow these steps to start sending messages to Discord through webhooks.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">1. Setup Discord Webhook</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Open Discord and select your server/channel</li>
                  <li>Go to Channel Settings → Integrations → Webhooks</li>
                  <li>Click "Create Webhook" or "New Webhook"</li>
                  <li>Copy the webhook URL</li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">2. Configure CyberHook</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Paste webhook URL in configuration</li>
                  <li>Set bot username (optional)</li>
                  <li>Set avatar URL (optional)</li>
                  <li>Click "Save Configuration"</li>
                </ol>
              </div>
            </div>
          </div>
        </DocsSection>
      </div>

      {/* API Reference */}
      <div className="mb-8">
        <DocsSection
          title="📡 API Reference"
          icon={<Code className="w-6 h-6 text-green-500" />}
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Discord Webhook API</h3>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">Basic Message</h4>
              <CodeBlock
                language="javascript"
                code={`// Send a simple message
const payload = {
  content: "Hello, World!",
  username: "CyberHook",
  avatar_url: "https://example.com/avatar.png"
};

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});`}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">Rich Embed Message</h4>
              <CodeBlock
                language="javascript"
                code={`// Send message with embed
const payload = {
  content: "Check this embed!",
  username: "CyberHook",
  embeds: [{
    title: "Security Alert",
    description: "Suspicious activity detected",
    color: 16711680, // Red color
    fields: [
      {
        name: "IP Address",
        value: "192.168.1.100",
        inline: true
      },
      {
        name: "Attempts",
        value: "15",
        inline: true
      }
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "CyberSec Monitoring"
    }
  }]
};`}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">File Upload</h4>
              <CodeBlock
                language="javascript"
                code={`// Send message with file attachment
const formData = new FormData();
formData.append('payload_json', JSON.stringify({
  content: "File attachment",
  username: "CyberHook"
}));
formData.append('files[0]', fileBlob, 'filename.png');

fetch(webhookUrl, {
  method: 'POST',
  body: formData
});`}
              />
            </div>
          </div>
        </DocsSection>
      </div>

      {/* Integration Examples */}
      <div className="mb-8">
        <DocsSection
          title="🔌 Integration Examples"
          icon={<Globe className="w-6 h-6 text-blue-500" />}
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Node.js Integration</h3>
            <CodeBlock
              language="javascript"
              code={`const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/send-discord', async (req, res) => {
  try {
    const { webhookUrl, message, embeds } = req.body;
    
    const response = await axios.post(webhookUrl, {
      content: message,
      username: 'Backend Bot',
      embeds: embeds
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000);`}
            />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mt-8">Python Integration</h3>
            <CodeBlock
              language="python"
              code={`import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/send-discord', methods=['POST'])
def send_discord():
    data = request.json
    webhook_url = data.get('webhookUrl')
    message = data.get('message')
    
    payload = {
        'content': message,
        'username': 'Python Bot'
    }
    
    try:
        response = requests.post(webhook_url, json=payload)
        response.raise_for_status()
        return jsonify({'success': True})
    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)`}
            />
          </div>
        </DocsSection>
      </div>

      {/* Security Best Practices */}
      <div className="mb-8">
        <DocsSection
          title="🔒 Security & Best Practices"
          icon={<Shield className="w-6 h-6 text-red-500" />}
        >
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2">Security Warning</h4>
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    Never expose webhook URLs in client-side code. Always use environment variables or backend proxies.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">❌ Don't Do This</h4>
                <CodeBlock
                  language="javascript"
                  code={`// BAD: Exposing webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/123/abc';`}
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">✅ Do This Instead</h4>
                <CodeBlock
                  language="javascript"
                  code={`// GOOD: Use environment variables
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

// BETTER: Use backend proxy
fetch('/api/send-discord', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' })
});`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">Rate Limiting</h4>
              <CodeBlock
                language="javascript"
                code={`// Implement rate limiting
class RateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    const validRequests = userRequests.filter(
      time => now - time < this.windowMs
    );
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}`}
              />
            </div>
          </div>
        </DocsSection>
      </div>

      {/* Troubleshooting */}
      <div className="mb-8">
        <DocsSection
          title="🛠️ Troubleshooting"
          icon={<Settings className="w-6 h-6 text-orange-500" />}
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">Common Issues</h4>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Rate Limit Exceeded (429)</h5>
                  <p className="text-yellow-800 dark:text-yellow-300 text-sm mb-2">
                    Discord limits webhook requests to prevent spam.
                  </p>
                  <ul className="list-disc list-inside text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                    <li>Wait 2 seconds between requests</li>
                    <li>Implement queue system for batch messages</li>
                    <li>Monitor rate limit headers</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                  <h5 className="font-semibold text-red-900 dark:text-red-200 mb-2">Invalid Webhook URL</h5>
                  <p className="text-red-800 dark:text-red-300 text-sm mb-2">
                    Webhook URL format is incorrect.
                  </p>
                  <ul className="list-disc list-inside text-red-800 dark:text-red-300 text-sm space-y-1">
                    <li>Ensure URL starts with https://discord.com/api/webhooks/</li>
                    <li>Check for extra spaces or characters</li>
                    <li>Verify webhook hasn't been deleted</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">File Upload Fails</h5>
                  <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">
                    File attachment issues.
                  </p>
                  <ul className="list-disc list-inside text-blue-800 dark:text-blue-300 text-sm space-y-1">
                    <li>File size must be under 8MB (25MB for Nitro)</li>
                    <li>Use supported file formats</li>
                    <li>Check internet connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DocsSection>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Need more help? Check out our GitHub repository or contact support.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/odaysec/CyberHook"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            GitHub Repository
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="mailto:support@zerodaysec.com"
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            Contact Support
          </a>
        </div>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
          <strong>Copyright © 2024 ANDRI Zerodaysec - All Rights Reserved</strong>
        </p>
      </div>
    </div>
  );
};