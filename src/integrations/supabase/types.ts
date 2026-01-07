export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      call_logs: {
        Row: {
          call_type: string | null
          caller_id: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          notes: string | null
          phone_number: string | null
          recipient_id: string | null
          started_at: string | null
        }
        Insert: {
          call_type?: string | null
          caller_id?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          phone_number?: string | null
          recipient_id?: string | null
          started_at?: string | null
        }
        Update: {
          call_type?: string | null
          caller_id?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          phone_number?: string | null
          recipient_id?: string | null
          started_at?: string | null
        }
        Relationships: []
      }
      callback_requests: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          created_at: string | null
          id: string
          issue_type: string | null
          notes: string | null
          phone_number: string | null
          preferred_time: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          id?: string
          issue_type?: string | null
          notes?: string | null
          phone_number?: string | null
          preferred_time?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          id?: string
          issue_type?: string | null
          notes?: string | null
          phone_number?: string | null
          preferred_time?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_articles: {
        Row: {
          audio_url: string | null
          category: string | null
          content: string
          created_at: string | null
          difficulty_level: Database["public"]["Enums"]["skill_level"] | null
          estimated_time_minutes: number | null
          id: string
          is_published: boolean | null
          issue_type: Database["public"]["Enums"]["issue_category"] | null
          language: Database["public"]["Enums"]["language_preference"] | null
          pdf_url: string | null
          required_parts: string[] | null
          required_tools: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          audio_url?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          difficulty_level?: Database["public"]["Enums"]["skill_level"] | null
          estimated_time_minutes?: number | null
          id?: string
          is_published?: boolean | null
          issue_type?: Database["public"]["Enums"]["issue_category"] | null
          language?: Database["public"]["Enums"]["language_preference"] | null
          pdf_url?: string | null
          required_parts?: string[] | null
          required_tools?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          audio_url?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          difficulty_level?: Database["public"]["Enums"]["skill_level"] | null
          estimated_time_minutes?: number | null
          id?: string
          is_published?: boolean | null
          issue_type?: Database["public"]["Enums"]["issue_category"] | null
          language?: Database["public"]["Enums"]["language_preference"] | null
          pdf_url?: string | null
          required_parts?: string[] | null
          required_tools?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          id: string
          payment_reminders: boolean | null
          promotional: boolean | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          service_updates: boolean | null
          sms_enabled: boolean | null
          system_alerts: boolean | null
          training: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_reminders?: boolean | null
          promotional?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          service_updates?: boolean | null
          sms_enabled?: boolean | null
          system_alerts?: boolean | null
          training?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_reminders?: boolean | null
          promotional?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          service_updates?: boolean | null
          sms_enabled?: boolean | null
          system_alerts?: boolean | null
          training?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: []
      }
      office_locations: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          pincode: string | null
          state: string | null
          whatsapp: string | null
          working_hours: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          whatsapp?: string | null
          working_hours?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          pincode?: string | null
          state?: string | null
          whatsapp?: string | null
          working_hours?: string | null
        }
        Relationships: []
      }
      parts_catalog: {
        Row: {
          brand: string | null
          category: string | null
          compatible_systems:
            | Database["public"]["Enums"]["solar_system_type"][]
            | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_common: boolean | null
          model: string | null
          name: string
          part_code: string
          photo_url: string | null
          specifications: Json | null
          unit_price: number
        }
        Insert: {
          brand?: string | null
          category?: string | null
          compatible_systems?:
            | Database["public"]["Enums"]["solar_system_type"][]
            | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_common?: boolean | null
          model?: string | null
          name: string
          part_code: string
          photo_url?: string | null
          specifications?: Json | null
          unit_price: number
        }
        Update: {
          brand?: string | null
          category?: string | null
          compatible_systems?:
            | Database["public"]["Enums"]["solar_system_type"][]
            | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_common?: boolean | null
          model?: string | null
          name?: string
          part_code?: string
          photo_url?: string | null
          specifications?: Json | null
          unit_price?: number
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          bank_transaction_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          processed_at: string | null
          reference_number: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          technician_id: string | null
        }
        Insert: {
          amount: number
          bank_transaction_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          processed_at?: string | null
          reference_number?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          technician_id?: string | null
        }
        Update: {
          amount?: number
          bank_transaction_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          processed_at?: string | null
          reference_number?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          technician_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          language_preference:
            | Database["public"]["Enums"]["language_preference"]
            | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          pincode: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          pincode?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sla_configurations: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          issue_category: Database["public"]["Enums"]["issue_category"] | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution_time_hours: number
          response_time_hours: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          issue_category?: Database["public"]["Enums"]["issue_category"] | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution_time_hours: number
          response_time_hours: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          issue_category?: Database["public"]["Enums"]["issue_category"] | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_time_hours?: number
          response_time_hours?: number
        }
        Relationships: []
      }
      solar_systems: {
        Row: {
          battery_brand: string | null
          battery_capacity_ah: number | null
          battery_type: string | null
          battery_voltage: number | null
          cluster: string | null
          controller_rating: number | null
          controller_type: string | null
          created_at: string | null
          expected_daily_generation_kwh: number | null
          health_status: Database["public"]["Enums"]["system_health"] | null
          id: string
          installation_address: string | null
          installation_certificate_url: string | null
          installation_date: string | null
          installer_name: string | null
          inverter_capacity: number | null
          inverter_model: string | null
          is_active: boolean | null
          last_service_date: string | null
          latitude: number | null
          longitude: number | null
          next_maintenance_date: string | null
          notes: string | null
          num_appliances: number | null
          num_lights: number | null
          owner_id: string | null
          panel_brand: string | null
          panel_model: string | null
          panel_quantity: number | null
          panel_wattage: number | null
          system_diagram_url: string | null
          system_id: string
          system_type: Database["public"]["Enums"]["solar_system_type"]
          total_capacity_watts: number | null
          updated_at: string | null
          warranty_document_url: string | null
          warranty_end_date: string | null
          warranty_start_date: string | null
          warranty_status: Database["public"]["Enums"]["warranty_status"] | null
        }
        Insert: {
          battery_brand?: string | null
          battery_capacity_ah?: number | null
          battery_type?: string | null
          battery_voltage?: number | null
          cluster?: string | null
          controller_rating?: number | null
          controller_type?: string | null
          created_at?: string | null
          expected_daily_generation_kwh?: number | null
          health_status?: Database["public"]["Enums"]["system_health"] | null
          id?: string
          installation_address?: string | null
          installation_certificate_url?: string | null
          installation_date?: string | null
          installer_name?: string | null
          inverter_capacity?: number | null
          inverter_model?: string | null
          is_active?: boolean | null
          last_service_date?: string | null
          latitude?: number | null
          longitude?: number | null
          next_maintenance_date?: string | null
          notes?: string | null
          num_appliances?: number | null
          num_lights?: number | null
          owner_id?: string | null
          panel_brand?: string | null
          panel_model?: string | null
          panel_quantity?: number | null
          panel_wattage?: number | null
          system_diagram_url?: string | null
          system_id: string
          system_type?: Database["public"]["Enums"]["solar_system_type"]
          total_capacity_watts?: number | null
          updated_at?: string | null
          warranty_document_url?: string | null
          warranty_end_date?: string | null
          warranty_start_date?: string | null
          warranty_status?:
            | Database["public"]["Enums"]["warranty_status"]
            | null
        }
        Update: {
          battery_brand?: string | null
          battery_capacity_ah?: number | null
          battery_type?: string | null
          battery_voltage?: number | null
          cluster?: string | null
          controller_rating?: number | null
          controller_type?: string | null
          created_at?: string | null
          expected_daily_generation_kwh?: number | null
          health_status?: Database["public"]["Enums"]["system_health"] | null
          id?: string
          installation_address?: string | null
          installation_certificate_url?: string | null
          installation_date?: string | null
          installer_name?: string | null
          inverter_capacity?: number | null
          inverter_model?: string | null
          is_active?: boolean | null
          last_service_date?: string | null
          latitude?: number | null
          longitude?: number | null
          next_maintenance_date?: string | null
          notes?: string | null
          num_appliances?: number | null
          num_lights?: number | null
          owner_id?: string | null
          panel_brand?: string | null
          panel_model?: string | null
          panel_quantity?: number | null
          panel_wattage?: number | null
          system_diagram_url?: string | null
          system_id?: string
          system_type?: Database["public"]["Enums"]["solar_system_type"]
          total_capacity_watts?: number | null
          updated_at?: string | null
          warranty_document_url?: string | null
          warranty_end_date?: string | null
          warranty_start_date?: string | null
          warranty_status?:
            | Database["public"]["Enums"]["warranty_status"]
            | null
        }
        Relationships: []
      }
      technician_earnings: {
        Row: {
          base_pay: number | null
          bonus: number | null
          created_at: string | null
          id: string
          paid_at: string | null
          parts_commission: number | null
          payment_reference: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          technician_id: string | null
          ticket_id: string | null
          total_amount: number | null
          urgent_premium: number | null
          weekend_premium: number | null
        }
        Insert: {
          base_pay?: number | null
          bonus?: number | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          parts_commission?: number | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          technician_id?: string | null
          ticket_id?: string | null
          total_amount?: number | null
          urgent_premium?: number | null
          weekend_premium?: number | null
        }
        Update: {
          base_pay?: number | null
          bonus?: number | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          parts_commission?: number | null
          payment_reference?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          technician_id?: string | null
          ticket_id?: string | null
          total_amount?: number | null
          urgent_premium?: number | null
          weekend_premium?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_earnings_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_earnings_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      technician_inventory: {
        Row: {
          id: string
          last_restocked: string | null
          part_id: string | null
          quantity: number | null
          technician_id: string | null
        }
        Insert: {
          id?: string
          last_restocked?: string | null
          part_id?: string | null
          quantity?: number | null
          technician_id?: string | null
        }
        Update: {
          id?: string
          last_restocked?: string | null
          part_id?: string | null
          quantity?: number | null
          technician_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_inventory_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_inventory_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      technician_skills: {
        Row: {
          certificate_url: string | null
          certification_date: string | null
          certification_expiry: string | null
          certified: boolean | null
          created_at: string | null
          id: string
          skill_level: Database["public"]["Enums"]["skill_level"] | null
          skill_name: string
          technician_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          certification_date?: string | null
          certification_expiry?: string | null
          certified?: boolean | null
          created_at?: string | null
          id?: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          skill_name: string
          technician_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          certification_date?: string | null
          certification_expiry?: string | null
          certified?: boolean | null
          created_at?: string | null
          id?: string
          skill_level?: Database["public"]["Enums"]["skill_level"] | null
          skill_name?: string
          technician_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_skills_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      technician_training: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          course_id: string | null
          enrolled_at: string | null
          id: string
          progress_percent: number | null
          score: number | null
          started_at: string | null
          status: string | null
          technician_id: string | null
          trainer_feedback: string | null
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          progress_percent?: number | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          technician_id?: string | null
          trainer_feedback?: string | null
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          progress_percent?: number | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          technician_id?: string | null
          trainer_feedback?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technician_training_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "training_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_training_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      technicians: {
        Row: {
          address_proof_url: string | null
          average_rating: number | null
          bank_account_number: string | null
          bank_ifsc: string | null
          created_at: string | null
          current_latitude: number | null
          current_longitude: number | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          employee_id: string | null
          employment_type: string | null
          experience_years: number | null
          first_fix_rate: number | null
          gender: string | null
          id: string
          id_proof_url: string | null
          is_active: boolean | null
          is_verified: boolean | null
          is_women_led: boolean | null
          join_date: string | null
          languages_spoken: string[] | null
          last_location_update: string | null
          max_jobs_per_day: number | null
          on_time_rate: number | null
          pending_earnings: number | null
          performance_level:
            | Database["public"]["Enums"]["performance_level"]
            | null
          police_verification_url: string | null
          service_areas: string[] | null
          service_radius_km: number | null
          specializations: string[] | null
          status: Database["public"]["Enums"]["technician_status"] | null
          tools_owned: string[] | null
          total_earnings: number | null
          total_jobs_completed: number | null
          total_ratings: number | null
          updated_at: string | null
          upi_id: string | null
          user_id: string
          working_hours: Json | null
        }
        Insert: {
          address_proof_url?: string | null
          average_rating?: number | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          employee_id?: string | null
          employment_type?: string | null
          experience_years?: number | null
          first_fix_rate?: number | null
          gender?: string | null
          id?: string
          id_proof_url?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          is_women_led?: boolean | null
          join_date?: string | null
          languages_spoken?: string[] | null
          last_location_update?: string | null
          max_jobs_per_day?: number | null
          on_time_rate?: number | null
          pending_earnings?: number | null
          performance_level?:
            | Database["public"]["Enums"]["performance_level"]
            | null
          police_verification_url?: string | null
          service_areas?: string[] | null
          service_radius_km?: number | null
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["technician_status"] | null
          tools_owned?: string[] | null
          total_earnings?: number | null
          total_jobs_completed?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          upi_id?: string | null
          user_id: string
          working_hours?: Json | null
        }
        Update: {
          address_proof_url?: string | null
          average_rating?: number | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          employee_id?: string | null
          employment_type?: string | null
          experience_years?: number | null
          first_fix_rate?: number | null
          gender?: string | null
          id?: string
          id_proof_url?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          is_women_led?: boolean | null
          join_date?: string | null
          languages_spoken?: string[] | null
          last_location_update?: string | null
          max_jobs_per_day?: number | null
          on_time_rate?: number | null
          pending_earnings?: number | null
          performance_level?:
            | Database["public"]["Enums"]["performance_level"]
            | null
          police_verification_url?: string | null
          service_areas?: string[] | null
          service_radius_km?: number | null
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["technician_status"] | null
          tools_owned?: string[] | null
          total_earnings?: number | null
          total_jobs_completed?: number | null
          total_ratings?: number | null
          updated_at?: string | null
          upi_id?: string | null
          user_id?: string
          working_hours?: Json | null
        }
        Relationships: []
      }
      ticket_parts_used: {
        Row: {
          condition: string | null
          created_at: string | null
          id: string
          part_id: string | null
          quantity: number | null
          serial_number: string | null
          ticket_id: string | null
          total_price: number | null
          unit_price: number | null
        }
        Insert: {
          condition?: string | null
          created_at?: string | null
          id?: string
          part_id?: string | null
          quantity?: number | null
          serial_number?: string | null
          ticket_id?: string | null
          total_price?: number | null
          unit_price?: number | null
        }
        Update: {
          condition?: string | null
          created_at?: string | null
          id?: string
          part_id?: string | null
          quantity?: number | null
          serial_number?: string | null
          ticket_id?: string | null
          total_price?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_parts_used_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_parts_used_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          photo_type: string
          photo_url: string
          ticket_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          photo_type: string
          photo_url: string
          ticket_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          photo_type?: string
          photo_url?: string
          ticket_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_photos_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_status_history: {
        Row: {
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: Database["public"]["Enums"]["ticket_status"]
          notes: string | null
          old_status: Database["public"]["Enums"]["ticket_status"] | null
          ticket_id: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["ticket_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["ticket_status"] | null
          ticket_id?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["ticket_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["ticket_status"] | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_status_history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          accepted_at: string | null
          address: string | null
          arrived_at: string | null
          assigned_at: string | null
          assigned_technician_id: string | null
          completed_at: string | null
          created_at: string | null
          customer_feedback: string | null
          customer_id: string | null
          customer_rating: number | null
          customer_signature_url: string | null
          escalated_at: string | null
          escalated_to: string | null
          escalation_reason: string | null
          first_response_at: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          internal_notes: string | null
          is_escalated: boolean | null
          is_reopened: boolean | null
          issue_category: Database["public"]["Enums"]["issue_category"]
          issue_description: string | null
          labor_cost: number | null
          latitude: number | null
          longitude: number | null
          parts_cost: number | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_received_at: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          priority: Database["public"]["Enums"]["ticket_priority"] | null
          reopened_from_ticket_id: string | null
          resolution_notes: string | null
          resolution_status:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          sla_resolution_deadline: string | null
          sla_response_deadline: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          system_id: string | null
          technician_eta: string | null
          ticket_number: string
          total_cost: number | null
          updated_at: string | null
          voice_note_url: string | null
          work_performed: string | null
        }
        Insert: {
          accepted_at?: string | null
          address?: string | null
          arrived_at?: string | null
          assigned_at?: string | null
          assigned_technician_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          customer_signature_url?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_reason?: string | null
          first_response_at?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          internal_notes?: string | null
          is_escalated?: boolean | null
          is_reopened?: boolean | null
          issue_category: Database["public"]["Enums"]["issue_category"]
          issue_description?: string | null
          labor_cost?: number | null
          latitude?: number | null
          longitude?: number | null
          parts_cost?: number | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_received_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          reopened_from_ticket_id?: string | null
          resolution_notes?: string | null
          resolution_status?:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          sla_resolution_deadline?: string | null
          sla_response_deadline?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          system_id?: string | null
          technician_eta?: string | null
          ticket_number: string
          total_cost?: number | null
          updated_at?: string | null
          voice_note_url?: string | null
          work_performed?: string | null
        }
        Update: {
          accepted_at?: string | null
          address?: string | null
          arrived_at?: string | null
          assigned_at?: string | null
          assigned_technician_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          customer_signature_url?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          escalation_reason?: string | null
          first_response_at?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          internal_notes?: string | null
          is_escalated?: boolean | null
          is_reopened?: boolean | null
          issue_category?: Database["public"]["Enums"]["issue_category"]
          issue_description?: string | null
          labor_cost?: number | null
          latitude?: number | null
          longitude?: number | null
          parts_cost?: number | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_received_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          priority?: Database["public"]["Enums"]["ticket_priority"] | null
          reopened_from_ticket_id?: string | null
          resolution_notes?: string | null
          resolution_status?:
            | Database["public"]["Enums"]["resolution_status"]
            | null
          sla_resolution_deadline?: string | null
          sla_response_deadline?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          system_id?: string | null
          technician_eta?: string | null
          ticket_number?: string
          total_cost?: number | null
          updated_at?: string | null
          voice_note_url?: string | null
          work_performed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_technician_id_fkey"
            columns: ["assigned_technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_escalated_to_fkey"
            columns: ["escalated_to"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "solar_systems"
            referencedColumns: ["id"]
          },
        ]
      }
      training_courses: {
        Row: {
          category: string | null
          content_url: string | null
          cost: number | null
          created_at: string | null
          description: string | null
          duration_hours: number | null
          id: string
          is_active: boolean | null
          is_mandatory: boolean | null
          skill_level_granted: Database["public"]["Enums"]["skill_level"] | null
          skill_name: string | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content_url?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          skill_level_granted?:
            | Database["public"]["Enums"]["skill_level"]
            | null
          skill_name?: string | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content_url?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          skill_level_granted?:
            | Database["public"]["Enums"]["skill_level"]
            | null
          skill_name?: string | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_technician_id: { Args: { _user_id: string }; Returns: string }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_coordinator: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "end_user" | "technician" | "admin" | "coordinator"
      frequency_enum:
        | "never"
        | "rarely"
        | "occasionally"
        | "regularly"
        | "frequently"
      gender_type: "man" | "woman" | "non_binary" | "other"
      issue_category:
        | "no_light"
        | "weak_light"
        | "battery_problem"
        | "panel_damage"
        | "wiring_issue"
        | "inverter_problem"
        | "controller_issue"
        | "other"
      language_preference: "kannada" | "english" | "hindi" | "marathi" | "tamil"
      lifestyle_enum:
        | "active"
        | "balanced"
        | "relaxed"
        | "adventurous"
        | "homebody"
      looking_for_type: "men" | "women" | "everyone"
      notification_type:
        | "service_update"
        | "system_alert"
        | "payment_reminder"
        | "promotional"
        | "training"
        | "job_available"
        | "job_assigned"
        | "performance"
        | "escalation"
        | "general"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      payment_method: "cash" | "online" | "upi" | "bank_transfer"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      performance_level: "bronze" | "silver" | "gold" | "platinum"
      personality_enum: "introvert" | "extrovert" | "ambivert"
      relationship_type_enum:
        | "casual"
        | "long_term"
        | "marriage"
        | "friendship"
        | "open"
      resolution_status:
        | "fully_resolved"
        | "partially_resolved"
        | "not_resolved"
        | "escalated"
      skill_level: "basic" | "intermediate" | "advanced" | "expert"
      solar_system_type:
        | "home_light"
        | "enterprise"
        | "street_light"
        | "water_pump"
        | "custom"
      swipe_action: "like" | "pass" | "super_like"
      system_health: "good" | "fair" | "needs_attention" | "critical"
      technician_status: "online" | "offline" | "busy" | "on_leave"
      ticket_priority: "normal" | "urgent" | "emergency"
      ticket_status:
        | "submitted"
        | "assigned"
        | "accepted"
        | "on_the_way"
        | "arrived"
        | "in_progress"
        | "completed"
        | "closed"
        | "cancelled"
        | "escalated"
      user_role: "buyer" | "seller" | "admin"
      warranty_status: "active" | "expired" | "void"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["end_user", "technician", "admin", "coordinator"],
      frequency_enum: [
        "never",
        "rarely",
        "occasionally",
        "regularly",
        "frequently",
      ],
      gender_type: ["man", "woman", "non_binary", "other"],
      issue_category: [
        "no_light",
        "weak_light",
        "battery_problem",
        "panel_damage",
        "wiring_issue",
        "inverter_problem",
        "controller_issue",
        "other",
      ],
      language_preference: ["kannada", "english", "hindi", "marathi", "tamil"],
      lifestyle_enum: [
        "active",
        "balanced",
        "relaxed",
        "adventurous",
        "homebody",
      ],
      looking_for_type: ["men", "women", "everyone"],
      notification_type: [
        "service_update",
        "system_alert",
        "payment_reminder",
        "promotional",
        "training",
        "job_available",
        "job_assigned",
        "performance",
        "escalation",
        "general",
      ],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      payment_method: ["cash", "online", "upi", "bank_transfer"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      performance_level: ["bronze", "silver", "gold", "platinum"],
      personality_enum: ["introvert", "extrovert", "ambivert"],
      relationship_type_enum: [
        "casual",
        "long_term",
        "marriage",
        "friendship",
        "open",
      ],
      resolution_status: [
        "fully_resolved",
        "partially_resolved",
        "not_resolved",
        "escalated",
      ],
      skill_level: ["basic", "intermediate", "advanced", "expert"],
      solar_system_type: [
        "home_light",
        "enterprise",
        "street_light",
        "water_pump",
        "custom",
      ],
      swipe_action: ["like", "pass", "super_like"],
      system_health: ["good", "fair", "needs_attention", "critical"],
      technician_status: ["online", "offline", "busy", "on_leave"],
      ticket_priority: ["normal", "urgent", "emergency"],
      ticket_status: [
        "submitted",
        "assigned",
        "accepted",
        "on_the_way",
        "arrived",
        "in_progress",
        "completed",
        "closed",
        "cancelled",
        "escalated",
      ],
      user_role: ["buyer", "seller", "admin"],
      warranty_status: ["active", "expired", "void"],
    },
  },
} as const
