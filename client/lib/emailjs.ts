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

/**
 * Sends enrollment form data via EmailJS
 * @param data The enrollment data object
 */
export const sendEnrollEmailJS = async (data: Record<string, any>) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_ENROLL_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS credentials are missing. Skipping enrollment email send.');
    return;
  }

  const templateParams = {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    education: data.education,
    branch: data.branch,
    graduation_year: data.graduationYear,
    experience: data.experience,
    current_role: data.currentRole || 'Not specified',
    company: data.company || 'Not specified',
    course: data.course,
    preferred_mode: data.preferredMode,
    previous_experience: data.previousExperience || 'None',
    motivation: data.motivation,
    hear_about_us: data.hearAboutUs,
    time: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return response;
  } catch (error) {
    console.error('EmailJS Enrollment Error:', error);
    throw error;
  }
};
