import { createBrowserClient } from '@supabase/ssr'

// Create a single supabase client for browser-side usage
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Type definitions for database tables
export interface Studio {
  id: string
  owner_id?: string
  host_id?: string
  title: string
  description?: string
  short_description?: string
  type: string
  location: string
  address?: string
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  price_per_hour: number
  hourly_rate?: number
  capacity?: number
  size_sqm?: number
  images?: string[]
  amenities?: string[]
  rules?: string[]
  is_featured?: boolean
  is_instant_book?: boolean
  is_published?: boolean
  rating?: number
  avg_rating?: number
  review_count?: number
  total_reviews?: number
  status?: string
  check_in_time?: string
  check_out_time?: string
  minimum_hours?: number
  maximum_hours?: number
  cancellation_policy?: string
  wifi_network_name?: string
  wifi_password?: string
  entry_code?: string
  access_instructions?: string
  parking_info?: string
  created_at?: string
  updated_at?: string
}

export interface Partner {
  id: string
  user_id?: string
  company_name: string
  contact_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  kvk_number?: string
  btw_number?: string
  bank_account_name?: string
  bank_iban?: string
  bank_bic?: string
  commission_rate?: number
  status: 'pending' | 'active' | 'inactive' | 'suspended'
  tier: 'standard' | 'premium' | 'enterprise'
  studios_count?: number
  total_revenue?: number
  total_payouts?: number
  avatar_url?: string
  notes?: string
  contract_signed_at?: string
  onboarding_completed_at?: string
  created_at?: string
  updated_at?: string
}

export interface Customer {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  bio?: string
  location?: string
  user_type?: 'renter' | 'host' | 'both'
  stripe_customer_id?: string
  is_verified?: boolean
  email_notifications?: boolean
  sms_notifications?: boolean
  push_notifications?: boolean
  marketing_emails?: boolean
  two_factor_enabled?: boolean
  created_at?: string
  updated_at?: string
}

export interface Booking {
  id: string
  studio_id?: string
  user_id?: string
  renter_id?: string
  host_id?: string
  booking_number?: string
  start_time?: string
  end_time?: string
  start_datetime?: string
  end_datetime?: string
  total_hours?: number
  total_price?: number
  total_amount?: number
  service_fee?: number
  host_payout?: number
  equipment_total?: number
  status?: string
  payment_status?: string
  production_type?: string
  notes?: string
  special_requests?: string
  stripe_payment_id?: string
  stripe_checkout_session_id?: string
  cancellation_reason?: string
  cancelled_by?: string
  cancelled_at?: string
  created_at?: string
  updated_at?: string
}

// Studio API functions
export const studiosApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('studios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Studio[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('studios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Studio
  },

  async create(studio: Partial<Studio>) {
    const { data, error } = await supabase
      .from('studios')
      .insert(studio)
      .select()
      .single()

    if (error) throw error
    return data as Studio
  },

  async update(id: string, studio: Partial<Studio>) {
    const { data, error } = await supabase
      .from('studios')
      .update(studio)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Studio
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('studios')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Partners API functions
export const partnersApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Partner[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Partner
  },

  async create(partner: Partial<Partner>) {
    const { data, error } = await supabase
      .from('partners')
      .insert(partner)
      .select()
      .single()

    if (error) throw error
    return data as Partner
  },

  async update(id: string, partner: Partial<Partner>) {
    const { data, error } = await supabase
      .from('partners')
      .update(partner)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Partner
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Customers API functions (using users table)
export const customersApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Customer[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Customer
  },

  async create(customer: Partial<Customer>) {
    const { data, error } = await supabase
      .from('users')
      .insert(customer)
      .select()
      .single()

    if (error) throw error
    return data as Customer
  },

  async update(id: string, customer: Partial<Customer>) {
    const { data, error } = await supabase
      .from('users')
      .update(customer)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Customer
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Bookings API functions
export const bookingsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        studio:studios(id, title, location, images),
        customer:users!bookings_renter_id_fkey(id, full_name, email, avatar_url)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        studio:studios(*),
        customer:users!bookings_renter_id_fkey(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
