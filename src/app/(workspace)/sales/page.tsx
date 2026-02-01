'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Building2,
  Target,
  Trophy,
  TrendingUp,
  Zap,
  BarChart3,
  ChevronRight,
  Grid3X3,
  List,
  Map,
  Loader2,
  Inbox
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { salesLeadsApi, type SalesLead } from '@/lib/supabase'

const sourceColorMap: Record<string, string> = {
  'Apollo': 'bg-purple-100 text-purple-700',
  'Referral': 'bg-blue-100 text-blue-700',
  'Cold Email': 'bg-gray-100 text-gray-700',
  'LinkedIn': 'bg-blue-100 text-blue-700',
  'Website': 'bg-emerald-100 text-emerald-700',
}

const getSourceColor = (source?: string) => {
  if (!source) return 'bg-gray-100 text-gray-700'
  return sourceColorMap[source] || 'bg-gray-100 text-gray-700'
}

const pipelineColumns = [
  { id: 'cold', label: 'Cold', color: 'bg-slate-400', dotColor: 'bg-slate-400' },
  { id: 'warm', label: 'Warm', color: 'bg-amber-400', dotColor: 'bg-amber-400' },
  { id: 'hot', label: 'Hot', color: 'bg-orange-500', dotColor: 'bg-orange-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-indigo-500', dotColor: 'bg-indigo-500' },
  { id: 'closed', label: 'Closed', color: 'bg-emerald-500', dotColor: 'bg-emerald-500' },
]

const milestones = [
  { value: 0, label: 'Start' },
  { value: 250, label: '250' },
  { value: 500, label: '500' },
  { value: 750, label: '750' },
  { value: 1000, label: '1000' },
]

interface LeadCardProps {
  lead: SalesLead
}

function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <Badge className={cn('text-xs font-medium', getSourceColor(lead.source))}>
          {lead.source || 'Unknown'}
        </Badge>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <h4 className="font-semibold text-gray-900 mb-1">{lead.company_name}</h4>

      {lead.city && (
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{lead.city}</span>
        </div>
      )}

      {lead.contact_name && (
        <div className="text-sm text-gray-500 mb-3">{lead.contact_name}</div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        {lead.email && (
          <span className="text-xs text-gray-400 truncate">{lead.email}</span>
        )}
        {lead.phone && (
          <span className="text-xs text-gray-400">{lead.phone}</span>
        )}
      </div>

      <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {lead.phone && (
          <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <Phone className="h-3.5 w-3.5 mx-auto text-gray-500" />
          </button>
        )}
        {lead.email && (
          <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <Mail className="h-3.5 w-3.5 mx-auto text-gray-500" />
          </button>
        )}
        <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <Building2 className="h-3.5 w-3.5 mx-auto text-gray-500" />
        </button>
      </div>
    </div>
  )
}

export default function SalesPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'pipeline' | 'list' | 'map'>('pipeline')
  const [leads, setLeads] = useState<SalesLead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await salesLeadsApi.getAll()
        setLeads(data || [])
      } catch (error) {
        console.error('Error loading leads:', error)
        setLeads([])
      } finally {
        setLoading(false)
      }
    }
    loadLeads()
  }, [])

  // Calculate stats from real data
  const coldLeads = leads.filter(l => l.status === 'cold')
  const warmLeads = leads.filter(l => l.status === 'warm')
  const hotLeads = leads.filter(l => l.status === 'hot')
  const negotiationLeads = leads.filter(l => l.status === 'negotiation')
  const closedLeads = leads.filter(l => l.status === 'closed')

  const activeLeadsCount = coldLeads.length + warmLeads.length + hotLeads.length + negotiationLeads.length
  const totalLeads = leads.length
  const conversionRate = totalLeads > 0 ? Math.round((closedLeads.length / totalLeads) * 100) : 0

  const currentStudios = closedLeads.length
  const goalStudios = 1000
  const progressPercent = (currentStudios / goalStudios) * 100

  const getLeadsByStatus = (status: string) => {
    return leads.filter(l => l.status === status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="p-4 rounded-full bg-gray-100 mb-4">
          <Inbox className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Nog geen leads</h2>
        <p className="text-gray-500 mb-6">Voeg je eerste sales lead toe</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section - Road to 1000 */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-indigo-200" />
                <span className="text-indigo-200 text-sm font-medium">Company Goal</span>
              </div>
              <h1 className="text-3xl font-bold">Road to 1,000 Studios</h1>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{currentStudios}</div>
              <div className="text-indigo-200">of {goalStudios.toLocaleString()} studios</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Milestones */}
            <div className="flex justify-between mt-2">
              {milestones.map((milestone) => (
                <div key={milestone.value} className="flex flex-col items-center">
                  <div className={cn(
                    'w-3 h-3 rounded-full border-2 -mt-5 mb-1',
                    currentStudios >= milestone.value
                      ? 'bg-emerald-400 border-emerald-300'
                      : 'bg-white/20 border-white/40'
                  )} />
                  <span className="text-xs text-indigo-200">{milestone.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeLeadsCount}</div>
              <div className="text-indigo-200 text-sm">Active Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{closedLeads.length}</div>
              <div className="text-indigo-200 text-sm">Closed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <div className="text-indigo-200 text-sm">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalLeads}</div>
              <div className="text-indigo-200 text-sm">Total Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={activeFilter === 'cold' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'cold' ? null : 'cold')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-slate-400 mr-2" />
            Cold Leads
            <Badge variant="secondary" className="ml-2">{coldLeads.length}</Badge>
          </Button>
          <Button
            variant={activeFilter === 'warm' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'warm' ? null : 'warm')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
            Warm Leads
            <Badge variant="secondary" className="ml-2">{warmLeads.length}</Badge>
          </Button>
          <Button
            variant={activeFilter === 'hot' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'hot' ? null : 'hot')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
            Hot Leads
            <Badge variant="secondary" className="ml-2">{hotLeads.length}</Badge>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('pipeline')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'pipeline' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <Map className="h-4 w-4" />
            </button>
          </div>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {pipelineColumns.map((column) => {
          const columnLeads = getLeadsByStatus(column.id)
          const showColumn = !activeFilter || activeFilter === column.id

          if (!showColumn) return null

          return (
            <div key={column.id} className="bg-gray-50/50 rounded-2xl p-4">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2.5 h-2.5 rounded-full', column.dotColor)} />
                  <span className="font-semibold text-gray-900">{column.label}</span>
                  <Badge variant="secondary" className="text-xs">{columnLeads.length}</Badge>
                </div>
                <span className="text-sm text-gray-500">{columnLeads.length} leads</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {columnLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}

                {/* Add Card Button */}
                <button className="w-full p-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add lead</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Outreach Tools */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-50">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Outreach Tools</h3>
              <p className="text-sm text-gray-500">Quick actions</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">Send Bulk Emails</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">LinkedIn Campaign</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">Schedule Calls</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-50">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Sources</h3>
              <p className="text-sm text-gray-500">Lead origins</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Apollo</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Referrals</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cold Email</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Website</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Funnel Health */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Funnel Health</h3>
              <p className="text-sm text-gray-500">Conversion rates</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Cold → Warm</span>
              <span className="text-sm font-semibold text-emerald-600">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Warm → Hot</span>
              <span className="text-sm font-semibold text-emerald-600">62%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Hot → Closed</span>
              <span className="text-sm font-semibold text-emerald-600">78%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Overall</span>
              <span className="text-sm font-semibold text-emerald-600">{conversionRate}%</span>
            </div>
          </div>
        </div>

        {/* Top Closers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-50">
              <Trophy className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Closers</h3>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                S
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Sarah Chen</div>
                <div className="text-xs text-gray-500">12 studios</div>
              </div>
              <Badge className="bg-amber-100 text-amber-700">1st</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
                M
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Mike Johnson</div>
                <div className="text-xs text-gray-500">9 studios</div>
              </div>
              <Badge className="bg-gray-100 text-gray-700">2nd</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Alex Rivera</div>
                <div className="text-xs text-gray-500">7 studios</div>
              </div>
              <Badge className="bg-orange-100 text-orange-700">3rd</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
