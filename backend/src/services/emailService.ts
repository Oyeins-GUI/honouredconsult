import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false 
  },
  debug: process.env.NODE_ENV === 'development', 
  logger: true 
});

// Send consultation confirmation email to user
export async function sendConsultationConfirmation(email: string, firstName: string, lastName: string) {
  try {
    const mailOptions = {
      from: `"Honoured Educational Consult" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Consultation Request has been Received!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Consultation Request Received</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2c3e50;
              margin: 0;
            }
            .content {
              margin-bottom: 30px;
            }
            .content p {
              margin: 0 0 15px 0;
            }
            .highlight {
              color: #3498db;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
            .btn {
              display: inline-block;
              background-color: #3498db;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Honoured Educational Consult</h1>
            </div>
            
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              
              <p>Thank you for choosing Honoured Consult! We have successfully received your consultation request.</p>
              
              <p>Our expert counselor will contact you within <span class="highlight">24 hours</span> to confirm your appointment and discuss your study abroad goals.</p>
              
              <p>In the meantime, if you have any urgent questions, please don't hesitate to contact us directly at:</p>
              
              <p>📞 Phone: +2347068385111<br>
              📧 Email: info@honouredconsult.com</p>
              
              <p>We look forward to helping you achieve your study abroad dreams!</p>
              
              <p>Best regards,<br>
              The Honoured Consult Team</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Honoured Educational Consult. All rights reserved.</p>
              <p>123 Education Street, Lagos, Nigeria</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Consultation confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send consultation confirmation email:', error);
    return false;
  }
}

// Send notification email to admin
export async function sendAdminNotification(email: string, firstName: string, lastName: string) {
  try {
    const mailOptions = {
      from: `"Honoured Educational Consult" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Consultation Request Received',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Consultation Request</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2c3e50;
              margin: 0;
            }
            .content {
              margin-bottom: 30px;
            }
            .content p {
              margin: 0 0 15px 0;
            }
            .highlight {
              color: #e74c3c;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Consultation Request</h1>
            </div>
            
            <div class="content">
              <p>Dear Admin,</p>
              
              <p>A new consultation request has been received from:</p>
              
              <p><strong>Name:</strong> ${firstName} ${lastName}<br>
              <strong>Email:</strong> ${email}</p>
              
              <p>Please login to the admin dashboard to review and respond to this consultation request.</p>
              
              <p>Best regards,<br>
              Honoured Consult System</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 Honoured Educational Consult. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

// Test email connection
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('✓ Email server is ready to take our messages');
    return true;
  } catch (error: any) {
    console.error('✗ Email server connection failed:', error.message);
    console.error('Please check your SMTP settings in .env file');
    console.error('For Gmail, you need an App Password (not your regular password)');
    return false;
  }
}

// Send newsletter to subscribers
export async function sendNewsletterEmail(email: string, subject: string, content: string) {
  try {
    const mailOptions = {
      from: `"Honoured Educational Consult" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #3498db;
            }
            .header h1 {
              color: #2c3e50;
              margin: 0;
            }
            .content {
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .content p {
              margin: 0 0 15px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
            .unsubscribe {
              color: #999;
              font-size: 12px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Honoured Educational Consult</h1>
            </div>
            
            <div class="content">
              ${content}
            </div>
            
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Honoured Educational Consult. All rights reserved.</p>
              <p>📞 Phone: +2347068385111 | 📧 Email: info@honouredconsult.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send newsletter email:', error);
    return false;
  }
}
