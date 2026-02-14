import emailjs from '@emailjs/browser';

/**
 * Sends contact form data via EmailJS
 * @param data The form data object
 */
export const sendEmailJS = async (data: Record<string, any>) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS credentials are missing. Skipping email send.');
    return;
  }

  const templateParams = {
    name: data.name,
    email: data.email,
    phone: data.phone || 'Not provided',
    subject: data.subject,
    inquiry_type: data.inquiryType,
    message: data.message,
    time: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};
