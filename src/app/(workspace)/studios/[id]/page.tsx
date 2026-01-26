'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Star, Clock, DollarSign, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/utils'

// Mock data - in production, this would be fetched from Supabase
const mockStudio = {
  id: '1',
  partner_id: 'partner-1',
  name: 'Sunlight Studios',
  description:
    'Beautiful natural light photo studio perfect for portraits and product shoots. Features floor-to-ceiling windows with diffused lighting, multiple shooting areas, and professional-grade equipment.',
  type: 'photo',
  city: 'Los Angeles',
  address: '1234 Sunset Blvd, Los Angeles, CA 90028',
  hourly_rate: 150,
  half_day_rate: 500,
  full_day_rate: 900,
  amenities: ['WiFi', 'Parking', 'Makeup Station', 'Green Screen', 'Kitchen', 'Lounge'],
  equipment: ['Lighting Kits', 'Backdrops', 'Reflectors', 'C-Stands', 'Softboxes'],
  images: [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  ],
  status: 'active',
  rating: 4.9,
  review_count: 128,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const recentBookings = [
  { id: '1', customer: 'Sarah Chen', date: 'Jan 28, 2025', time: '9:00 AM - 12:00 PM', status: 'completed' },
  { id: '2', customer: 'Mike Rodriguez', date: 'Jan 25, 2025', time: '2:00 PM - 6:00 PM', status: 'completed' },
  { id: '3', customer: 'Emily Watson', date: 'Jan 30, 2025', time: '10:00 AM - 2:00 PM', status: 'confirmed' },
]

export default function StudioDetailPage() {
  const params = useParams()
  const studioId = params.id

  // In production, fetch studio data based on studioId
  const studio = mockStudio

  const images = studio.images as string[]
  const amenities = studio.amenities as string[]
  const equipment = studio.equipment as string[]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Link */}
      <Link
        href="/studios"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Studios
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{studio.name}</h1>
            <Badge variant={studio.status === 'active' ? 'success' : 'secondary'}>
              {studio.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{studio.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-gray-900">{studio.rating}</span>
              <span>({studio.review_count} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-4 h-80">
        <div className="col-span-2 relative rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={images[0] || '/placeholder-studio.jpg'}
            alt={studio.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          {images.slice(1, 3).map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden bg-gray-100">
              <Image src={img} alt={`${studio.name} ${i + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About this studio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{studio.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equipment Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {equipment.map((item) => (
                      <Badge key={item} variant="outline" className="text-sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Hourly</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(studio.hourly_rate || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Half Day (4hr)</span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(studio.half_day_rate || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Full Day (8hr)</span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(studio.full_day_rate || 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{studio.address}</p>
                  <div className="mt-4 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    Map Placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer}</p>
                      <p className="text-sm text-gray-500">
                        {booking.date} • {booking.time}
                      </p>
                    </div>
                    <Badge
                      variant={booking.status === 'completed' ? 'secondary' : 'success'}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Reviews coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
