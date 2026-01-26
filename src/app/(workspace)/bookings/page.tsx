'use client'

import { useState } from 'react'
import { Calendar, List, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookingCalendar } from '@/components/bookings/BookingCalendar'
import { BookingTable } from '@/components/bookings/BookingTable'
import type { BookingWithRelations } from '@/types'

// Mock data for demonstration
const mockBookings: BookingWithRelations[] = [
  {
    id: '1',
    studio_id: '1',
    customer_id: '1',
    partner_id: '1',
    date: '2025-01-26',
    start_time: '09:00',
    end_time: '12:00',
    duration_hours: 3,
    subtotal: 450,
    platform_fee: 67.5,
    partner_payout: 382.5,
    status: 'confirmed',
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    studio: {
      id: '1',
      partner_id: null,
      name: 'Sunlight Studios',
      description: '',
      type: 'photo',
      city: 'Los Angeles',
      address: null,
      hourly_rate: 150,
      half_day_rate: null,
      full_day_rate: null,
      amenities: [],
      equipment: [],
      images: [],
      status: 'active',
      rating: 4.9,
      review_count: 128,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    customer: {
      id: '1',
      user_id: null,
      full_name: 'Sarah Chen',
      email: 'sarah@example.com',
      phone: null,
      company: null,
      total_bookings: 5,
      total_spent: 2250,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: '2',
    studio_id: '2',
    customer_id: '2',
    partner_id: '2',
    date: '2025-01-26',
    start_time: '14:00',
    end_time: '18:00',
    duration_hours: 4,
    subtotal: 800,
    platform_fee: 120,
    partner_payout: 680,
    status: 'confirmed',
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    studio: {
      id: '2',
      partner_id: null,
      name: 'Echo Sound Studio',
      description: '',
      type: 'podcast',
      city: 'New York',
      address: null,
      hourly_rate: 200,
      half_day_rate: null,
      full_day_rate: null,
      amenities: [],
      equipment: [],
      images: [],
      status: 'active',
      rating: 4.8,
      review_count: 95,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    customer: {
      id: '2',
      user_id: null,
      full_name: 'Mike Rodriguez',
      email: 'mike@example.com',
      phone: null,
      company: 'Podcast Co',
      total_bookings: 12,
      total_spent: 4800,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: '3',
    studio_id: '3',
    customer_id: '3',
    partner_id: '3',
    date: '2025-01-28',
    start_time: '10:00',
    end_time: '14:00',
    duration_hours: 4,
    subtotal: 700,
    platform_fee: 105,
    partner_payout: 595,
    status: 'pending',
    notes: 'Waiting for payment confirmation',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    studio: {
      id: '3',
      partner_id: null,
      name: 'The Creative Loft',
      description: '',
      type: 'video',
      city: 'Chicago',
      address: null,
      hourly_rate: 175,
      half_day_rate: null,
      full_day_rate: null,
      amenities: [],
      equipment: [],
      images: [],
      status: 'active',
      rating: 4.7,
      review_count: 72,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    customer: {
      id: '3',
      user_id: null,
      full_name: 'Emily Watson',
      email: 'emily@example.com',
      phone: null,
      company: 'Watson Productions',
      total_bookings: 3,
      total_spent: 1400,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: '4',
    studio_id: '4',
    customer_id: '4',
    partner_id: '4',
    date: '2025-01-25',
    start_time: '16:00',
    end_time: '19:00',
    duration_hours: 3,
    subtotal: 375,
    platform_fee: 56.25,
    partner_payout: 318.75,
    status: 'completed',
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    studio: {
      id: '4',
      partner_id: null,
      name: 'Podcast Pro Studio',
      description: '',
      type: 'podcast',
      city: 'Austin',
      address: null,
      hourly_rate: 125,
      half_day_rate: null,
      full_day_rate: null,
      amenities: [],
      equipment: [],
      images: [],
      status: 'active',
      rating: 4.9,
      review_count: 156,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    customer: {
      id: '4',
      user_id: null,
      full_name: 'James Kim',
      email: 'james@example.com',
      phone: null,
      company: 'Tech Talk Show',
      total_bookings: 8,
      total_spent: 3000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
]

export default function BookingsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Bookings"
        description="Manage all studio bookings"
        actions={
          <div className="flex items-center gap-3">
            <Tabs value={view} onValueChange={(v) => setView(v as 'calendar' | 'list')}>
              <TabsList>
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2">
                  <List className="h-4 w-4" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        }
      />

      {view === 'calendar' ? (
        <BookingCalendar />
      ) : (
        <BookingTable bookings={mockBookings} />
      )}
    </div>
  )
}
