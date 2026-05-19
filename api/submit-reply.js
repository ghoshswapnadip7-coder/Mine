export default async function handler(req, res) {
  // Only allow POST requests for message submission
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { message, timestamp } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    // Read the email address from Vercel's secure environment variable
    const targetEmail = process.env.EMAIL_RECIPIENT || 'justgothacked108@gmail.com';

    // Format as FormSubmit parameters
    const formData = new URLSearchParams();
    formData.append("message", message);
    formData.append("_subject", "OneLastSmile - A New Memory Fragment");
    formData.append("_captcha", "false");
    if (timestamp) {
      formData.append("timestamp", timestamp);
    }

    // Forward request from backend securely
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: formData.toString()
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FormSubmit upstream error:", errorText);
      return res.status(response.status).json({ error: "Upstream submission failed." });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Secure submission endpoint failure:", error);
    return res.status(500).json({ error: "Failed to securely submit reply." });
  }
}
