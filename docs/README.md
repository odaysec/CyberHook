# 📚 CyberHook - Dokumentasi Lengkap

<div align="center">
  <h1>🔧 Dokumentasi API & Integrasi CyberHook</h1>
  <p><strong>Panduan lengkap untuk menggunakan dan mengintegrasikan CyberHook</strong></p>
</div>

---

## 📋 Daftar Isi

1. [🚀 Pengenalan](#-pengenalan)
2. [🔧 API Reference](#-api-reference)
3. [🔌 Integrasi](#-integrasi)
4. [💡 Contoh Penggunaan](#-contoh-penggunaan)
5. [🛠️ Troubleshooting](#️-troubleshooting)
6. [📖 Best Practices](#-best-practices)
7. [🔒 Keamanan](#-keamanan)
8. [⚡ Performance](#-performance)

---

## 🚀 Pengenalan

CyberHook adalah aplikasi web yang memungkinkan pengiriman pesan ke Discord melalui webhook dengan antarmuka yang user-friendly. Dokumentasi ini mencakup semua aspek teknis dan panduan penggunaan.

### Fitur Utama
- ✅ Webhook Discord Integration
- ✅ Rich Embed Builder
- ✅ File Upload Support
- ✅ Message History
- ✅ Rate Limiting Protection
- ✅ Real-time Validation
- ✅ Responsive Design

---

## 🔧 API Reference

### Discord Webhook API

CyberHook menggunakan Discord Webhook API untuk mengirim pesan. Berikut adalah detail implementasi:

#### Endpoint
```
POST https://discord.com/api/webhooks/{webhook.id}/{webhook.token}
```

#### Headers
```javascript
{
  'Content-Type': 'multipart/form-data' // untuk file upload
  // atau
  'Content-Type': 'application/json'    // untuk pesan biasa
}
```

#### Payload Structure

##### 1. Pesan Sederhana
```javascript
{
  "content": "Hello, World!",
  "username": "CyberHook",
  "avatar_url": "https://example.com/avatar.png"
}
```

##### 2. Pesan dengan Embed
```javascript
{
  "content": "Check this embed!",
  "username": "CyberHook",
  "embeds": [
    {
      "title": "Embed Title",
      "description": "Embed description",
      "color": 7506394,
      "url": "https://example.com",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "footer": {
        "text": "Footer text",
        "icon_url": "https://example.com/footer-icon.png"
      },
      "thumbnail": {
        "url": "https://example.com/thumbnail.png"
      },
      "image": {
        "url": "https://example.com/image.png"
      },
      "author": {
        "name": "Author Name",
        "url": "https://example.com/author",
        "icon_url": "https://example.com/author-icon.png"
      },
      "fields": [
        {
          "name": "Field Name",
          "value": "Field Value",
          "inline": true
        }
      ]
    }
  ]
}
```

##### 3. Pesan dengan File
```javascript
// Menggunakan FormData
const formData = new FormData();
formData.append('payload_json', JSON.stringify({
  "content": "File attachment",
  "username": "CyberHook"
}));
formData.append('files[0]', fileBlob, 'filename.png');
```

### CyberHook Internal API

#### Types & Interfaces

```typescript
// Discord Message Type
interface DiscordMessage {
  id: string;
  content: string;
  username: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
  timestamp: Date;
  webhookUrl: string;
  attachments?: DiscordAttachment[];
}

// Discord Embed Type
interface DiscordEmbed {
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

// Webhook Configuration
interface WebhookConfig {
  url: string;
  username: string;
  avatar_url?: string;
}

// Application State
interface AppState {
  messages: DiscordMessage[];
  currentConfig: WebhookConfig;
  isLoading: boolean;
  lastSentTime: number;
  rateLimitRemaining: number;
}
```

#### Utility Functions

```typescript
// Validasi URL Webhook
export const validateWebhookUrl = (url: string): boolean => {
  const webhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
  return webhookRegex.test(url);
};

// Validasi Pesan
export const validateMessage = (content: string, embeds: DiscordEmbed[] = []): string | null => {
  if (!content.trim() && embeds.length === 0) {
    return 'Message content or embed is required';
  }
  
  if (content.length > MAX_MESSAGE_LENGTH) {
    return `Message content cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
  }
  
  return null;
};

// Konversi Hex ke Decimal untuk Warna
export const hexToDecimal = (hex: string): number => {
  return parseInt(hex.replace('#', ''), 16);
};

// Format Timestamp
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
```

---

## 🔌 Integrasi

### 1. Integrasi dengan Website Existing

#### Embed CyberHook sebagai Widget
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Embed CyberHook dalam iframe -->
    <iframe 
        src="https://cyberhook.vercel.app" 
        width="100%" 
        height="600"
        frameborder="0">
    </iframe>
</body>
</html>
```

#### Integrasi dengan JavaScript
```javascript
// Kirim pesan melalui CyberHook API
async function sendDiscordMessage(webhookUrl, message) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: message,
      username: 'My Website Bot'
    })
  });
  
  return response.ok;
}

// Contoh penggunaan
sendDiscordMessage(
  'https://discord.com/api/webhooks/123/abc',
  'Hello from my website!'
);
```

### 2. Integrasi dengan Backend

#### Node.js Express
```javascript
const express = require('express');
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
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### Python Flask
```python
import requests
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
    app.run(debug=True)
```

### 3. Integrasi dengan CI/CD

#### GitHub Actions
```yaml
name: Deploy Notification
on:
  push:
    branches: [main]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send Discord Notification
        run: |
          curl -X POST "${{ secrets.DISCORD_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{
              "content": "🚀 New deployment to production!",
              "username": "GitHub Actions",
              "embeds": [{
                "title": "Deployment Success",
                "description": "Branch: ${{ github.ref_name }}\nCommit: ${{ github.sha }}",
                "color": 65280,
                "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.000Z)'"
              }]
            }'
```

---

## 💡 Contoh Penggunaan

### 1. Notifikasi Keamanan
```javascript
const securityAlert = {
  "content": "🚨 **SECURITY ALERT** 🚨",
  "username": "Security Bot",
  "embeds": [{
    "title": "Suspicious Activity Detected",
    "description": "Multiple failed login attempts detected",
    "color": 16711680, // Red
    "fields": [
      {
        "name": "IP Address",
        "value": "192.168.1.100",
        "inline": true
      },
      {
        "name": "Attempts",
        "value": "15",
        "inline": true
      },
      {
        "name": "Time",
        "value": "2024-01-01 10:30:00",
        "inline": true
      }
    ],
    "footer": {
      "text": "CyberSec Monitoring System"
    },
    "timestamp": new Date().toISOString()
  }]
};
```

### 2. Status Update
```javascript
const statusUpdate = {
  "content": "📊 **System Status Update**",
  "username": "Status Bot",
  "embeds": [{
    "title": "All Systems Operational",
    "description": "All services are running normally",
    "color": 65280, // Green
    "fields": [
      {
        "name": "🌐 Website",
        "value": "✅ Online",
        "inline": true
      },
      {
        "name": "🗄️ Database",
        "value": "✅ Connected",
        "inline": true
      },
      {
        "name": "🔒 Security",
        "value": "✅ Protected",
        "inline": true
      }
    ],
    "thumbnail": {
      "url": "https://example.com/status-icon.png"
    }
  }]
};
```

### 3. Log Monitoring
```javascript
const logAlert = {
  "content": "📝 **Log Alert**",
  "username": "Log Monitor",
  "embeds": [{
    "title": "Error Rate Spike Detected",
    "description": "Error rate has increased by 300% in the last 5 minutes",
    "color": 16776960, // Yellow
    "fields": [
      {
        "name": "Current Error Rate",
        "value": "12.5%",
        "inline": true
      },
      {
        "name": "Normal Rate",
        "value": "3.1%",
        "inline": true
      },
      {
        "name": "Affected Service",
        "value": "API Gateway",
        "inline": true
      }
    ],
    "image": {
      "url": "https://example.com/error-graph.png"
    }
  }]
};
```

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. Webhook URL Invalid
**Problem**: Error "Invalid webhook URL format"
**Solution**: 
- Pastikan URL mengikuti format: `https://discord.com/api/webhooks/{id}/{token}`
- Periksa tidak ada spasi atau karakter tambahan
- Pastikan webhook belum dihapus dari Discord

#### 2. Rate Limit Exceeded
**Problem**: Error 429 "Too Many Requests"
**Solution**:
- Tunggu 2 detik antara setiap pengiriman
- Implementasikan queue system untuk pesan batch
- Monitor rate limit remaining

```javascript
// Rate limit handler
const rateLimitHandler = {
  lastSent: 0,
  delay: 2000, // 2 seconds
  
  async send(webhookUrl, payload) {
    const now = Date.now();
    const timeSinceLastSent = now - this.lastSent;
    
    if (timeSinceLastSent < this.delay) {
      await new Promise(resolve => 
        setTimeout(resolve, this.delay - timeSinceLastSent)
      );
    }
    
    this.lastSent = Date.now();
    return fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
};
```

#### 3. File Upload Fails
**Problem**: File tidak ter-upload atau error 413
**Solution**:
- Pastikan file size < 8MB (25MB untuk Nitro)
- Gunakan format file yang didukung
- Periksa koneksi internet

#### 4. Embed Tidak Muncul
**Problem**: Embed tidak tampil di Discord
**Solution**:
- Periksa struktur JSON embed
- Pastikan color dalam format decimal
- Validasi URL untuk image/thumbnail

#### 5. CORS Error
**Problem**: CORS error saat integrasi
**Solution**:
```javascript
// Gunakan proxy atau server-side request
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const webhookUrl = 'https://discord.com/api/webhooks/...';

fetch(proxyUrl + webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

### Debug Mode

Aktifkan debug mode untuk troubleshooting:

```javascript
// Tambahkan di localStorage
localStorage.setItem('cyberhook_debug', 'true');

// Atau di console
window.CYBERHOOK_DEBUG = true;
```

---

## 📖 Best Practices

### 1. Message Design
- **Gunakan embed** untuk pesan yang terstruktur
- **Batasi field count** maksimal 25 fields per embed
- **Gunakan color coding** untuk kategori pesan
- **Tambahkan timestamp** untuk tracking

### 2. Rate Limiting
- **Implementasikan delay** 2 detik antar pesan
- **Batch messages** untuk volume tinggi
- **Monitor rate limit** remaining
- **Gunakan queue system** untuk reliability

### 3. Error Handling
```javascript
async function sendMessageWithRetry(webhookUrl, payload, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) return response;
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        const retryAfter = response.headers.get('Retry-After') || 2;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 4. Security
- **Jangan expose webhook URL** di client-side code
- **Gunakan environment variables** untuk webhook URLs
- **Implementasikan authentication** untuk API endpoints
- **Validate input** sebelum mengirim ke Discord

### 5. Performance
- **Compress images** sebelum upload
- **Lazy load** message history
- **Debounce** user input
- **Cache** webhook configurations

---

## 🔒 Keamanan

### Webhook URL Protection
```javascript
// ❌ JANGAN: Expose webhook URL di frontend
const webhookUrl = 'https://discord.com/api/webhooks/123/abc';

// ✅ BAIK: Gunakan environment variable
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

// ✅ LEBIH BAIK: Gunakan backend proxy
const response = await fetch('/api/send-discord', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' })
});
```

### Input Validation
```javascript
function validateInput(content, embeds) {
  // Sanitize content
  const sanitizedContent = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim();
  
  // Validate length
  if (sanitizedContent.length > 2000) {
    throw new Error('Content too long');
  }
  
  // Validate embeds
  if (embeds.length > 10) {
    throw new Error('Too many embeds');
  }
  
  return { content: sanitizedContent, embeds };
}
```

### Rate Limit Protection
```javascript
class RateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests
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
}
```

---

## ⚡ Performance

### Optimization Tips

#### 1. Bundle Size Optimization
```javascript
// Lazy load components
const EmbedBuilder = React.lazy(() => import('./components/EmbedBuilder'));

// Tree shaking untuk icons
import { Send, Settings } from 'lucide-react';
// Jangan: import * as Icons from 'lucide-react';
```

#### 2. Memory Management
```javascript
// Cleanup message history
const MAX_MESSAGES = 100;

function addMessage(newMessage, messages) {
  return [newMessage, ...messages].slice(0, MAX_MESSAGES);
}

// Cleanup file URLs
useEffect(() => {
  return () => {
    attachments.forEach(file => {
      if (file.url.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
      }
    });
  };
}, [attachments]);
```

#### 3. Network Optimization
```javascript
// Compress images before upload
async function compressImage(file, maxWidth = 800, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
}
```

### Performance Monitoring
```javascript
// Monitor performance
const performanceMonitor = {
  startTime: 0,
  
  start() {
    this.startTime = performance.now();
  },
  
  end(operation) {
    const duration = performance.now() - this.startTime;
    console.log(`${operation} took ${duration.toFixed(2)}ms`);
    
    // Send to analytics if needed
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${operation}`);
    }
  }
};

// Usage
performanceMonitor.start();
await sendMessage(content, embeds);
performanceMonitor.end('Send Message');
```

---

## 📞 Support & Kontribusi

### Mendapatkan Bantuan
- 📧 **Email**: support@zerodaysec.com
- 💬 **Discord**: [Join our server](https://discord.gg/zerodaysec)
- 🐛 **Issues**: [GitHub Issues](https://github.com/odaysec/CyberHook/issues)
- 📖 **Wiki**: [GitHub Wiki](https://github.com/odaysec/CyberHook/wiki)

### Kontribusi
1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

### Development Setup
```bash
# Clone repository
git clone https://github.com/odaysec/CyberHook.git
cd CyberHook

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

<div align="center">
  <h2>🎯 Kesimpulan</h2>
  <p>Dokumentasi ini mencakup semua aspek teknis CyberHook. Untuk pertanyaan lebih lanjut, silakan hubungi tim support atau buat issue di GitHub.</p>
  
  <p><strong>Copyright © 2024 ANDRI Zerodaysec - All Rights Reserved</strong></p>
  
  <p>
    <a href="https://github.com/odaysec/CyberHook">🔗 GitHub Repository</a> |
    <a href="https://cyberhook.vercel.app">🚀 Live Demo</a> |
    <a href="mailto:support@zerodaysec.com">📧 Support</a>
  </p>
</div>