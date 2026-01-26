'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import {
  ChevronRight,
  MapPin,
  Edit,
  Eye,
  Plus,
  X,
  Users,
  Square,
  Wifi,
  Coffee,
  Car,
  Printer,
  Wind,
  Lock,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Mock studio detail data
const mockStudioDetail = {
  id: '1',
  name: 'Downtown Creative Hub',
  status: 'active',
  type: 'Premium Workspace in Arts District',
  units: 12,
  description: `Our Downtown Creative Hub is designed for the modern multi-hyphenate. Located in the heart of the historic Arts District, this 12,000 sq ft facility offers a mix of recording studios, photography cycloramas, and flexible co-working spaces.

Managed by a team of professional engineers and designers, we ensure every session is seamless. 24/7 access available for anchor tenants.`,
  location: {
    address: '1204 Mateo St, Los Angeles, CA 90021',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
  },
  images: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
  ],
  amenities: [
    { icon: Wifi, label: 'Gigabit Wifi' },
    { icon: Coffee, label: 'Artisan Coffee' },
    { icon: Car, label: 'Valet Parking' },
    { icon: Printer, label: 'Pro Printing' },
    { icon: Wind, label: 'Hepa Filter' },
    { icon: Lock, label: 'Smart Access' },
  ],
  openingHours: [
    { day: 'Monday', hours: '08:00 - 22:00', highlight: false },
    { day: 'Tuesday', hours: '08:00 - 22:00', highlight: false },
    { day: 'Wednesday', hours: '08:00 - 22:00', highlight: false },
    { day: 'Thursday', hours: '08:00 - 22:00', highlight: false },
    { day: 'Friday', hours: '08:00 - 00:00', highlight: true },
    { day: 'Saturday', hours: '10:00 - 00:00', highlight: false },
    { day: 'Sunday', hours: 'Closed', highlight: false, closed: true },
  ],
  spaces: [
    {
      id: '1',
      name: 'Podcast Suite A',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
      capacity: 4,
      size: 250,
      price: 45,
    },
    {
      id: '2',
      name: 'Photo Studio & Cyc',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
      capacity: 12,
      size: 1200,
      price: 85,
    },
  ],
  recentBookings: [
    {
      id: 'BK-001',
      client: 'Alex Rivera',
      space: 'Podcast Suite A',
      dateTime: 'Oct 24, 2:00 PM',
      amount: '$90.00',
      status: 'confirmed',
    },
    {
      id: 'BK-002',
      client: 'Vision Media',
      space: 'Photo Studio',
      dateTime: 'Oct 24, 4:30 PM',
      amount: '$340.00',
      status: 'in_progress',
    },
    {
      id: 'BK-003',
      client: 'Sarah Jenkins',
      space: 'Podcast Suite A',
      dateTime: 'Oct 25, 9:00 AM',
      amount: '$45.00',
      status: 'pending',
    },
  ],
}

const statusConfig = {
  active: {
    label: 'Active',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
  },
  inactive: {
    label: 'Inactive',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  draft: {
    label: 'Draft',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
}

const bookingStatusConfig = {
  confirmed: {
    label: 'Confirmed',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-600',
  },
  in_progress: {
    label: 'In Progress',
    dotColor: 'bg-blue-500',
    textColor: 'text-blue-600',
  },
  pending: {
    label: 'Pending',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-600',
  },
  cancelled: {
    label: 'Cancelled',
    dotColor: 'bg-rose-500',
    textColor: 'text-rose-600',
  },
}

// Add Space Modal
interface AddSpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddSpaceModal({ isOpen, onClose }: AddSpaceModalProps) {
  const [mounted, setMounted] = useState(false)
  const [spaceName, setSpaceName] = useState('')
  const [capacity, setCapacity] = useState('')
  const [size, setSize] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = () => {
    console.log({ spaceName, capacity, size, pricePerHour })
    onClose()
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Space</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900">Space Name</label>
            <Input
              placeholder="e.g. Recording Studio B"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Guest Capacity</label>
              <Input
                type="number"
                placeholder="0"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900">Size (sqft)</label>
              <Input
                type="number"
                placeholder="0"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900">Price per Hour ($)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <Button variant="outline" onClick={onClose} className="rounded-full px-6">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-full px-6 shadow-lg shadow-indigo-200">
            Add Space
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function StudioDetailPage() {
  const studio = mockStudioDetail
  const status = statusConfig[studio.status as keyof typeof statusConfig]
  const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Link
          href="/studios"
          className="text-gray-500 text-sm font-medium hover:text-indigo-600 transition-colors"
        >
          Studios
        </Link>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-gray-900 text-sm font-semibold">{studio.name}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tight text-gray-900">{studio.name}</h1>
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
              status.bgColor,
              status.textColor
            )}>
              {status.label}
            </span>
          </div>
          <p className="text-gray-500 text-lg">{studio.type} • {studio.units} Units</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-full h-11 px-6 gap-2">
            <Edit className="h-4 w-4" />
            Edit Studio
          </Button>
          <Button variant="outline" className="rounded-full h-11 px-6 gap-2">
            <Eye className="h-4 w-4" />
            Public Page
          </Button>
          <Button
            onClick={() => setIsAddSpaceModalOpen(true)}
            className="rounded-full h-11 px-6 gap-2 shadow-lg shadow-indigo-200"
          >
            <Plus className="h-4 w-4" />
            Add Space
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About the Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                {studio.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">{paragraph}</p>
                ))}
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64">
                <div
                  className="bg-cover bg-center rounded-2xl col-span-2 row-span-1"
                  style={{ backgroundImage: `url(${studio.images[0]})` }}
                />
                <div
                  className="bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: `url(${studio.images[1]})` }}
                />
                <div
                  className="bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: `url(${studio.images[2]})` }}
                />
              </div>
            </div>
          </div>

          {/* Manage Spaces */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-gray-900">Manage Spaces</h3>
              <Link href="#" className="text-indigo-600 font-semibold text-sm hover:underline">
                View all {studio.units} units
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studio.spaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-300 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-16 h-16 rounded-2xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${space.image})` }}
                    />
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                      ${space.price}/hr
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{space.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {space.capacity} pax
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      {space.size} sqft
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full h-10">
                      Edit
                    </Button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="pb-4 font-bold text-sm text-gray-400">Client</th>
                    <th className="pb-4 font-bold text-sm text-gray-400">Space</th>
                    <th className="pb-4 font-bold text-sm text-gray-400">Date/Time</th>
                    <th className="pb-4 font-bold text-sm text-gray-400">Amount</th>
                    <th className="pb-4 font-bold text-sm text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {studio.recentBookings.map((booking) => {
                    const bookingStatus = bookingStatusConfig[booking.status as keyof typeof bookingStatusConfig]
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="py-4 font-semibold text-gray-900">{booking.client}</td>
                        <td className="py-4 text-gray-500">{booking.space}</td>
                        <td className="py-4 text-gray-500">{booking.dateTime}</td>
                        <td className="py-4 font-bold text-gray-900">{booking.amount}</td>
                        <td className="py-4">
                          <span className={cn(
                            'flex items-center gap-1.5 font-bold text-xs uppercase tracking-tight',
                            bookingStatus.textColor
                          )}>
                            <span className={cn('w-2 h-2 rounded-full', bookingStatus.dotColor)} />
                            {bookingStatus.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-8">
          {/* Amenities */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {studio.amenities.map((amenity, index) => {
                const Icon = amenity.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50"
                  >
                    <Icon className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Opening Hours</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <ul className="flex flex-col gap-4">
              {studio.openingHours.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
                >
                  <span className={cn(
                    'font-medium',
                    item.closed ? 'text-rose-500' : item.highlight ? 'text-indigo-600 font-bold' : 'text-gray-500'
                  )}>
                    {item.day}
                  </span>
                  <span className={cn(
                    'font-bold',
                    item.closed ? 'text-rose-500' : item.highlight ? 'text-indigo-600' : 'text-gray-900'
                  )}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
            <div
              className="w-full aspect-square rounded-2xl bg-gray-200 bg-cover bg-center overflow-hidden relative"
              style={{ backgroundImage: `url(${studio.location.image})` }}
            >
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <MapPin className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="font-bold text-gray-900">{studio.location.address}</p>
              <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline flex items-center justify-center gap-1 mt-1">
                Get Directions
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add Space Modal */}
      <AddSpaceModal isOpen={isAddSpaceModalOpen} onClose={() => setIsAddSpaceModalOpen(false)} />
    </div>
  )
}
