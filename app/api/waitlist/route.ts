import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: '🎮 New Waitlist Signup - ArcadeOS Gemini',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background-color: #0a0a0a;
                color: #FFFFFF;
                padding: 40px 20px;
                margin: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
                border: 1px solid #39FF14;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 0 40px rgba(57, 255, 20, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-family: sans-serif;
                font-size: 32px;
                font-weight: 800;
                letter-spacing: -1px;
                color: #ffffff;
              }
              .logo span {
                color: #39FF14;
              }
              .badge {
                display: inline-block;
                background: rgba(57, 255, 20, 0.1);
                border: 1px solid #39FF14;
                border-radius: 20px;
                padding: 6px 16px;
                font-size: 12px;
                font-weight: 600;
                color: #39FF14;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 10px;
              }
              .email-box {
                background: #121212;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
              }
              .email-text {
                font-size: 20px;
                font-weight: 600;
                color: #39FF14;
                margin: 0;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #333;
                text-align: center;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">ARCADE<span>OS</span></div>
                <div class="badge">New Gemini Waitlist Signup</div>
              </div>

              <h2 style="text-align: center; color: #fff;">🚀 A new user has entered the system!</h2>

              <div class="email-box">
                <p class="email-text">${email}</p>
              </div>

              <div class="footer">
                <p>ArcadeOS Gemini Notification</p>
                <p>Sent via Resend</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
