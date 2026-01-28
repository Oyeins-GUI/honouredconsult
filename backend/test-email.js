const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Import email service
const emailService = require("./dist/services/emailService");

// Test function
async function testEmail() {
  console.log("Testing email functionality...\n");

  // Test connection
  console.log("1. Testing email server connection...");
  const connectionTest = await emailService.testEmailConnection();
  console.log(`Result: ${connectionTest ? "✅ Success" : "❌ Failed"}\n`);

  // Test sending confirmation email
  if (connectionTest) {
    console.log("2. Testing consultation confirmation email...");
    const confirmationTest = await emailService.sendConsultationConfirmation(
      "test@example.com",
      "John",
      "Doe",
    );
    console.log(`Result: ${confirmationTest ? "✅ Success" : "❌ Failed"}\n`);

    // Test sending admin notification
    console.log("3. Testing admin notification email...");
    const adminTest = await emailService.sendAdminNotification(
      "test@example.com",
      "John",
      "Doe",
    );
    console.log(`Result: ${adminTest ? "✅ Success" : "❌ Failed"}\n`);
  }

  console.log("Email functionality test completed!");
}

// Run test
testEmail().catch((error) => {
  console.error("Error in testEmail:", error);
  process.exit(1);
});
