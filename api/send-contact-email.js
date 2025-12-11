// Vercel API Route: /api/send-contact-email
// Uses Resend to send contact form submissions to oneeb590@gmail.com

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const safeMessage = String(message || '').replace(/\n/g, '<br>');
    const emailSubject = subject
      ? `New message from ${name} – ${subject}`
      : `New message from ${name} via portfolio`;

    const html = `
      <p>You just received a new message from your portfolio contact form.</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
      <hr />
      <p style="font-size:12px;color:#6b7280;">This email was sent from your portfolio site contact form.</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Oneeb Portfolio <onboarding@resend.dev>',
        to: ['oneeb590@gmail.com'],
        reply_to: email,
        subject: emailSubject,
        html,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Resend API error:', response.status, text);
      return res.status(500).json({ error: 'Failed to send message.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('API route error:', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
