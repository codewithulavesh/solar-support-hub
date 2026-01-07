-- =============================================
-- SELCO SOLAR SERVICE PLATFORM - COMPLETE DATABASE SCHEMA
-- =============================================

-- 1. ENUMS
-- =============================================

-- App roles enum (for user_roles table)
CREATE TYPE public.app_role AS ENUM ('end_user', 'technician', 'admin', 'coordinator');

-- Issue categories
CREATE TYPE public.issue_category AS ENUM (
  'no_light', 'weak_light', 'battery_problem', 'panel_damage', 
  'wiring_issue', 'inverter_problem', 'controller_issue', 'other'
);

-- Ticket priority
CREATE TYPE public.ticket_priority AS ENUM ('normal', 'urgent', 'emergency');

-- Ticket status
CREATE TYPE public.ticket_status AS ENUM (
  'submitted', 'assigned', 'accepted', 'on_the_way', 'arrived', 
  'in_progress', 'completed', 'closed', 'cancelled', 'escalated'
);

-- Solar system types
CREATE TYPE public.solar_system_type AS ENUM (
  'home_light', 'enterprise', 'street_light', 'water_pump', 'custom'
);

-- System health status
CREATE TYPE public.system_health AS ENUM ('good', 'fair', 'needs_attention', 'critical');

-- Warranty status
CREATE TYPE public.warranty_status AS ENUM ('active', 'expired', 'void');

-- Technician availability
CREATE TYPE public.technician_status AS ENUM ('online', 'offline', 'busy', 'on_leave');

-- Performance level
CREATE TYPE public.performance_level AS ENUM ('bronze', 'silver', 'gold', 'platinum');

-- Skill level
CREATE TYPE public.skill_level AS ENUM ('basic', 'intermediate', 'advanced', 'expert');

-- Payment status
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Payment method
CREATE TYPE public.payment_method AS ENUM ('cash', 'online', 'upi', 'bank_transfer');

-- Notification type
CREATE TYPE public.notification_type AS ENUM (
  'service_update', 'system_alert', 'payment_reminder', 
  'promotional', 'training', 'job_available', 'job_assigned',
  'performance', 'escalation', 'general'
);

-- Resolution status
CREATE TYPE public.resolution_status AS ENUM ('fully_resolved', 'partially_resolved', 'not_resolved', 'escalated');

-- Language preference
CREATE TYPE public.language_preference AS ENUM ('kannada', 'english', 'hindi', 'marathi', 'tamil');

-- =============================================
-- 2. CORE TABLES
-- =============================================

-- Profiles table (extended user info)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'User',
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'Karnataka',
  pincode TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  language_preference language_preference DEFAULT 'kannada',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles table (CRITICAL: Separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'end_user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- =============================================
-- 3. SOLAR SYSTEMS
-- =============================================

CREATE TABLE public.solar_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id TEXT UNIQUE NOT NULL, -- Human readable ID like "SELCO-BLG-2024-001"
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  system_type solar_system_type NOT NULL DEFAULT 'home_light',
  
  -- Installation details
  installation_date DATE,
  installer_name TEXT,
  installation_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  cluster TEXT, -- Geographic cluster like "Belgaum North"
  
  -- Technical specifications
  panel_brand TEXT,
  panel_model TEXT,
  panel_wattage INTEGER,
  panel_quantity INTEGER DEFAULT 1,
  battery_type TEXT,
  battery_capacity_ah INTEGER,
  battery_voltage INTEGER DEFAULT 12,
  battery_brand TEXT,
  inverter_model TEXT,
  inverter_capacity INTEGER,
  controller_type TEXT,
  controller_rating INTEGER,
  num_lights INTEGER DEFAULT 1,
  num_appliances INTEGER DEFAULT 0,
  total_capacity_watts INTEGER,
  expected_daily_generation_kwh DECIMAL(5, 2),
  
  -- Status
  health_status system_health DEFAULT 'good',
  warranty_status warranty_status DEFAULT 'active',
  warranty_start_date DATE,
  warranty_end_date DATE,
  last_service_date DATE,
  next_maintenance_date DATE,
  
  -- Documents
  installation_certificate_url TEXT,
  warranty_document_url TEXT,
  system_diagram_url TEXT,
  
  -- Metadata
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. TECHNICIANS
-- =============================================

CREATE TABLE public.technicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  employee_id TEXT UNIQUE, -- e.g., "SELCO-TECH-001"
  
  -- Personal info
  date_of_birth DATE,
  gender TEXT,
  languages_spoken TEXT[] DEFAULT ARRAY['kannada'],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  
  -- Professional details
  join_date DATE DEFAULT CURRENT_DATE,
  experience_years INTEGER DEFAULT 0,
  employment_type TEXT DEFAULT 'full-time', -- full-time, part-time, freelance
  specializations TEXT[],
  tools_owned TEXT[],
  
  -- Status & availability
  status technician_status DEFAULT 'offline',
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  last_location_update TIMESTAMPTZ,
  service_radius_km INTEGER DEFAULT 10,
  service_areas TEXT[], -- Array of cluster names
  
  -- Working hours (JSON: {"monday": {"start": "09:00", "end": "18:00"}, ...})
  working_hours JSONB,
  max_jobs_per_day INTEGER DEFAULT 5,
  
  -- Performance
  performance_level performance_level DEFAULT 'bronze',
  total_jobs_completed INTEGER DEFAULT 0,
  average_rating DECIMAL(2, 1) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  on_time_rate DECIMAL(5, 2) DEFAULT 100,
  first_fix_rate DECIMAL(5, 2) DEFAULT 100,
  
  -- Earnings
  total_earnings DECIMAL(12, 2) DEFAULT 0,
  pending_earnings DECIMAL(12, 2) DEFAULT 0,
  
  -- Documents
  id_proof_url TEXT,
  address_proof_url TEXT,
  police_verification_url TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  upi_id TEXT,
  
  -- Flags
  is_women_led BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Technician skills
CREATE TABLE public.technician_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_level skill_level DEFAULT 'basic',
  certified BOOLEAN DEFAULT FALSE,
  certification_date DATE,
  certification_expiry DATE,
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. SERVICE TICKETS
-- =============================================

CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE NOT NULL, -- e.g., "TKT-2024-00001"
  
  -- Customer & System
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  system_id UUID REFERENCES public.solar_systems(id) ON DELETE SET NULL,
  
  -- Issue details
  issue_category issue_category NOT NULL,
  issue_description TEXT,
  voice_note_url TEXT,
  priority ticket_priority DEFAULT 'normal',
  
  -- Location (can override system location)
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Assignment
  assigned_technician_id UUID REFERENCES public.technicians(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  
  -- Status tracking
  status ticket_status DEFAULT 'submitted',
  
  -- SLA
  sla_response_deadline TIMESTAMPTZ,
  sla_resolution_deadline TIMESTAMPTZ,
  first_response_at TIMESTAMPTZ,
  
  -- Resolution
  resolution_status resolution_status,
  resolution_notes TEXT,
  work_performed TEXT,
  parts_cost DECIMAL(10, 2) DEFAULT 0,
  labor_cost DECIMAL(10, 2) DEFAULT 0,
  total_cost DECIMAL(10, 2) DEFAULT 0,
  
  -- Technician arrival
  technician_eta TIMESTAMPTZ,
  arrived_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Customer feedback
  customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
  customer_feedback TEXT,
  customer_signature_url TEXT,
  
  -- Payment
  payment_status payment_status DEFAULT 'pending',
  payment_method payment_method,
  payment_received_at TIMESTAMPTZ,
  
  -- Escalation
  is_escalated BOOLEAN DEFAULT FALSE,
  escalated_to UUID REFERENCES public.technicians(id),
  escalation_reason TEXT,
  escalated_at TIMESTAMPTZ,
  
  -- Flags
  is_reopened BOOLEAN DEFAULT FALSE,
  reopened_from_ticket_id UUID,
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  
  -- Internal
  internal_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket photos
CREATE TABLE public.ticket_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  photo_type TEXT NOT NULL, -- 'customer_upload', 'before', 'during', 'after'
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket status history
CREATE TABLE public.ticket_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  old_status ticket_status,
  new_status ticket_status NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. PARTS & INVENTORY
-- =============================================

CREATE TABLE public.parts_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  part_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'panel', 'battery', 'inverter', 'controller', 'wiring', 'lights', 'other'
  brand TEXT,
  model TEXT,
  specifications JSONB,
  compatible_systems solar_system_type[],
  unit_price DECIMAL(10, 2) NOT NULL,
  photo_url TEXT,
  is_common BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.technician_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  part_id UUID REFERENCES public.parts_catalog(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  last_restocked TIMESTAMPTZ,
  UNIQUE (technician_id, part_id)
);

CREATE TABLE public.ticket_parts_used (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  part_id UUID REFERENCES public.parts_catalog(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  serial_number TEXT,
  condition TEXT DEFAULT 'new', -- 'new', 'refurbished'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. NOTIFICATIONS
-- =============================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Additional data like ticket_id, system_id, etc.
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification preferences
CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  service_updates BOOLEAN DEFAULT TRUE,
  system_alerts BOOLEAN DEFAULT TRUE,
  payment_reminders BOOLEAN DEFAULT TRUE,
  promotional BOOLEAN DEFAULT TRUE,
  training BOOLEAN DEFAULT TRUE,
  push_enabled BOOLEAN DEFAULT TRUE,
  sms_enabled BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 8. CALL LOGS
-- =============================================

CREATE TABLE public.call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID REFERENCES auth.users(id),
  recipient_id UUID REFERENCES auth.users(id),
  call_type TEXT, -- 'support', 'technician', 'emergency'
  phone_number TEXT,
  duration_seconds INTEGER,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  notes TEXT
);

-- Callback requests
CREATE TABLE public.callback_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_time TIMESTAMPTZ,
  issue_type TEXT,
  phone_number TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. EARNINGS & PAYMENTS
-- =============================================

CREATE TABLE public.technician_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  ticket_id UUID REFERENCES public.tickets(id),
  
  base_pay DECIMAL(10, 2) DEFAULT 0,
  parts_commission DECIMAL(10, 2) DEFAULT 0,
  bonus DECIMAL(10, 2) DEFAULT 0,
  urgent_premium DECIMAL(10, 2) DEFAULT 0,
  weekend_premium DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  
  payment_status payment_status DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  payment_reference TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  payment_method payment_method,
  reference_number TEXT,
  bank_transaction_id TEXT,
  status payment_status DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 10. TRAINING & SKILLS
-- =============================================

CREATE TABLE public.training_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'technical', 'safety', 'customer_service', 'general'
  skill_name TEXT,
  skill_level_granted skill_level,
  duration_hours INTEGER,
  cost DECIMAL(10, 2) DEFAULT 0,
  is_mandatory BOOLEAN DEFAULT FALSE,
  content_url TEXT,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.technician_training (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.training_courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'enrolled', -- 'enrolled', 'in_progress', 'completed', 'failed'
  progress_percent INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  score INTEGER,
  certificate_url TEXT,
  trainer_feedback TEXT,
  UNIQUE (technician_id, course_id)
);

-- =============================================
-- 11. KNOWLEDGE BASE
-- =============================================

CREATE TABLE public.knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT, -- 'troubleshooting', 'safety', 'best_practices', 'parts', 'faq'
  issue_type issue_category,
  difficulty_level skill_level DEFAULT 'basic',
  estimated_time_minutes INTEGER,
  required_tools TEXT[],
  required_parts TEXT[],
  video_url TEXT,
  pdf_url TEXT,
  audio_url TEXT,
  language language_preference DEFAULT 'english',
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 12. SLA CONFIGURATION
-- =============================================

CREATE TABLE public.sla_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_category issue_category,
  priority ticket_priority NOT NULL,
  response_time_hours INTEGER NOT NULL,
  resolution_time_hours INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default SLA configurations
INSERT INTO public.sla_configurations (issue_category, priority, response_time_hours, resolution_time_hours) VALUES
(NULL, 'emergency', 1, 4),
(NULL, 'urgent', 2, 24),
(NULL, 'normal', 4, 48);

-- =============================================
-- 13. OFFICE LOCATIONS
-- =============================================

CREATE TABLE public.office_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'Karnataka',
  pincode TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  working_hours TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Belgaum office
INSERT INTO public.office_locations (name, city, phone) VALUES
('SELCO Belgaum', 'Belgaum', '+91-831-XXXXXXX');

-- =============================================
-- 14. ENABLE RLS ON ALL TABLES
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_parts_used ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technician_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sla_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 15. SECURITY DEFINER FUNCTIONS
-- =============================================

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user's primary role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role 
      WHEN 'admin' THEN 1 
      WHEN 'coordinator' THEN 2 
      WHEN 'technician' THEN 3 
      ELSE 4 
    END
  LIMIT 1
$$;

-- Function to check if user is admin or coordinator
CREATE OR REPLACE FUNCTION public.is_admin_or_coordinator(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'coordinator')
  )
$$;

-- Function to get technician ID from user ID
CREATE OR REPLACE FUNCTION public.get_technician_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.technicians WHERE user_id = _user_id LIMIT 1
$$;

-- =============================================
-- 16. RLS POLICIES
-- =============================================

-- PROFILES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin_or_coordinator(auth.uid()));

CREATE POLICY "Technicians can view customer profiles for their tickets"
  ON public.profiles FOR SELECT
  USING (
    public.has_role(auth.uid(), 'technician') AND
    EXISTS (
      SELECT 1 FROM public.tickets t
      JOIN public.technicians tech ON tech.id = t.assigned_technician_id
      WHERE t.customer_id = profiles.id AND tech.user_id = auth.uid()
    )
  );

-- USER ROLES
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- SOLAR SYSTEMS
CREATE POLICY "Users can view their own systems"
  ON public.solar_systems FOR SELECT
  USING (owner_id = auth.uid());

CREATE POLICY "Users can update their own systems"
  ON public.solar_systems FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can insert their own systems"
  ON public.solar_systems FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Admins can manage all systems"
  ON public.solar_systems FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

CREATE POLICY "Technicians can view systems for their tickets"
  ON public.solar_systems FOR SELECT
  USING (
    public.has_role(auth.uid(), 'technician') AND
    EXISTS (
      SELECT 1 FROM public.tickets t
      JOIN public.technicians tech ON tech.id = t.assigned_technician_id
      WHERE t.system_id = solar_systems.id AND tech.user_id = auth.uid()
    )
  );

-- TECHNICIANS
CREATE POLICY "Technicians can view and update their own record"
  ON public.technicians FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all technicians"
  ON public.technicians FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

CREATE POLICY "End users can view assigned technician basic info"
  ON public.technicians FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.assigned_technician_id = technicians.id 
      AND t.customer_id = auth.uid()
    )
  );

-- TECHNICIAN SKILLS
CREATE POLICY "Technicians can manage their own skills"
  ON public.technician_skills FOR ALL
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Admins can manage all skills"
  ON public.technician_skills FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

CREATE POLICY "Anyone can view technician skills"
  ON public.technician_skills FOR SELECT
  USING (TRUE);

-- TICKETS
CREATE POLICY "Customers can view their own tickets"
  ON public.tickets FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update their own tickets"
  ON public.tickets FOR UPDATE
  USING (customer_id = auth.uid() AND status IN ('submitted', 'assigned'));

CREATE POLICY "Technicians can view available tickets in their area"
  ON public.tickets FOR SELECT
  USING (
    public.has_role(auth.uid(), 'technician') AND 
    (assigned_technician_id IS NULL OR assigned_technician_id = public.get_technician_id(auth.uid()))
  );

CREATE POLICY "Technicians can update assigned tickets"
  ON public.tickets FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'technician') AND 
    assigned_technician_id = public.get_technician_id(auth.uid())
  );

CREATE POLICY "Admins can manage all tickets"
  ON public.tickets FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TICKET PHOTOS
CREATE POLICY "Users can view photos of their tickets"
  ON public.ticket_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_photos.ticket_id
      AND (t.customer_id = auth.uid() OR t.assigned_technician_id = public.get_technician_id(auth.uid()))
    )
  );

CREATE POLICY "Users can upload photos to their tickets"
  ON public.ticket_photos FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Admins can manage all photos"
  ON public.ticket_photos FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TICKET STATUS HISTORY
CREATE POLICY "Users can view history of their tickets"
  ON public.ticket_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_status_history.ticket_id
      AND (t.customer_id = auth.uid() OR t.assigned_technician_id = public.get_technician_id(auth.uid()))
    )
  );

CREATE POLICY "Admins can view all history"
  ON public.ticket_status_history FOR SELECT
  USING (public.is_admin_or_coordinator(auth.uid()));

-- PARTS CATALOG
CREATE POLICY "Anyone can view active parts"
  ON public.parts_catalog FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage parts catalog"
  ON public.parts_catalog FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TECHNICIAN INVENTORY
CREATE POLICY "Technicians can manage their inventory"
  ON public.technician_inventory FOR ALL
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Admins can manage all inventory"
  ON public.technician_inventory FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TICKET PARTS USED
CREATE POLICY "Technicians can add parts to their tickets"
  ON public.ticket_parts_used FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_parts_used.ticket_id
      AND t.assigned_technician_id = public.get_technician_id(auth.uid())
    )
  );

CREATE POLICY "Users can view parts used on their tickets"
  ON public.ticket_parts_used FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tickets t
      WHERE t.id = ticket_parts_used.ticket_id
      AND (t.customer_id = auth.uid() OR t.assigned_technician_id = public.get_technician_id(auth.uid()))
    )
  );

CREATE POLICY "Admins can manage all parts used"
  ON public.ticket_parts_used FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- NOTIFICATIONS
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (TRUE);

-- NOTIFICATION PREFERENCES
CREATE POLICY "Users can manage their notification preferences"
  ON public.notification_preferences FOR ALL
  USING (user_id = auth.uid());

-- CALL LOGS
CREATE POLICY "Users can view their own call logs"
  ON public.call_logs FOR SELECT
  USING (caller_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can insert their own call logs"
  ON public.call_logs FOR INSERT
  WITH CHECK (caller_id = auth.uid());

CREATE POLICY "Admins can view all call logs"
  ON public.call_logs FOR SELECT
  USING (public.is_admin_or_coordinator(auth.uid()));

-- CALLBACK REQUESTS
CREATE POLICY "Users can manage their callback requests"
  ON public.callback_requests FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all callback requests"
  ON public.callback_requests FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TECHNICIAN EARNINGS
CREATE POLICY "Technicians can view their own earnings"
  ON public.technician_earnings FOR SELECT
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Admins can manage all earnings"
  ON public.technician_earnings FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- PAYMENT TRANSACTIONS
CREATE POLICY "Technicians can view their own payments"
  ON public.payment_transactions FOR SELECT
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Admins can manage all payments"
  ON public.payment_transactions FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TRAINING COURSES
CREATE POLICY "Anyone can view active courses"
  ON public.training_courses FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage courses"
  ON public.training_courses FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- TECHNICIAN TRAINING
CREATE POLICY "Technicians can view their own training"
  ON public.technician_training FOR SELECT
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Technicians can update their own training progress"
  ON public.technician_training FOR UPDATE
  USING (technician_id = public.get_technician_id(auth.uid()));

CREATE POLICY "Admins can manage all training records"
  ON public.technician_training FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- KNOWLEDGE ARTICLES
CREATE POLICY "Anyone can view published articles"
  ON public.knowledge_articles FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage articles"
  ON public.knowledge_articles FOR ALL
  USING (public.is_admin_or_coordinator(auth.uid()));

-- SLA CONFIGURATIONS
CREATE POLICY "Anyone can view SLA configs"
  ON public.sla_configurations FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage SLA configs"
  ON public.sla_configurations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- OFFICE LOCATIONS
CREATE POLICY "Anyone can view active offices"
  ON public.office_locations FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage offices"
  ON public.office_locations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- 17. TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_solar_systems_updated_at
  BEFORE UPDATE ON public.solar_systems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_technicians_updated_at
  BEFORE UPDATE ON public.technicians
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_articles_updated_at
  BEFORE UPDATE ON public.knowledge_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate ticket number
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(ticket_number FROM 'TKT-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM public.tickets
  WHERE ticket_number LIKE 'TKT-' || year_part || '-%';
  
  NEW.ticket_number := 'TKT-' || year_part || '-' || LPAD(sequence_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ticket_number
  BEFORE INSERT ON public.tickets
  FOR EACH ROW
  WHEN (NEW.ticket_number IS NULL)
  EXECUTE FUNCTION public.generate_ticket_number();

-- Function to set SLA deadlines
CREATE OR REPLACE FUNCTION public.set_sla_deadlines()
RETURNS TRIGGER AS $$
DECLARE
  sla_record RECORD;
BEGIN
  SELECT * INTO sla_record
  FROM public.sla_configurations
  WHERE (issue_category IS NULL OR issue_category = NEW.issue_category)
    AND priority = NEW.priority
    AND is_active = TRUE
  ORDER BY issue_category NULLS LAST
  LIMIT 1;
  
  IF sla_record IS NOT NULL THEN
    NEW.sla_response_deadline := NOW() + (sla_record.response_time_hours || ' hours')::INTERVAL;
    NEW.sla_resolution_deadline := NOW() + (sla_record.resolution_time_hours || ' hours')::INTERVAL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ticket_sla
  BEFORE INSERT ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.set_sla_deadlines();

-- Function to log ticket status changes
CREATE OR REPLACE FUNCTION public.log_ticket_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.ticket_status_history (ticket_id, old_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER log_ticket_status
  AFTER UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.log_ticket_status_change();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Default role is end_user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'end_user');
  
  -- Create default notification preferences
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate system ID
CREATE OR REPLACE FUNCTION public.generate_system_id()
RETURNS TRIGGER AS $$
DECLARE
  cluster_code TEXT;
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  cluster_code := COALESCE(UPPER(LEFT(NEW.cluster, 3)), 'GEN');
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(system_id FROM 'SELCO-' || cluster_code || '-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM public.solar_systems
  WHERE system_id LIKE 'SELCO-' || cluster_code || '-' || year_part || '-%';
  
  NEW.system_id := 'SELCO-' || cluster_code || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_system_id
  BEFORE INSERT ON public.solar_systems
  FOR EACH ROW
  WHEN (NEW.system_id IS NULL)
  EXECUTE FUNCTION public.generate_system_id();