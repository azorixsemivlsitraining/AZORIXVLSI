/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Stage 1: Workshop registration types
export interface WorkshopRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  domainInterest: string; // e.g., Verification | PD | DFT | Analog
  whatsappOptIn?: boolean; // consent for WhatsApp updates
}

// Stage 2: Cohort preview enrollment types
export interface CohortEnrollmentRequest {
  name: string;
  email: string;
  phone?: string;
}

export interface PaymentResponse {
  success: boolean;
  orderId?: string;
  accessToken?: string;
  message?: string;
  meetingUrl?: string | null;
}

export type ResourceType = "slide" | "recording" | "pdf" | "checklist" | "link";

export interface DashboardResourceItem {
  title: string;
  url: string;
  type: ResourceType;
  expiresAt?: string;
}

export interface DashboardResourcesResponse {
  resources: DashboardResourceItem[];
  upsellLink?: string;
}
