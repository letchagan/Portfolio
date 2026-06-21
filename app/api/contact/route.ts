import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const user = process.env.GMAIL_USER
    const appPassword = process.env.GMAIL_APP_PASSWORD
    const recipient = process.env.CONTACT_EMAIL || user

    if (!user || !appPassword) {
      console.error("Gmail credentials not configured in .env.local")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: user,
        pass: appPassword,
      },
    })

    // Email to you (notification)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 2px solid #4fd1c5; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #4fd1c5; margin: 0; font-size: 14px; letter-spacing: 3px; text-transform: uppercase;">
              New Portfolio Contact
            </h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 12px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #888; border-bottom: 1px solid #eee;">
                Name
              </td>
              <td style="padding: 8px 12px; font-size: 13px; border-bottom: 1px solid #eee;">
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #888; border-bottom: 1px solid #eee;">
                Email
              </td>
              <td style="padding: 8px 12px; font-size: 13px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #4fd1c5;">${email}</a>
              </td>
            </tr>
          </table>

          <div style="border-left: 3px solid #4fd1c5; padding-left: 16px; margin-bottom: 20px;">
            <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #888; margin: 0 0 8px;">
              Message
            </p>
            <p style="font-size: 13px; line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">
              ${message}
            </p>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 12px; font-size: 11px; color: #aaa;">
            Sent from letchagan.dev contact form
          </div>
        </div>
      `,
    })

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Letchagan" <${user}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      text: `Hi ${name},\n\nThank you for your message! I've received it and will get back to you as soon as possible.\n\nIn the meantime, feel free to check out my portfolio:\nhttps://letchagan.dev\n\nBest,\nLetchagan\n\n---\nFull Stack Developer & Cybersecurity Enthusiast`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 40px 16px;">
                <!-- Main Card -->
                <table width="520" cellpadding="0" cellspacing="0" style="max-width: 520px; width: 100%; background-color: #ffffff; border: 1px solid #e0e0e0;">

                  <!-- Top accent bar -->
                  <tr>
                    <td style="height: 4px; background: linear-gradient(90deg, #4fd1c5, #319795); font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>

                  <!-- Spacer -->
                  <tr><td style="height: 32px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- Logo / Name -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="font-family: 'Arial Black', 'Helvetica Neue', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 4px; color: #111111; text-transform: uppercase; line-height: 1;">
                            LETCHAGAN
                          </td>
                          <td align="right" style="vertical-align: bottom;">
                            <span style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 2px; color: #4fd1c5; text-transform: uppercase;">Portfolio</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr><td style="padding: 0 40px;"><div style="height: 1px; background-color: #eaeaea; margin: 16px 0;"></div></td></tr>

                  <!-- Spacer -->
                  <tr><td style="height: 8px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- Heading -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <h1 style="font-family: 'Courier New', monospace; font-size: 22px; font-weight: 700; color: #111111; margin: 0 0 6px; letter-spacing: -0.5px;">
                        Thank you, ${name}!
                      </h1>
                      <p style="font-family: 'Courier New', monospace; font-size: 12px; color: #4fd1c5; margin: 0; letter-spacing: 3px; text-transform: uppercase;">
                        Message Received
                      </p>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr><td style="height: 16px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <p style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 15px; line-height: 1.8; color: #333333; margin: 0;">
                        I&rsquo;ve received your message and will get back to you as soon as possible.
                        I typically respond within <strong style="color: #111111;">24&ndash;48 hours</strong>.
                      </p>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr><td style="height: 24px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- CTA Button -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background-color: #111111; padding: 12px 28px; border-radius: 0px;">
                            <a href="https://letchagan.dev" target="_blank" style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #ffffff; text-decoration: none; display: block;">
                              View Portfolio &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr><td style="height: 32px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- Signature -->
                  <tr>
                    <td style="padding: 0 40px;">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="width: 40px; vertical-align: top;">
                            <div style="width: 3px; height: 40px; background-color: #4fd1c5;"></div>
                          </td>
                          <td style="padding-left: 16px; vertical-align: top;">
                            <p style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 14px; color: #333333; margin: 0 0 2px;">Best regards,</p>
                            <p style="font-family: 'Arial Black', 'Helvetica Neue', sans-serif; font-size: 16px; font-weight: 900; letter-spacing: 2px; color: #111111; margin: 0; text-transform: uppercase;">Letchagan</p>
                            <p style="font-family: 'Courier New', monospace; font-size: 11px; color: #888888; margin: 4px 0 0; letter-spacing: 1px;">
                              Full Stack Developer &bull; AI &amp; Cybersecurity
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Spacer -->
                  <tr><td style="height: 32px; font-size: 0; line-height: 0;">&nbsp;</td></tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #fafafa; padding: 20px 40px;">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <p style="font-family: 'Courier New', monospace; font-size: 10px; color: #aaaaaa; margin: 0; letter-spacing: 1px;">
                              This is an automated reply. If you need immediate assistance, please email me directly.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top: 8px;">
                            <p style="font-family: 'Courier New', monospace; font-size: 10px; color: #bbbbbb; margin: 0; letter-spacing: 2px;">
                              <a href="https://letchagan.dev" style="color: #4fd1c5; text-decoration: none;">letchagan.dev</a>
                              &nbsp;&bull;&nbsp;
                              <a href="https://github.com/letchagan" style="color: #4fd1c5; text-decoration: none;">GitHub</a>
                              &nbsp;&bull;&nbsp;
                              <a href="https://www.linkedin.com/in/letchagan-a-dev/" style="color: #4fd1c5; text-decoration: none;">LinkedIn</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try emailing directly." }, { status: 500 })
  }
}
