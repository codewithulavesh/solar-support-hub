// SELCO Solar Service Platform - Type Definitions

export type AppRole = 'end_user' | 'technician' | 'admin' | 'coordinator';

export type IssueCategory = 
  | 'no_light' 
  | 'weak_light' 
  | 'battery_problem' 
  | 'panel_damage' 
  | 'wiring_issue' 
  | 'inverter_problem' 
  | 'controller_issue' 
  | 'other';

export type TicketPriority = 'normal' | 'urgent' | 'emergency';

export type TicketStatus = 
  | 'submitted' 
  | 'assigned' 
  | 'accepted' 
  | 'on_the_way' 
  | 'arrived' 
  | 'in_progress' 
  | 'completed' 
  | 'closed' 
  | 'cancelled' 
  | 'escalated';

export type SolarSystemType = 
  | 'home_light' 
  | 'enterprise' 
  | 'street_light' 
  | 'water_pump' 
  | 'custom';

export type SystemHealth = 'good' | 'fair' | 'needs_attention' | 'critical';

export type WarrantyStatus = 'active' | 'expired' | 'void';

export type TechnicianStatus = 'online' | 'offline' | 'busy' | 'on_leave';

export type PerformanceLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export type SkillLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type PaymentMethod = 'cash' | 'online' | 'upi' | 'bank_transfer';

export type NotificationType = 
  | 'service_update' 
  | 'system_alert' 
  | 'payment_reminder' 
  | 'promotional' 
  | 'training' 
  | 'job_available' 
  | 'job_assigned'
  | 'performance' 
  | 'escalation' 
  | 'general';

export type ResolutionStatus = 'fully_resolved' | 'partially_resolved' | 'not_resolved' | 'escalated';

export type LanguagePreference = 'kannada' | 'english' | 'hindi' | 'marathi' | 'tamil';

// Database table types
export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  language_preference: LanguagePreference;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface SolarSystem {
  id: string;
  system_id: string;
  owner_id: string | null;
  system_type: SolarSystemType;
  installation_date: string | null;
  installer_name: string | null;
  installation_address: string | null;
  latitude: number | null;
  longitude: number | null;
  cluster: string | null;
  panel_brand: string | null;
  panel_model: string | null;
  panel_wattage: number | null;
  panel_quantity: number | null;
  battery_type: string | null;
  battery_capacity_ah: number | null;
  battery_voltage: number | null;
  battery_brand: string | null;
  inverter_model: string | null;
  inverter_capacity: number | null;
  controller_type: string | null;
  controller_rating: number | null;
  num_lights: number | null;
  num_appliances: number | null;
  total_capacity_watts: number | null;
  expected_daily_generation_kwh: number | null;
  health_status: SystemHealth;
  warranty_status: WarrantyStatus;
  warranty_start_date: string | null;
  warranty_end_date: string | null;
  last_service_date: string | null;
  next_maintenance_date: string | null;
  installation_certificate_url: string | null;
  warranty_document_url: string | null;
  system_diagram_url: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Technician {
  id: string;
  user_id: string;
  employee_id: string | null;
  date_of_birth: string | null;
  gender: string | null;
  languages_spoken: string[] | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  join_date: string | null;
  experience_years: number | null;
  employment_type: string | null;
  specializations: string[] | null;
  tools_owned: string[] | null;
  status: TechnicianStatus;
  current_latitude: number | null;
  current_longitude: number | null;
  last_location_update: string | null;
  service_radius_km: number | null;
  service_areas: string[] | null;
  working_hours: Record<string, { start: string; end: string }> | null;
  max_jobs_per_day: number | null;
  performance_level: PerformanceLevel;
  total_jobs_completed: number;
  average_rating: number;
  total_ratings: number;
  on_time_rate: number;
  first_fix_rate: number;
  total_earnings: number;
  pending_earnings: number;
  id_proof_url: string | null;
  address_proof_url: string | null;
  police_verification_url: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  upi_id: string | null;
  is_women_led: boolean;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  profile?: Profile;
}

export interface TechnicianSkill {
  id: string;
  technician_id: string;
  skill_name: string;
  skill_level: SkillLevel;
  certified: boolean;
  certification_date: string | null;
  certification_expiry: string | null;
  certificate_url: string | null;
  created_at: string;
}

export interface Ticket {
  id: string;
  ticket_number: string;
  customer_id: string | null;
  system_id: string | null;
  issue_category: IssueCategory;
  issue_description: string | null;
  voice_note_url: string | null;
  priority: TicketPriority;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  assigned_technician_id: string | null;
  assigned_at: string | null;
  accepted_at: string | null;
  status: TicketStatus;
  sla_response_deadline: string | null;
  sla_resolution_deadline: string | null;
  first_response_at: string | null;
  resolution_status: ResolutionStatus | null;
  resolution_notes: string | null;
  work_performed: string | null;
  parts_cost: number | null;
  labor_cost: number | null;
  total_cost: number | null;
  technician_eta: string | null;
  arrived_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  customer_rating: number | null;
  customer_feedback: string | null;
  customer_signature_url: string | null;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  payment_received_at: string | null;
  is_escalated: boolean;
  escalated_to: string | null;
  escalation_reason: string | null;
  escalated_at: string | null;
  is_reopened: boolean;
  reopened_from_ticket_id: string | null;
  follow_up_required: boolean;
  follow_up_date: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  customer?: Profile;
  system?: SolarSystem;
  technician?: Technician;
}

export interface TicketPhoto {
  id: string;
  ticket_id: string;
  photo_url: string;
  photo_type: 'customer_upload' | 'before' | 'during' | 'after';
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface TicketStatusHistory {
  id: string;
  ticket_id: string;
  old_status: TicketStatus | null;
  new_status: TicketStatus;
  changed_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  read_at: string | null;
  action_url: string | null;
  created_at: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  working_hours: string | null;
  is_active: boolean;
  created_at: string;
}

// UI helper types
export const ISSUE_CATEGORY_LABELS: Record<IssueCategory, string> = {
  no_light: 'No Light',
  weak_light: 'Weak Light',
  battery_problem: 'Battery Problem',
  panel_damage: 'Panel Damage',
  wiring_issue: 'Wiring Issue',
  inverter_problem: 'Inverter Problem',
  controller_issue: 'Controller Issue',
  other: 'Other',
};

export const ISSUE_CATEGORY_ICONS: Record<IssueCategory, string> = {
  no_light: '💡',
  weak_light: '🔅',
  battery_problem: '🔋',
  panel_damage: '☀️',
  wiring_issue: '🔌',
  inverter_problem: '⚡',
  controller_issue: '🎛️',
  other: '❓',
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  submitted: 'Submitted',
  assigned: 'Assigned',
  accepted: 'Accepted',
  on_the_way: 'On the Way',
  arrived: 'Arrived',
  in_progress: 'In Progress',
  completed: 'Completed',
  closed: 'Closed',
  cancelled: 'Cancelled',
  escalated: 'Escalated',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  normal: 'Normal',
  urgent: 'Urgent',
  emergency: 'Emergency',
};

export const SYSTEM_TYPE_LABELS: Record<SolarSystemType, string> = {
  home_light: 'Home Light System',
  enterprise: 'Enterprise System',
  street_light: 'Street Light',
  water_pump: 'Water Pump',
  custom: 'Custom System',
};

export const HEALTH_STATUS_LABELS: Record<SystemHealth, string> = {
  good: 'Good',
  fair: 'Fair',
  needs_attention: 'Needs Attention',
  critical: 'Critical',
};

export const LANGUAGE_LABELS: Record<LanguagePreference, string> = {
  kannada: 'ಕನ್ನಡ',
  english: 'English',
  hindi: 'हिंदी',
  marathi: 'मराठी',
  tamil: 'தமிழ்',
};
