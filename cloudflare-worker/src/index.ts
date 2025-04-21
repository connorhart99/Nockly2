/// <reference types="@cloudflare/workers-types" />

interface Env {
  EMAIL_SERVICE: string;
  API_KEY: string;
  CONTACT_SUBMISSIONS: KVNamespace;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recipient: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const data: ContactFormData = await request.json();

      // Validate required fields
      if (!data.name || !data.email || !data.message || !data.recipient) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      // Validate email format
      if (!isValidEmail(data.email)) {
        return jsonResponse({ error: 'Invalid email format' }, 400);
      }

      // Store submission in KV for backup
      await storeSubmission(env, data);

      // Send email
      const emailResult = await sendEmail(env, data);

      if (emailResult.success) {
        return jsonResponse({ success: true });
      } else {
        console.error('Email sending failed:', emailResult.error);
        return jsonResponse({ error: 'Failed to send email' }, 500);
      }
    } catch (error) {
      console.error('Request processing error:', error);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },
};

async function storeSubmission(env: Env, data: ContactFormData): Promise<void> {
  const timestamp = new Date().toISOString();
  const key = `submission-${timestamp}`;
  await env.CONTACT_SUBMISSIONS.put(key, JSON.stringify(data));
}

async function sendEmail(env: Env, data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const emailService = env.EMAIL_SERVICE || 'sendgrid';
  const apiKey = env.API_KEY;

  if (!apiKey) {
    return { success: false, error: 'Email service not configured' };
  }

  if (emailService === 'sendgrid') {
    return await sendWithSendGrid(apiKey, data);
  } else {
    return { success: false, error: 'Unsupported email service' };
  }
}

async function sendWithSendGrid(apiKey: string, data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: data.recipient }],
            subject: `New contact form submission from ${data.name}`
          }
        ],
        from: { email: 'noreply@nockly.com', name: 'Nockly Contact Form' },
        reply_to: { email: data.email, name: data.name },
        content: [
          {
            type: 'text/plain',
            value: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
          }
        ]
      })
    });

    if (response.status >= 200 && response.status < 300) {
      return { success: true };
    } else {
      const responseText = await response.text();
      return { success: false, error: `SendGrid API error: ${responseText}` };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function handleCORS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
} 