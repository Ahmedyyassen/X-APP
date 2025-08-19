export const verifyAccountTemplate = (otp) => {
    const code = `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
        text-align: center;
      ">
        <div style="
          max-width: 500px;
          margin: auto;
          background: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        ">
          <h2 style="color: #0d6efd; margin-bottom: 10px;">Email Verification</h2>
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">
            Use the following One-Time Password (OTP) to complete your verification process. 
            This code is valid for <strong>3 minutes</strong>.
          </p>
          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #0d6efd;
            margin: 20px 0;
          ">
            ${otp}
          </div>
          <p style="color: #666; font-size: 13px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 15px;">
          &copy; ${new Date().getFullYear()} BoomShop. All rights reserved.
        </p>
      </div>
    `;
    return code;
};
export const resetPasswordTemplate = (otp) => {
    return `
    <div style="
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
      text-align: center;
    ">
      <div style="
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      ">
        <h2 style="color: #dc3545; margin-bottom: 10px;">Password Reset</h2>
        <p style="color: #333; font-size: 15px; margin-bottom: 20px;">
          We received a request to reset your password for your BoomShop account.  
          Use the following One-Time Password (OTP) to reset your password.  
          This code is valid for <strong>3 minutes</strong>.
        </p>
        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #dc3545;
          margin: 20px 0;
        ">
          ${otp}
        </div>
        <p style="color: #666; font-size: 13px;">
          If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
      <p style="color: #999; font-size: 12px; margin-top: 15px;">
        &copy; ${new Date().getFullYear()} BoomShop. All rights reserved.
      </p>
    </div>
  `;
};
