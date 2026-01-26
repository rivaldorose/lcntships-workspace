import type { Database } from './database'

// Helper types for database tables
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Specific entity types
export type Profile = Tables<'profiles'>
export type Studio = Tables<'studios'>
export type Partner = Tables<'partners'>
export type Customer = Tables<'customers'>
export type Booking = Tables<'bookings'>
export type Transaction = Tables<'transactions'>
export type SalesLead = Tables<'sales_leads'>
export type MarketingPost = Tables<'marketing_posts'>
export type Document = Tables<'documents'>

// Extended types with relations
export interface BookingWithRelations extends Booking {
  studio?: Studio
  customer?: Customer
  partner?: Partner
}

export interface StudioWithPartner extends Studio {
  partner?: Partner
}

// Enums
export type StudioType = 'photo' | 'video' | 'podcast' | 'music' | 'event'
export type StudioStatus = 'draft' | 'active' | 'inactive'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type PartnerStatus = 'pending' | 'active' | 'inactive'
export type LeadStatus = 'cold' | 'warm' | 'hot' | 'won' | 'lost'
export type LeadSource = 'apollo' | 'referral' | 'inbound' | 'outreach'
export type TransactionType = 'booking_revenue' | 'payout' | 'refund'
export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'twitter'
export type DocumentType = 'contract' | 'invoice' | 'template'

// Stats types
export interface DashboardStats {
  activeStudios: number
  weeklyBookings: number
  monthlyRevenue: number
  averageRating: number
}

export interface SalesStats {
  totalLeads: number
  coldLeads: number
  warmLeads: number
  hotLeads: number
  wonLeads: number
  lostLeads: number
  conversionRate: number
}

export interface FinanceStats {
  totalRevenue: number
  platformFees: number
  partnerPayouts: number
  pendingPayouts: number
}
