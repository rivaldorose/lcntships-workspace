'use client'

import { DollarSign, TrendingUp, Users, CreditCard } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { RevenueChart } from '@/components/finance/RevenueChart'
import { TransactionTable } from '@/components/finance/TransactionTable'
import { PayoutCard } from '@/components/finance/PayoutCard'
import type { Transaction } from '@/types'

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    booking_id: 'b1',
    partner_id: 'p1',
    type: 'booking_revenue',
    amount: 450,
    description: 'Sunlight Studios - Sarah Chen booking',
    status: 'completed',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    booking_id: 'b2',
    partner_id: 'p2',
    type: 'booking_revenue',
    amount: 800,
    description: 'Echo Sound Studio - Mike Rodriguez booking',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    booking_id: null,
    partner_id: 'p3',
    type: 'payout',
    amount: 2450,
    description: 'Weekly payout - Creative Loft Studios',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '4',
    booking_id: 'b4',
    partner_id: 'p4',
    type: 'booking_revenue',
    amount: 375,
    description: 'Podcast Pro Studio - James Kim booking',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '5',
    booking_id: 'b5',
    partner_id: 'p1',
    type: 'refund',
    amount: 150,
    description: 'Partial refund - Sunlight Studios',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: '6',
    booking_id: null,
    partner_id: 'p2',
    type: 'payout',
    amount: 3890,
    description: 'Weekly payout - Echo Sound Productions',
    status: 'pending',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '7',
    booking_id: 'b7',
    partner_id: 'p1',
    type: 'booking_revenue',
    amount: 900,
    description: 'Sunlight Studios - Full day booking',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
]

const pendingPayouts = [
  { id: '1', partnerName: 'Sunlight Studios LLC', amount: 3240, studioCount: 2 },
  { id: '2', partnerName: 'Echo Sound Productions', amount: 5120, studioCount: 1 },
  { id: '3', partnerName: 'The Creative Loft', amount: 2180, studioCount: 1 },
  { id: '4', partnerName: 'Podcast Pro Studios', amount: 4560, studioCount: 2 },
]

export default function FinancePage() {
  const totalRevenue = 128780
  const platformFees = 19317 // 15%
  const partnerPayouts = 109463 // 85%
  const pendingPayoutsTotal = pendingPayouts.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Finance"
        description="Track revenue, fees, and partner payouts"
      />

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+18% vs last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatsCard
          title="Platform Fees (15%)"
          value={`$${platformFees.toLocaleString()}`}
          change="Your commission"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <StatsCard
          title="Partner Payouts (85%)"
          value={`$${partnerPayouts.toLocaleString()}`}
          change="Paid to partners"
          changeType="neutral"
          icon={Users}
          iconColor="text-blue-600 bg-blue-50"
        />
        <StatsCard
          title="Pending Payouts"
          value={`$${pendingPayoutsTotal.toLocaleString()}`}
          change={`${pendingPayouts.length} partners waiting`}
          changeType="neutral"
          icon={CreditCard}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Charts and Payouts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <PayoutCard payouts={pendingPayouts} />
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <TransactionTable transactions={mockTransactions} />
      </div>
    </div>
  )
}
