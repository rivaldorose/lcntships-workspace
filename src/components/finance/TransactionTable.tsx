'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowUpRight, ArrowDownLeft, RefreshCcw } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Transaction } from '@/types'

interface TransactionTableProps {
  transactions: Transaction[]
}

const typeConfig = {
  booking_revenue: {
    icon: ArrowUpRight,
    label: 'Booking Revenue',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  payout: {
    icon: ArrowDownLeft,
    label: 'Partner Payout',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  refund: {
    icon: RefreshCcw,
    label: 'Refund',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const config = typeConfig[transaction.type as keyof typeof typeConfig]
            const Icon = config?.icon || ArrowUpRight
            return (
              <TableRow key={transaction.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2 rounded-lg', config?.bgColor)}>
                      <Icon className={cn('h-4 w-4', config?.color)} />
                    </div>
                    <span className="font-medium text-gray-900">{config?.label || transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{transaction.description || '-'}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'font-medium',
                      transaction.type === 'booking_revenue'
                        ? 'text-emerald-600'
                        : transaction.type === 'refund'
                        ? 'text-red-600'
                        : 'text-gray-900'
                    )}
                  >
                    {transaction.type === 'booking_revenue' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.status === 'completed' ? 'success' : 'warning'}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500">{formatDate(transaction.created_at)}</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
