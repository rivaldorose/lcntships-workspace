'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatCurrency, getInitials } from '@/lib/utils'
import { Send } from 'lucide-react'

interface PendingPayout {
  id: string
  partnerName: string
  amount: number
  studioCount: number
}

interface PayoutCardProps {
  payouts: PendingPayout[]
}

export function PayoutCard({ payouts }: PayoutCardProps) {
  const totalPending = payouts.reduce((sum, p) => sum + p.amount, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pending Payouts</CardTitle>
          <Button size="sm" disabled={payouts.length === 0}>
            <Send className="h-4 w-4 mr-2" />
            Process All
          </Button>
        </div>
        <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalPending)}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {payouts.length > 0 ? (
          payouts.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                    {getInitials(payout.partnerName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{payout.partnerName}</p>
                  <p className="text-xs text-gray-500">{payout.studioCount} studios</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-amber-600">{formatCurrency(payout.amount)}</span>
                <Button size="sm" variant="outline">
                  Pay
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No pending payouts</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
