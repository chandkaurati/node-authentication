
function verifyEmailTemplate(verificationUrl: string) {
  return `
    <h2>Verify your email</h2>

    <p>Please click the button below to verify your email.</p>

    <a href="${verificationUrl}">
      Verify Email
    </a>

    <p>This link will expire in 1 day.</p>
  `;
}

export default verifyEmailTemplate
