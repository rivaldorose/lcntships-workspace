'use client'

import Link from 'next/link'
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Wifi,
  Monitor,
  Mic,
  Coffee,
  VolumeX,
  CheckCircle,
  Calendar,
  Send,
  Ban,
  CreditCard,
  Clock,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mock booking data
const mockBooking = {
  id: 'BK-8829',
  status: 'confirmed',
  createdAt: 'Oct 24, 2023 • 10:30 AM',
  customer: {
    name: 'Jonathan Stevens',
    initials: 'JS',
    email: 'j.stevens@example.com',
    phone: '+1 (555) 234-5678',
    tier: 'Platinum Member',
    history: '12 previous bookings, 0 cancellations. Member since 2021.',
  },
  studio: {
    name: 'Neon Suite A',
    type: 'Professional Podcast & Streaming Studio',
    location: 'Floor 4, Suite 402 • Main Campus',
    timeSlot: '14:00 - 18:00 (4h)',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    amenities: [
      { icon: Wifi, label: 'High-speed WiFi' },
      { icon: Monitor, label: '4K Dual Monitors' },
      { icon: Mic, label: 'XLR Microphones' },
      { icon: Coffee, label: 'Coffee Station' },
      { icon: VolumeX, label: 'Soundproofed' },
    ],
  },
  financial: {
    basePrice: '$320.00',
    equipment: '$45.00',
    catering: '$15.00',
    subtotal: '$380.00',
    vat: '$57.00',
    total: '$437.00',
    paymentMethod: 'Stripe ending in 4421',
    paymentDate: 'Oct 24, 2023 • 10:35 AM',
  },
}

const statusConfig = {
  confirmed: {
    label: 'Confirmed',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  pending: {
    label: 'Pending',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  completed: {
    label: 'Completed',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-700',
    dotColor: 'bg-rose-500',
  },
}

export default function BookingDetailPage() {
  const booking = mockBooking
  const status = statusConfig[booking.status as keyof typeof statusConfig]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Link
          href="/bookings"
          className="text-gray-500 text-sm font-medium hover:text-indigo-600 transition-colors"
        >
          Bookings
        </Link>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-gray-900 text-sm font-semibold">
          Booking #{booking.id}
        </span>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-gray-900 text-4xl font-black tracking-tight">
                Booking #{booking.id}
              </h1>
              <span
                className={cn(
                  'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold',
                  status.bgColor,
                  status.textColor
                )}
              >
                <span className={cn('w-2 h-2 rounded-full mr-2', status.dotColor)} />
                {status.label}
              </span>
            </div>
            <p className="text-gray-500 font-medium">Created on {booking.createdAt}</p>
          </div>
          <Link
            href="/bookings"
            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 transition-all"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="px-8 bg-gray-50/50">
          <div className="flex border-b border-gray-100 gap-8">
            <button className="flex flex-col items-center justify-center border-b-2 border-indigo-600 text-indigo-600 pb-3 pt-4">
              <p className="text-sm font-bold leading-normal tracking-wide">Details</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-500 pb-3 pt-4 hover:text-gray-700">
              <p className="text-sm font-bold leading-normal tracking-wide">Activity Log</p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-500 pb-3 pt-4 hover:text-gray-700">
              <p className="text-sm font-bold leading-normal tracking-wide">Documents</p>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Info */}
          <div className="lg:col-span-8 space-y-10">
            {/* Customer Information */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Customer Information</h2>
              </div>
              <div className="flex items-start gap-6 bg-gray-50 p-6 rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-black">
                  {booking.customer.initials}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Full Name
                    </p>
                    <p className="text-gray-900 font-semibold">{booking.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Customer Tier
                    </p>
                    <span className="text-indigo-600 font-bold text-sm inline-flex items-center">
                      <BadgeCheck className="h-4 w-4 mr-1" /> {booking.customer.tier}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${booking.customer.email}`}
                      className="text-gray-900 font-medium hover:text-indigo-600 underline decoration-gray-200"
                    >
                      {booking.customer.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Phone Number
                    </p>
                    <p className="text-gray-900 font-medium">{booking.customer.phone}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-gray-200 mt-2">
                    <p className="text-gray-500 text-sm">
                      <span className="font-bold text-gray-700">Booking History:</span>{' '}
                      {booking.customer.history}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Studio Information */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Studio Details</h2>
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                {/* Studio Image/Map */}
                <div className="h-48 w-full bg-gray-200 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-80"
                    style={{ backgroundImage: `url(${booking.studio.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-900">
                      {booking.studio.location}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        {booking.studio.name}
                      </h3>
                      <p className="text-gray-500 font-medium">{booking.studio.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Time Slot
                      </p>
                      <p className="text-gray-900 font-bold">{booking.studio.timeSlot}</p>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {booking.studio.amenities.map((amenity, index) => {
                      const Icon = amenity.icon
                      return (
                        <span
                          key={index}
                          className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-1.5"
                        >
                          <Icon className="h-4 w-4" /> {amenity.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Financials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Base Price (4h)</span>
                  <span className="text-gray-900 font-semibold">
                    {booking.financial.basePrice}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Equipment Add-ons</span>
                  <span className="text-gray-900 font-semibold">
                    {booking.financial.equipment}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Catering (Coffee/Snacks)</span>
                  <span className="text-gray-900 font-semibold">
                    {booking.financial.catering}
                  </span>
                </div>

                <div className="border-t border-gray-200 my-4" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    {booking.financial.subtotal}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">VAT (15%)</span>
                  <span className="text-gray-900 font-semibold">{booking.financial.vat}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold text-lg">Total Amount</span>
                  <span className="text-indigo-600 font-black text-3xl">
                    {booking.financial.total}
                  </span>
                </div>
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mt-2 text-right">
                  Paid via {booking.financial.paymentMethod}
                </p>
              </div>

              {/* Payment Status */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Payment Received</p>
                  <p className="text-xs text-gray-500">{booking.financial.paymentDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-6 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button className="rounded-full px-8 h-14 shadow-lg shadow-indigo-200">
              <CheckCircle className="h-5 w-5 mr-2" />
              Check-in Customer
            </Button>
            <Button variant="outline" className="rounded-full px-6 h-14 border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full px-6 h-14">
              <Calendar className="h-5 w-5 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" className="rounded-full px-6 h-14 text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200">
              <Ban className="h-5 w-5 mr-2" />
              Cancel Booking
            </Button>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-4 text-gray-400">
        <span className="text-sm">🔒</span>
        <span className="text-xs font-medium uppercase tracking-widest">
          End-to-end encrypted workspace management
        </span>
      </div>
    </div>
  )
}
