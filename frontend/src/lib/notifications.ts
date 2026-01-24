import { notificationsAPI } from './api';

interface ConsultationData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country?: string
  destination?: string
  service?: string
  message?: string
  submittedAt: string
  status: string
}

interface NotificationSettings {
  ownerEmail?: string
  enableNotifications: boolean
  notifyOnSubmission: boolean
}

export async function sendConsultationNotification(consultation: ConsultationData): Promise<void> {
  try {
    const settings = await getNotificationSettings();

    if (!settings?.enableNotifications || !settings?.notifyOnSubmission) {
      console.log("Notifications disabled")
      return
    }

    const recipientEmail = settings.ownerEmail || 'info@honouredconsult.com'

    if (!recipientEmail) {
      console.warn("No recipient email configured for notifications")
      return
    }

    const emailContent = formatNotificationEmail(consultation, recipientEmail)

    await notificationsAPI.create({
      recipientEmail,
      subject: `New Consultation: ${consultation.firstName} ${consultation.lastName}`,
      emailContent,
      sentAt: new Date().toISOString(),
      consultationId: consultation.id,
      status: "sent"
    })

    console.log("Email notification logged successfully")
  } catch (error) {
    console.error("Failed to send email notification:", error)
    throw error
  }
}

function formatNotificationEmail(consultation: ConsultationData, recipientEmail: string): string {
  return `Subject: New Consultation Request - ${consultation.firstName} ${consultation.lastName}

Dear Honoured Consult Team,

You have received a new consultation request:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STUDENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:        ${consultation.firstName} ${consultation.lastName}
Email:       ${consultation.email}
Phone:       ${consultation.phone}
Country:     ${consultation.country || "Not specified"}
Destination: ${consultation.destination || "Not specified"}
Service:     ${consultation.service || "Not specified"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${consultation.message || "No message provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please contact this student within 24 hours to:
• Confirm their consultation appointment
• Discuss their study abroad goals
• Provide initial guidance and next steps

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date(consultation.submittedAt).toLocaleString()}
Notification sent to: ${recipientEmail}

Best regards,
Honoured Consult System`
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const response = await notificationsAPI.getSettings();
    return response.data;
  } catch (error) {
    console.error('Failed to get notification settings:', error);
    return {
      ownerEmail: 'info@honouredconsult.com',
      enableNotifications: true,
      notifyOnSubmission: true
    };
  }
}

export async function updateNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    await notificationsAPI.updateSettings(settings);
  } catch (error) {
    console.error('Failed to update notification settings:', error);
    throw error;
  }
}

export async function getNotificationHistory(): Promise<any[]> {
  try {
    const response = await notificationsAPI.getHistory();
    return response.data;
  } catch (error) {
    console.error('Failed to get notification history:', error);
    return [];
  }
}
