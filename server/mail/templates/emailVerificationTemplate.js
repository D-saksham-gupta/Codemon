exports.otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <style>
      body {
        background-color: #f9fafb;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 650px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0px 6px 20px rgba(0,0,0,0.08);
      }

      .banner {
        width: 100%;
        display: block;
      }

      .content {
        padding: 30px;
        text-align: center;
      }

      h1 {
        color: #111827;
        font-size: 24px;
        margin-bottom: 10px;
      }

      p {
        margin-bottom: 16px;
        color: #4b5563;
      }

      .otp-box {
        display: inline-block;
        background: #fef3c7;
        padding: 12px 30px;
        border-radius: 8px;
        font-size: 28px;
        font-weight: bold;
        color: #b45309;
        letter-spacing: 3px;
        margin: 20px 0;
      }

      .cta {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 28px;
        background-color: yellow;
        color: black;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
      }

      .footer {
        padding: 20px;
        text-align: center;
        font-size: 14px;
        background: #f3f4f6;
        color: #6b7280;
      }

      .footer a {
        color: #2563eb;
        text-decoration: none;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <!-- Banner image -->
      <img class="banner" src="https://i.postimg.cc/K8Q87L4Q/logo1.png" style="height:400px;" alt="Welcome Banner">

      <div class="content">
        <h1>Email Verification</h1>
        <p>Hello there 👋,</p>
        <p>Thank you for signing up with <b>Codemon</b>. Please use the following OTP to verify your account:</p>
        
        <div class="otp-box">${otp}</div>
        
        <p>This OTP will expire in <b>5 minutes</b>. If you didn’t request this, please ignore this email.</p>
        
        <a href="" class="cta">Verify My Account</a>
      </div>
      
      <div class="footer">
        Need help? Contact us at <a href="mailto:info@studynotion.com">info@studynotion.com</a><br>
        &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </div>
  </body>
  </html>`;
};
