'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Mail, Building2 } from 'lucide-react'
import { formatCurrency, getInitials } from '@/lib/utils'
import type { Partner } from '@/types'
import Link from 'next/link'

interface PartnerTableProps {
  partners: Partner[]
  onSelect?: (partner: Partner) => void
}

const statusColors = {
  pending: 'warning',
  active: 'success',
  inactive: 'secondary',
} as const

export function PartnerTable({ partners, onSelect }: PartnerTableProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead>Partner</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Total Revenue</TableHead>
            <TableHead>Pending Payout</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow
              key={partner.id}
              className="hover:bg-gray-50/50 cursor-pointer"
              onClick={() => onSelect?.(partner)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                      {getInitials(partner.company_name || partner.contact_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {partner.company_name || partner.contact_name}
                    </p>
                    <p className="text-sm text-gray-500">{partner.contact_name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{partner.city || '-'}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium text-gray-900">
                  {formatCurrency(partner.total_revenue)}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={
                    partner.pending_payout > 0 ? 'font-medium text-amber-600' : 'text-gray-500'
                  }
                >
                  {formatCurrency(partner.pending_payout)}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={statusColors[partner.status as keyof typeof statusColors]}>
                  {partner.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/partners/${partner.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Partner
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Building2 className="h-4 w-4 mr-2" />
                      View Studios
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
