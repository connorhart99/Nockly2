/**
 * Cloudflare Worker for handling contact form submissions
 * You'll need to set up the following in your Cloudflare Worker:
 * 1. Environment variables or secrets:
 *    - EMAIL_SERVICE (e.g., "sendgrid", "mailgun")
 *    - API_KEY (your email service API key)
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleCORS(request)
  }

  // Only accept POST requests for actual form submissions
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  if (request.url.endsWith('/contact')) {
    try {
      // Parse the JSON body
      const data = await request.json()
      
      // Validate required fields
      if (!data.name || !data.email || !data.message || !data.recipient) {
        return jsonResponse({ error: 'Missing required fields' }, 400)
      }
      
      // Send the email using your preferred service
      const emailResult = await sendEmail(data)
      
      if (emailResult.success) {
        return jsonResponse({ success: true })
      } else {
        return jsonResponse({ error: emailResult.error }, 500)
      }
    } catch (err) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }
  }
  
  return new Response('Not found', { status: 404 })
}

async function sendEmail(data) {
  // Get the email service to use from environment variables
  const emailService = EMAIL_SERVICE || 'sendgrid'
  
  if (emailService === 'sendgrid') {
    return await sendWithSendGrid(data)
  } else if (emailService === 'mailgun') {
    return await sendWithMailgun(data)
  } else {
    return { success: false, error: 'Email service not configured' }
  }
}

async function sendWithSendGrid(data) {
  const apiKey = API_KEY
  if (!apiKey) {
    return { success: false, error: 'SendGrid API key not configured' }
  }

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
    })

    if (response.status >= 200 && response.status < 300) {
      return { success: true }
    } else {
      const responseText = await response.text()
      return { success: false, error: `SendGrid API error: ${responseText}` }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function sendWithMailgun(data) {
  const apiKey = API_KEY
  if (!apiKey) {
    return { success: false, error: 'Mailgun API key not configured' }
  }

  // You would implement Mailgun API integration here
  // Similar to the SendGrid implementation above
  
  return { success: true }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}

function handleCORS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  })
} 