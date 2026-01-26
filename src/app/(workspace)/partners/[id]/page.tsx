'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Building2, DollarSign, Calendar, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatCurrency, getInitials } from '@/lib/utils'

// Mock data
const mockPartner = {
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
  notes: 'Premium partner since 2023. Very responsive and professional.',
  created_at: '2023-06-15',
  updated_at: new Date().toISOString(),
}

const mockStudios = [
  { id: '1', name: 'Sunlight Studios - Main', type: 'photo', status: 'active', bookings: 128, revenue: 32450 },
  { id: '2', name: 'Sunlight Studios - East', type: 'video', status: 'active', bookings: 56, revenue: 13230 },
]

const recentPayouts = [
  { id: '1', date: 'Jan 15, 2025', amount: 4250, status: 'completed' },
  { id: '2', date: 'Jan 01, 2025', amount: 3890, status: 'completed' },
  { id: '3', date: 'Dec 15, 2024', amount: 5120, status: 'completed' },
]

export default function PartnerDetailPage() {
  const partner = mockPartner

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Link */}
      <Link
        href="/partners"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Partners
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
              {getInitials(partner.company_name || partner.contact_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {partner.company_name || partner.contact_name}
              </h1>
              <Badge variant={partner.status === 'active' ? 'success' : 'secondary'}>
                {partner.status}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">{partner.contact_name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button>Process Payout</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(partner.total_revenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payout</p>
                <p className="text-xl font-bold text-amber-600">
                  {formatCurrency(partner.pending_payout)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Studios</p>
                <p className="text-xl font-bold text-gray-900">{mockStudios.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockStudios.reduce((sum, s) => sum + s.bookings, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Studios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Studios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockStudios.map((studio) => (
                <div
                  key={studio.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900">{studio.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="capitalize">{studio.type}</span>
                      <span>{studio.bookings} bookings</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(studio.revenue)}</p>
                    <Badge variant={studio.status === 'active' ? 'success' : 'secondary'}>
                      {studio.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Payouts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Payouts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="text-sm text-gray-500">{payout.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{formatCurrency(payout.amount)}</span>
                    <Badge variant="secondary">{payout.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${partner.email}`}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  {partner.email}
                </a>
              </div>
              {partner.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{partner.phone}</span>
                </div>
              )}
              {partner.city && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{partner.city}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {partner.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{partner.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Partner Since */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Partner since</p>
              <p className="font-medium text-gray-900">{partner.created_at}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
