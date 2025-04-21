# Nockly Contact Form Cloudflare Worker

This Cloudflare Worker handles contact form submissions for the Nockly website, sending emails via SendGrid and storing submissions in Cloudflare KV for backup.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Cloudflare**
   - Create a new Cloudflare Workers project
   - Set up a KV namespace for storing submissions
   - Add the following environment variables in the Cloudflare dashboard:
     - `EMAIL_SERVICE`: Set to "sendgrid"
     - `API_KEY`: Your SendGrid API key
   - Add the KV namespace binding in the Cloudflare dashboard

3. **Update wrangler.toml**
   - Update the `name` field with your worker name
   - Add your KV namespace ID and preview ID
   - Set your compatibility date

4. **Deploy the Worker**
   ```bash
   npm run deploy
   ```

## Development

To run the worker locally:
```bash
npm run dev
```

## Security Notes

- The API key is stored as a secret in Cloudflare Workers
- Form submissions are validated for required fields and email format
- CORS is properly configured to only allow requests from your domain
- Submissions are stored in KV for backup and audit purposes

## Environment Variables

- `EMAIL_SERVICE`: The email service to use (currently only "sendgrid" is supported)
- `API_KEY`: Your SendGrid API key
- `CONTACT_SUBMISSIONS`: KV namespace for storing form submissions

## API Endpoint

The worker exposes a single endpoint:
- `POST /contact`: Accepts contact form submissions

Request body:
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "recipient": "string"
}
```

Response:
```json
{
  "success": true
}
```
or
```json
{
  "error": "Error message"
}
``` 