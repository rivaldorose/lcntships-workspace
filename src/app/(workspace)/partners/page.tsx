'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  MapPin,
  User,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mock data
const mockPartners = [
  {
    id: '1',
    company_name: 'Lumina Yoga',
    contact_name: 'Sarah Chen',
    location: 'Downtown San Francisco, CA',
    status: 'active',
    type: 'Yoga',
    bookings_per_month: 142,
    revenue_share: 15,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200',
  },
  {
    id: '2',
    company_name: 'Core Pilates',
    contact_name: 'Marc J. Peterson',
    location: 'Brooklyn Heights, NY',
    status: 'active',
    type: 'Pilates',
    bookings_per_month: 89,
    revenue_share: 12.5,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200',
  },
  {
    id: '3',
    company_name: 'Summit Peak',
    contact_name: 'Elena Rodriguez',
    location: 'Austin, TX',
    status: 'pending',
    type: 'Crossfit',
    bookings_per_month: 0,
    revenue_share: 20,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200',
  },
  {
    id: '4',
    company_name: 'Velocity Hub',
    contact_name: 'David Miller',
    location: 'London, UK',
    status: 'active',
    type: 'Cycling',
    bookings_per_month: 215,
    revenue_share: 18,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200',
  },
  {
    id: '5',
    company_name: 'Sunlight Studios',
    contact_name: 'Jessica Martinez',
    location: 'Los Angeles, CA',
    status: 'active',
    type: 'Photo',
    bookings_per_month: 128,
    revenue_share: 15,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200',
  },
  {
    id: '6',
    company_name: 'Echo Sound',
    contact_name: 'David Chen',
    location: 'New York, NY',
    status: 'inactive',
    type: 'Music',
    bookings_per_month: 56,
    revenue_share: 15,
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=200',
  },
]

const statusConfig = {
  active: {
    label: 'Active',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-600',
  },
  pending: {
    label: 'Pending',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-600',
  },
  inactive: {
    label: 'Inactive',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-700',
    dotColor: 'bg-rose-600',
  },
}

const studioTypes = ['All Types', 'Yoga', 'Pilates', 'Crossfit', 'Cycling', 'Photo', 'Music', 'Video', 'Podcast']

interface PartnerCardProps {
  partner: typeof mockPartners[0]
}

function PartnerCard({ partner }: PartnerCardProps) {
  const status = statusConfig[partner.status as keyof typeof statusConfig]

  return (
    <Link href={`/partners/${partner.id}`}>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group relative">
        <button className="absolute top-6 right-6 text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-5 w-5" />
        </button>

        {/* Header with Avatar */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            {partner.image ? (
              <img
                src={partner.image}
                alt={partner.company_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="h-8 w-8 text-indigo-400" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {partner.company_name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <User className="h-4 w-4" />
              <p className="text-sm font-medium">{partner.contact_name}</p>
            </div>
          </div>
        </div>

        {/* Location & Status */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{partner.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1',
              status.bgColor,
              status.textColor
            )}>
              <span className={cn('w-1.5 h-1.5 rounded-full', status.dotColor)} />
              {status.label}
            </div>
            <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
              {partner.type}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Bookings</p>
            <p className="text-base font-bold text-gray-900">
              {partner.bookings_per_month > 0 ? `${partner.bookings_per_month}/mo` : '-'}
            </p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col items-end">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Revenue Share</p>
            <p className="text-base font-bold text-indigo-600">{partner.revenue_share}%</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('All Types')

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || partner.status === statusFilter
    const matchesType = typeFilter === 'All Types' || partner.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Partners</h1>
          <p className="text-gray-500">Manage and track your global studio network and collaborators.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full h-12 px-6">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button className="rounded-full h-12 px-6 shadow-lg shadow-indigo-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search partners, owners, or locations..."
              className="pl-12 h-12 text-base rounded-full border-gray-200 bg-gray-50 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Chips & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
                Filter by Status:
              </span>
              <Button
                variant={!statusFilter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(null)}
                className="rounded-full"
              >
                All Partners
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
                className="rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                Active
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
                className="rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                Pending
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('inactive')}
                className="rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 mr-2" />
                Inactive
              </Button>
            </div>

            {/* Type Tabs */}
            <div className="flex border-b border-gray-200 gap-4 overflow-x-auto">
              {studioTypes.slice(0, 5).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    'pb-2 px-1 text-sm font-bold border-b-2 transition-colors whitespace-nowrap',
                    typeFilter === type
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}

        {/* Add New Partner Card */}
        <div className="bg-transparent border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-white transition-all cursor-pointer group min-h-[320px]">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            <Plus className="h-8 w-8" />
          </div>
          <p className="text-lg font-bold text-gray-900">Add New Partner</p>
          <p className="text-sm text-gray-500 mt-2 px-6">
            Expand your network by adding another studio partner.
          </p>
        </div>
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  )
}
