import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the form data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // The form submission will be handled by Cloudflare Forms directly
    // This endpoint is just for validation
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form validation error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
} 