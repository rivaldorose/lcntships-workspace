'use client'

import { useState } from 'react'
import { Search, UserCircle, Calendar, DollarSign } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/dashboard/StatsCard'
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
import { MoreHorizontal, Eye, Mail } from 'lucide-react'
import { formatCurrency, getInitials, formatDate } from '@/lib/utils'
import type { Customer } from '@/types'

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    user_id: null,
    full_name: 'Sarah Chen',
    email: 'sarah@example.com',
    phone: '+1 (310) 555-1234',
    company: 'Chen Productions',
    total_bookings: 12,
    total_spent: 5400,
    created_at: '2024-03-15',
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: null,
    full_name: 'Mike Rodriguez',
    email: 'mike@podcastco.com',
    phone: '+1 (212) 555-5678',
    company: 'Podcast Co',
    total_bookings: 24,
    total_spent: 9600,
    created_at: '2023-11-20',
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: null,
    full_name: 'Emily Watson',
    email: 'emily@watsonprod.com',
    phone: '+1 (312) 555-9012',
    company: 'Watson Productions',
    total_bookings: 8,
    total_spent: 3200,
    created_at: '2024-06-10',
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: null,
    full_name: 'James Kim',
    email: 'james@techtalkshow.com',
    phone: '+1 (512) 555-3456',
    company: 'Tech Talk Show',
    total_bookings: 18,
    total_spent: 6750,
    created_at: '2024-01-05',
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    user_id: null,
    full_name: 'Lisa Martinez',
    email: 'lisa@creativemedia.com',
    phone: '+1 (305) 555-7890',
    company: 'Creative Media LLC',
    total_bookings: 6,
    total_spent: 2700,
    created_at: '2024-08-22',
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    user_id: null,
    full_name: 'David Johnson',
    email: 'david@jmedia.com',
    phone: '+1 (404) 555-2345',
    company: null,
    total_bookings: 3,
    total_spent: 1125,
    created_at: '2024-10-18',
    updated_at: new Date().toISOString(),
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalCustomers = mockCustomers.length
  const totalBookings = mockCustomers.reduce((sum, c) => sum + c.total_bookings, 0)
  const totalSpent = mockCustomers.reduce((sum, c) => sum + c.total_spent, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Customers" description="Manage your studio renters" />

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <StatsCard
          title="Total Customers"
          value={totalCustomers}
          change="+8 this month"
          changeType="positive"
          icon={UserCircle}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          change="Across all customers"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalSpent)}
          change="Lifetime value"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search customers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>Customer</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Member Since</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                        {getInitials(customer.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{customer.full_name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{customer.company || '-'}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{customer.total_bookings} bookings</Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(customer.total_spent)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500">{formatDate(customer.created_at)}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Bookings
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
    </div>
  )
}
