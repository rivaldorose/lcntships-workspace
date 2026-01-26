'use client'

import { useState } from 'react'
import { Plus, Users, Building2, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { PartnerTable } from '@/components/partners/PartnerTable'
import { PartnerForm } from '@/components/partners/PartnerForm'
import type { Partner } from '@/types'
import { Search } from 'lucide-react'

// Mock data
const mockPartners: Partner[] = [
  {
    id: '1',
    user_id: null,
    company_name: 'Sunlight Studios LLC',
    contact_name: 'Jessica Martinez',
    email: 'jessica@sunlightstudios.com',
    phone: '+1 (310) 555-0123',
    city: 'Los Angeles',
    status: 'active',
    total_revenue: 45680,
    pending_payout: 3240,
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: null,
    company_name: 'Echo Sound Productions',
    contact_name: 'David Chen',
    email: 'david@echosound.com',
    phone: '+1 (212) 555-0456',
    city: 'New York',
    status: 'active',
    total_revenue: 38920,
    pending_payout: 5120,
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: null,
    company_name: 'The Creative Loft',
    contact_name: 'Amanda Williams',
    email: 'amanda@creativeloft.com',
    phone: '+1 (312) 555-0789',
    city: 'Chicago',
    status: 'active',
    total_revenue: 28450,
    pending_payout: 2180,
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: null,
    company_name: 'Podcast Pro Studios',
    contact_name: 'Robert Kim',
    email: 'robert@podcastpro.com',
    phone: '+1 (512) 555-0321',
    city: 'Austin',
    status: 'active',
    total_revenue: 52340,
    pending_payout: 4560,
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    user_id: null,
    company_name: null,
    contact_name: 'Michael Johnson',
    email: 'michael@beatstudio.com',
    phone: '+1 (305) 555-0654',
    city: 'Miami',
    status: 'pending',
    total_revenue: 0,
    pending_payout: 0,
    notes: 'New partner onboarding',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    user_id: null,
    company_name: 'Gallery Events Co',
    contact_name: 'Sarah Thompson',
    email: 'sarah@galleryevents.com',
    phone: '+1 (310) 555-0987',
    city: 'Los Angeles',
    status: 'inactive',
    total_revenue: 15620,
    pending_payout: 0,
    notes: 'Paused operations',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function PartnersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPartners = mockPartners.filter(
    (partner) =>
      partner.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activePartners = mockPartners.filter((p) => p.status === 'active').length
  const totalStudios = 15 // Mock number
  const pendingPayouts = mockPartners.reduce((sum, p) => sum + p.pending_payout, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Partners"
        description="Manage studio partners and their payouts"
        actions={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <StatsCard
          title="Active Partners"
          value={activePartners}
          change={`${mockPartners.length} total partners`}
          changeType="neutral"
          icon={Users}
          iconColor="text-purple-600 bg-purple-50"
        />
        <StatsCard
          title="Total Studios"
          value={totalStudios}
          change="Across all partners"
          changeType="neutral"
          icon={Building2}
          iconColor="text-blue-600 bg-blue-50"
        />
        <StatsCard
          title="Pending Payouts"
          value={`$${pendingPayouts.toLocaleString()}`}
          change="Ready to process"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search partners..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <PartnerTable partners={filteredPartners} />

      {/* Form Dialog */}
      <PartnerForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  )
}
