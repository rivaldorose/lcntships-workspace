'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { StudioCard } from '@/components/studios/StudioCard'
import { StudioFilters } from '@/components/studios/StudioFilters'
import { StudioForm } from '@/components/studios/StudioForm'
import type { Studio } from '@/types'

// Mock data for demonstration
const mockStudios: Studio[] = [
  {
    id: '1',
    partner_id: null,
    name: 'Sunlight Studios',
    description: 'Beautiful natural light photo studio perfect for portraits and product shoots.',
    type: 'photo',
    city: 'Los Angeles',
    address: '1234 Sunset Blvd, Los Angeles, CA',
    hourly_rate: 150,
    half_day_rate: 500,
    full_day_rate: 900,
    amenities: ['WiFi', 'Parking', 'Makeup Station', 'Green Screen'],
    equipment: ['Lighting Kits', 'Backdrops', 'Reflectors'],
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800'],
    status: 'active',
    rating: 4.9,
    review_count: 128,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    partner_id: null,
    name: 'Echo Sound Studio',
    description: 'Professional music recording and podcast studio with top-tier equipment.',
    type: 'podcast',
    city: 'New York',
    address: '567 Broadway, New York, NY',
    hourly_rate: 200,
    half_day_rate: 700,
    full_day_rate: 1200,
    amenities: ['WiFi', 'Sound Booth', 'Control Room', 'Lounge'],
    equipment: ['Microphones', 'Mixing Console', 'Monitors'],
    images: ['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800'],
    status: 'active',
    rating: 4.8,
    review_count: 95,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    partner_id: null,
    name: 'The Creative Loft',
    description: 'Versatile creative space ideal for video productions and events.',
    type: 'video',
    city: 'Chicago',
    address: '890 Michigan Ave, Chicago, IL',
    hourly_rate: 175,
    half_day_rate: 600,
    full_day_rate: 1000,
    amenities: ['WiFi', 'Kitchen', 'Wardrobe', 'Props Room'],
    equipment: ['LED Panels', 'C-Stands', 'Teleprompter'],
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    status: 'active',
    rating: 4.7,
    review_count: 72,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    partner_id: null,
    name: 'Podcast Pro Studio',
    description: 'State-of-the-art podcast recording facility with multiple setups.',
    type: 'podcast',
    city: 'Austin',
    address: '456 Congress Ave, Austin, TX',
    hourly_rate: 125,
    half_day_rate: 400,
    full_day_rate: 700,
    amenities: ['WiFi', 'Green Room', 'Streaming Setup'],
    equipment: ['Rode Mics', 'Audio Interface', 'Cameras'],
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800'],
    status: 'active',
    rating: 4.9,
    review_count: 156,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    partner_id: null,
    name: 'Urban Beat Studio',
    description: 'Music production studio with live room and isolation booths.',
    type: 'music',
    city: 'Miami',
    address: '123 Collins Ave, Miami, FL',
    hourly_rate: 250,
    half_day_rate: 800,
    full_day_rate: 1400,
    amenities: ['WiFi', 'Lounge', 'Vocal Booth', 'Drum Room'],
    equipment: ['Pro Tools', 'SSL Console', 'Outboard Gear'],
    images: ['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800'],
    status: 'draft',
    rating: 0,
    review_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    partner_id: null,
    name: 'Gallery Event Space',
    description: 'Elegant event venue perfect for launches, exhibitions, and gatherings.',
    type: 'event',
    city: 'Los Angeles',
    address: '789 Arts District, Los Angeles, CA',
    hourly_rate: 300,
    half_day_rate: 1000,
    full_day_rate: 1800,
    amenities: ['WiFi', 'Catering Kitchen', 'AV System', 'Valet Parking'],
    equipment: ['Projector', 'Sound System', 'Lighting Rig'],
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
    status: 'inactive',
    rating: 4.6,
    review_count: 34,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function StudiosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filteredStudios, setFilteredStudios] = useState(mockStudios)

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredStudios(mockStudios)
      return
    }
    const filtered = mockStudios.filter(
      (studio) =>
        studio.name.toLowerCase().includes(query.toLowerCase()) ||
        studio.city?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredStudios(filtered)
  }

  const handleTypeFilter = (type: string) => {
    if (type === 'all') {
      setFilteredStudios(mockStudios)
      return
    }
    const filtered = mockStudios.filter((studio) => studio.type === type)
    setFilteredStudios(filtered)
  }

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      setFilteredStudios(mockStudios)
      return
    }
    const filtered = mockStudios.filter((studio) => studio.status === status)
    setFilteredStudios(filtered)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Studios"
        description={`${mockStudios.length} studios on the platform`}
        actions={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Studio
          </Button>
        }
      />

      <StudioFilters
        onSearchChange={handleSearch}
        onTypeChange={handleTypeFilter}
        onStatusChange={handleStatusFilter}
      />

      {filteredStudios.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No studios found matching your filters.</p>
        </div>
      )}

      <StudioForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  )
}
