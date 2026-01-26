'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LeadCard } from './LeadCard'
import type { SalesLead, LeadStatus } from '@/types'
import { cn } from '@/lib/utils'

interface SalesPipelineProps {
  leads: SalesLead[]
  onLeadClick?: (lead: SalesLead) => void
}

const columns: { status: LeadStatus; title: string; color: string }[] = [
  { status: 'cold', title: 'Cold', color: 'bg-gray-500' },
  { status: 'warm', title: 'Warm', color: 'bg-amber-500' },
  { status: 'hot', title: 'Hot', color: 'bg-orange-500' },
  { status: 'won', title: 'Won', color: 'bg-emerald-500' },
]

export function SalesPipeline({ leads, onLeadClick }: SalesPipelineProps) {
  const getLeadsByStatus = (status: LeadStatus) =>
    leads.filter((lead) => lead.status === status)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {columns.map((column) => {
        const columnLeads = getLeadsByStatus(column.status)
        return (
          <div key={column.status} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn('w-3 h-3 rounded-full', column.color)} />
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
              </div>
              <Badge variant="secondary" className="font-normal">
                {columnLeads.length}
              </Badge>
            </div>

            {/* Drop Zone */}
            <div
              className={cn(
                'min-h-[400px] p-2 rounded-xl border-2 border-dashed transition-colors',
                'border-gray-200 bg-gray-50/50'
              )}
            >
              <div className="space-y-3">
                {columnLeads.length > 0 ? (
                  columnLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onClick={() => onLeadClick?.(lead)}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-gray-400">
                    No leads
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
