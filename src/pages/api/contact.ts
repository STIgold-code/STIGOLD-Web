import type { APIRoute } from 'astro';
import { prisma } from '../../lib/db';
import { sendContactEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message, lang = 'es' } = body;

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (typeof name !== 'string' || name.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Invalid name' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (typeof message !== 'string' || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    await prisma.contactMessage.create({
      data: { name, email, message, lang },
    });

    // Send email notification
    try {
      await sendContactEmail({ name, email, message, lang });
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error('Failed to send email notification:', emailError);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
