'use client'

import { useState } from 'react'
import { Plus, Target, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoalTracker } from '@/components/sales/GoalTracker'
import { SalesPipeline } from '@/components/sales/SalesPipeline'
import { LeadForm } from '@/components/sales/LeadForm'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials, formatDate } from '@/lib/utils'
import type { SalesLead } from '@/types'

// Mock leads data
const mockLeads: SalesLead[] = [
  {
    id: '1',
    company_name: 'Starlight Photo Studio',
    contact_name: 'Maria Garcia',
    email: 'maria@starlightphoto.com',
    phone: '+1 (310) 555-1234',
    city: 'Los Angeles',
    studio_type: 'photo',
    status: 'hot',
    source: 'apollo',
    notes: 'Very interested, scheduling demo call',
    last_contacted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    company_name: 'Wave Recording Studio',
    contact_name: 'Tom Wilson',
    email: 'tom@waverecording.com',
    phone: '+1 (512) 555-5678',
    city: 'Austin',
    studio_type: 'music',
    status: 'warm',
    source: 'referral',
    notes: 'Referred by Podcast Pro Studios',
    last_contacted_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    company_name: 'Urban Video Productions',
    contact_name: 'Alex Chen',
    email: 'alex@urbanvideo.com',
    phone: '+1 (212) 555-9012',
    city: 'New York',
    studio_type: 'video',
    status: 'cold',
    source: 'apollo',
    notes: null,
    last_contacted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    company_name: 'Podcast Central',
    contact_name: 'Rachel Kim',
    email: 'rachel@podcastcentral.com',
    phone: '+1 (305) 555-3456',
    city: 'Miami',
    studio_type: 'podcast',
    status: 'hot',
    source: 'inbound',
    notes: 'Filled out contact form, wants to join ASAP',
    last_contacted_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    company_name: 'Creative Space Chicago',
    contact_name: 'David Brown',
    email: 'david@creativespace.com',
    phone: '+1 (312) 555-7890',
    city: 'Chicago',
    studio_type: 'event',
    status: 'warm',
    source: 'outreach',
    notes: 'Interested but needs to discuss with partner',
    last_contacted_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    company_name: 'Sunset Studios',
    contact_name: 'Emma Johnson',
    email: 'emma@sunsetstudios.com',
    phone: '+1 (310) 555-2345',
    city: 'Los Angeles',
    studio_type: 'photo',
    status: 'won',
    source: 'apollo',
    notes: 'Signed contract, onboarding next week',
    last_contacted_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    company_name: 'Beat Factory',
    contact_name: 'Chris Martinez',
    email: 'chris@beatfactory.com',
    phone: '+1 (404) 555-6789',
    city: 'Atlanta',
    studio_type: 'music',
    status: 'cold',
    source: 'apollo',
    notes: null,
    last_contacted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    company_name: 'Film House NYC',
    contact_name: 'Sam Lee',
    email: 'sam@filmhousenyc.com',
    phone: '+1 (212) 555-0123',
    city: 'New York',
    studio_type: 'video',
    status: 'won',
    source: 'referral',
    notes: 'Great partner, very responsive',
    last_contacted_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const statusColors = {
  cold: 'secondary',
  warm: 'warning',
  hot: 'destructive',
  won: 'success',
  lost: 'outline',
} as const

const typeLabels: Record<string, string> = {
  photo: 'Photo',
  video: 'Video',
  podcast: 'Podcast',
  music: 'Music',
  event: 'Event',
}

export default function SalesPage() {
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState<SalesLead | null>(null)

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLeadClick = (lead: SalesLead) => {
    setSelectedLead(lead)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Sales Pipeline"
        description="Track leads and grow to 1,000 studios"
        actions={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        }
      />

      {/* Goal Tracker */}
      <GoalTracker
        currentStudios={127}
        goalStudios={1000}
        weeklyGrowth={12}
        monthlyTarget={50}
      />

      {/* View Toggle and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search leads..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as 'pipeline' | 'table')}>
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {view === 'pipeline' ? (
        <SalesPipeline leads={filteredLeads} onLeadClick={handleLeadClick} />
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="hover:bg-gray-50/50 cursor-pointer"
                  onClick={() => handleLeadClick(lead)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                          {getInitials(lead.company_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{lead.company_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{lead.contact_name || '-'}</p>
                      <p className="text-sm text-gray-500">{lead.email || '-'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{lead.city || '-'}</TableCell>
                  <TableCell>
                    {lead.studio_type && (
                      <Badge variant="outline">
                        {typeLabels[lead.studio_type] || lead.studio_type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="capitalize text-gray-600">{lead.source || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[lead.status as keyof typeof statusColors]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {lead.last_contacted_at
                      ? formatDate(lead.last_contacted_at)
                      : 'Never'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Lead Form */}
      <LeadForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setSelectedLead(null)
        }}
        lead={selectedLead || undefined}
      />
    </div>
  )
}
