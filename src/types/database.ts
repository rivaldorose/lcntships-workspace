export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      studios: {
        Row: {
          id: string
          partner_id: string | null
          name: string
          description: string | null
          type: string | null
          city: string | null
          address: string | null
          hourly_rate: number | null
          half_day_rate: number | null
          full_day_rate: number | null
          amenities: Json
          equipment: Json
          images: Json
          status: string
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          name: string
          description?: string | null
          type?: string | null
          city?: string | null
          address?: string | null
          hourly_rate?: number | null
          half_day_rate?: number | null
          full_day_rate?: number | null
          amenities?: Json
          equipment?: Json
          images?: Json
          status?: string
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          name?: string
          description?: string | null
          type?: string | null
          city?: string | null
          address?: string | null
          hourly_rate?: number | null
          half_day_rate?: number | null
          full_day_rate?: number | null
          amenities?: Json
          equipment?: Json
          images?: Json
          status?: string
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          user_id: string | null
          company_name: string | null
          contact_name: string
          email: string
          phone: string | null
          city: string | null
          status: string
          total_revenue: number
          pending_payout: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          company_name?: string | null
          contact_name: string
          email: string
          phone?: string | null
          city?: string | null
          status?: string
          total_revenue?: number
          pending_payout?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          company_name?: string | null
          contact_name?: string
          email?: string
          phone?: string | null
          city?: string | null
          status?: string
          total_revenue?: number
          pending_payout?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          company: string | null
          total_bookings: number
          total_spent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          company?: string | null
          total_bookings?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          total_bookings?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          studio_id: string | null
          customer_id: string | null
          partner_id: string | null
          date: string
          start_time: string
          end_time: string
          duration_hours: number | null
          subtotal: number | null
          platform_fee: number | null
          partner_payout: number | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          studio_id?: string | null
          customer_id?: string | null
          partner_id?: string | null
          date: string
          start_time: string
          end_time: string
          duration_hours?: number | null
          subtotal?: number | null
          platform_fee?: number | null
          partner_payout?: number | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          studio_id?: string | null
          customer_id?: string | null
          partner_id?: string | null
          date?: string
          start_time?: string
          end_time?: string
          duration_hours?: number | null
          subtotal?: number | null
          platform_fee?: number | null
          partner_payout?: number | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          booking_id: string | null
          partner_id: string | null
          type: string
          amount: number
          description: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_id?: string | null
          partner_id?: string | null
          type: string
          amount: number
          description?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string | null
          partner_id?: string | null
          type?: string
          amount?: number
          description?: string | null
          status?: string
          created_at?: string
        }
      }
      sales_leads: {
        Row: {
          id: string
          company_name: string
          contact_name: string | null
          email: string | null
          phone: string | null
          city: string | null
          studio_type: string | null
          status: string
          source: string | null
          notes: string | null
          last_contacted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          city?: string | null
          studio_type?: string | null
          status?: string
          source?: string | null
          notes?: string | null
          last_contacted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          city?: string | null
          studio_type?: string | null
          status?: string
          source?: string | null
          notes?: string | null
          last_contacted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      marketing_posts: {
        Row: {
          id: string
          title: string
          content: string | null
          platform: string | null
          scheduled_at: string | null
          published_at: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          platform?: string | null
          scheduled_at?: string | null
          published_at?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          platform?: string | null
          scheduled_at?: string | null
          published_at?: string | null
          status?: string
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          type: string | null
          file_url: string | null
          partner_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          file_url?: string | null
          partner_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          file_url?: string | null
          partner_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
