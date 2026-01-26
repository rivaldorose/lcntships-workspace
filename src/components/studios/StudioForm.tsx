'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Studio } from '@/types'

interface StudioFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studio?: Studio
  onSubmit?: (data: Partial<Studio>) => void
}

const studioTypes = [
  { value: 'photo', label: 'Photo Studio' },
  { value: 'video', label: 'Video Studio' },
  { value: 'podcast', label: 'Podcast Studio' },
  { value: 'music', label: 'Music Studio' },
  { value: 'event', label: 'Event Space' },
]

export function StudioForm({ open, onOpenChange, studio, onSubmit }: StudioFormProps) {
  const [formData, setFormData] = useState<Partial<Studio>>({
    name: studio?.name || '',
    description: studio?.description || '',
    type: studio?.type || '',
    city: studio?.city || '',
    address: studio?.address || '',
    hourly_rate: studio?.hourly_rate || null,
    half_day_rate: studio?.half_day_rate || null,
    full_day_rate: studio?.full_day_rate || null,
    status: studio?.status || 'draft',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{studio ? 'Edit Studio' : 'Add New Studio'}</DialogTitle>
          <DialogDescription>
            {studio
              ? 'Update the studio details below.'
              : 'Fill in the details to add a new studio to the platform.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Studio Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter studio name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Studio Type *</Label>
                <Select
                  value={formData.type || ''}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {studioTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the studio..."
                rows={3}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Pricing</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  value={formData.hourly_rate || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, hourly_rate: parseFloat(e.target.value) || null })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="half_day_rate">Half Day Rate ($)</Label>
                <Input
                  id="half_day_rate"
                  type="number"
                  value={formData.half_day_rate || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, half_day_rate: parseFloat(e.target.value) || null })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_day_rate">Full Day Rate ($)</Label>
                <Input
                  id="full_day_rate"
                  type="number"
                  value={formData.full_day_rate || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, full_day_rate: parseFloat(e.target.value) || null })
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || 'draft'}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{studio ? 'Save Changes' : 'Add Studio'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
