'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, DollarSign } from 'lucide-react'
import type { Studio } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface StudioCardProps {
  studio: Studio
}

const studioTypeLabels: Record<string, string> = {
  photo: 'Photo',
  video: 'Video',
  podcast: 'Podcast',
  music: 'Music',
  event: 'Event',
}

const statusColors = {
  active: 'success',
  draft: 'secondary',
  inactive: 'destructive',
} as const

export function StudioCard({ studio }: StudioCardProps) {
  const images = studio.images as string[]
  const mainImage = images?.[0] || '/placeholder-studio.jpg'

  return (
    <Link href={`/studios/${studio.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={mainImage}
            alt={studio.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusColors[studio.status as keyof typeof statusColors]}>
              {studio.status}
            </Badge>
            {studio.type && (
              <Badge variant="secondary" className="bg-white/90 text-gray-700">
                {studioTypeLabels[studio.type] || studio.type}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Name & Location */}
          <h3 className="font-semibold text-gray-900 truncate">{studio.name}</h3>
          {studio.city && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>{studio.city}</span>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-gray-900">{studio.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({studio.review_count})</span>
            </div>

            {/* Price */}
            {studio.hourly_rate && (
              <div className="flex items-center gap-1 text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">{formatCurrency(studio.hourly_rate)}</span>
                <span className="text-sm text-gray-500">/hr</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
