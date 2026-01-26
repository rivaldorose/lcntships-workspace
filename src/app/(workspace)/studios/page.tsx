'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import {
  Plus,
  Search,
  Map,
  MapPin,
  Building2,
  BarChart3,
  ChevronDown,
  X,
  ChevronRight,
  User,
  Upload,
  Instagram,
  Globe,
  Clock,
  Check,
  Camera,
  Wifi,
  Coffee,
  Car,
  Printer,
  Wind,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Mock studio data
const mockStudios = [
  {
    id: '1',
    name: 'The North Loft',
    location: 'Brooklyn, NY',
    spaces: 12,
    occupancy: 94,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    id: '2',
    name: 'Riverside Yoga Collective',
    location: 'Berlin Mitte',
    spaces: 5,
    occupancy: 82,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
  },
  {
    id: '3',
    name: 'Zenith Meeting Hub',
    location: 'London Shoreditch',
    spaces: 8,
    occupancy: 75,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
  },
  {
    id: '4',
    name: 'Urban Creative Studio',
    location: 'Amsterdam West',
    spaces: 10,
    occupancy: 88,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
  },
  {
    id: '5',
    name: 'Harbor Meeting Point',
    location: 'San Francisco, CA',
    spaces: 4,
    occupancy: 65,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800',
  },
  {
    id: '6',
    name: 'Bloom Wellness Space',
    location: 'Paris, FR',
    spaces: 7,
    occupancy: 91,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
]

const statusConfig = {
  active: {
    label: 'Active',
    bgColor: 'bg-emerald-500/90',
  },
  inactive: {
    label: 'Inactive',
    bgColor: 'bg-gray-500/90',
  },
  draft: {
    label: 'Draft',
    bgColor: 'bg-amber-500/90',
  },
}

// Studio Card Component
function StudioCard({ studio }: { studio: typeof mockStudios[0] }) {
  const status = statusConfig[studio.status as keyof typeof statusConfig]

  return (
    <Link href={`/studios/${studio.id}`} className="group">
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        {/* Image */}
        <div className="relative p-4">
          <div
            className="w-full aspect-[16/10] bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${studio.image})` }}
          />
          <div className={cn(
            'absolute top-6 right-6 px-3 py-1 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full',
            status.bgColor
          )}>
            {status.label}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <div>
            <h3 className="text-gray-900 text-xl font-bold leading-tight group-hover:text-indigo-600 transition-colors">
              {studio.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{studio.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full">
              <Building2 className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-gray-700">{studio.spaces} Spaces</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-gray-700">{studio.occupancy}% Occupancy</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Add Studio Wizard Modal
interface AddStudioModalProps {
  isOpen: boolean
  onClose: () => void
}

interface StudioFormData {
  // Step 1: Basics
  name: string
  category: string
  contactPerson: string
  description: string
  // Step 2: Location & Hours
  address: string
  city: string
  postalCode: string
  operatingHours: {
    day: string
    enabled: boolean
    open: string
    close: string
  }[]
  // Step 3: Media
  coverImage: File | null
  additionalImages: File[]
  instagram: string
  website: string
  // Step 4: Space
  spaceName: string
  capacity: string
  pricePerHour: string
}

function AddStudioModal({ isOpen, onClose }: AddStudioModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<StudioFormData>({
    name: '',
    category: '',
    contactPerson: '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    operatingHours: [
      { day: 'Monday', enabled: true, open: '09:00', close: '18:00' },
      { day: 'Tuesday', enabled: true, open: '09:00', close: '18:00' },
      { day: 'Wednesday', enabled: true, open: '09:00', close: '18:00' },
      { day: 'Thursday', enabled: true, open: '09:00', close: '18:00' },
      { day: 'Friday', enabled: true, open: '09:00', close: '20:00' },
      { day: 'Saturday', enabled: false, open: '10:00', close: '16:00' },
      { day: 'Sunday', enabled: false, open: '10:00', close: '16:00' },
    ],
    coverImage: null,
    additionalImages: [],
    instagram: '',
    website: '',
    spaceName: '',
    capacity: '',
    pricePerHour: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateFormData = <K extends keyof StudioFormData>(key: K, value: StudioFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit
      console.log('Submit:', formData)
      handleClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    onClose()
  }

  const toggleDayEnabled = (index: number) => {
    const newHours = [...formData.operatingHours]
    newHours[index].enabled = !newHours[index].enabled
    updateFormData('operatingHours', newHours)
  }

  if (!isOpen || !mounted) return null

  const steps = [
    { number: 1, label: 'Studio Basics' },
    { number: 2, label: 'Location & Hours' },
    { number: 3, label: 'Photos & Media' },
    { number: 4, label: 'Spaces' },
  ]

  const progressPercentage = (currentStep / 4) * 100

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8">
      <div className="bg-gray-50 rounded-3xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Studio</h2>
            <p className="text-sm text-gray-500">Step {currentStep} of 4</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between relative">
            {/* Progress Line Background */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10" />
            {/* Active Progress Line */}
            <div
              className="absolute top-5 left-0 h-1 bg-indigo-600 -z-10 transition-all duration-500"
              style={{ width: `${progressPercentage - 12.5}%` }}
            />

            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors',
                    currentStep >= step.number
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium',
                    currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Step 1: Studio Basics */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Studio Basics</h3>
              <p className="text-gray-500 mb-8">Provide the essential details about your studio.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">Studio Name</label>
                  <Input
                    placeholder="e.g. Moonlight Creative Studio"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="h-14 rounded-full px-6"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">Studio Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    className="h-14 rounded-full px-6 border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a category</option>
                    <option value="yoga">Yoga</option>
                    <option value="photo">Photo</option>
                    <option value="meeting">Meeting</option>
                    <option value="music">Music</option>
                    <option value="podcast">Podcast</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-900">Primary Contact Person</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Full name of the contact person"
                      value={formData.contactPerson}
                      onChange={(e) => updateFormData('contactPerson', e.target.value)}
                      className="h-14 rounded-full pl-14 pr-6"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-900">Studio Description</label>
                  <textarea
                    placeholder="Tell potential clients about what makes your studio unique..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="min-h-[160px] rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 px-2">Maximum 500 characters.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Hours */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Location */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  Where is your studio located?
                </h3>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Street Address</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search for your address..."
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        className="h-14 rounded-full pl-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">City</label>
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        className="h-14 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">Postal Code</label>
                      <Input
                        placeholder="Code"
                        value={formData.postalCode}
                        onChange={(e) => updateFormData('postalCode', e.target.value)}
                        className="h-14 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-6 h-48 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Map preview will appear here</p>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    Operating Hours
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {formData.operatingHours.map((day, index) => (
                    <div
                      key={day.day}
                      className={cn(
                        'flex items-center gap-4 py-2',
                        !day.enabled && 'opacity-50'
                      )}
                    >
                      <span className="w-24 font-semibold text-sm">{day.day}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={day.enabled}
                          onChange={() => toggleDayEnabled(index)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                      </label>
                      <div className="flex-1 flex gap-2 items-center">
                        <input
                          type="time"
                          value={day.open}
                          disabled={!day.enabled}
                          onChange={(e) => {
                            const newHours = [...formData.operatingHours]
                            newHours[index].open = e.target.value
                            updateFormData('operatingHours', newHours)
                          }}
                          className="w-full p-2 text-sm bg-gray-50 border-none rounded-lg focus:ring-1 focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <span className="text-xs text-gray-400">to</span>
                        <input
                          type="time"
                          value={day.close}
                          disabled={!day.enabled}
                          onChange={(e) => {
                            const newHours = [...formData.operatingHours]
                            newHours[index].close = e.target.value
                            updateFormData('operatingHours', newHours)
                          }}
                          className="w-full p-2 text-sm bg-gray-50 border-none rounded-lg focus:ring-1 focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos & Media */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Cover Photo */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cover Photo</h3>
                <p className="text-sm text-gray-500 mb-6">This image appears at the top of your listing (Min 1920x1080).</p>

                <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-indigo-400 transition-colors">
                  <div className="bg-white p-4 rounded-full shadow-sm text-indigo-600">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">Drag and drop or browse</p>
                    <p className="text-sm text-gray-500">JPG, PNG or WEBP up to 10MB</p>
                  </div>
                  <Button className="rounded-full px-6">Select Image</Button>
                </div>
              </div>

              {/* Additional Photos */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Additional Photos</h3>
                <p className="text-sm text-gray-500 mb-6">Add up to 10 more images of your space and equipment.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 transition-colors">
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">Add Photo</span>
                  </div>
                  {/* Sample thumbnails */}
                  <div
                    className="aspect-square rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400)' }}
                  />
                  <div
                    className="aspect-square rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400)' }}
                  />
                  <div
                    className="aspect-square rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400)' }}
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Online Presence</h3>
                <p className="text-sm text-gray-500 mb-6">Link your social media to build trust with potential clients.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">Instagram Handle</label>
                    <div className="relative">
                      <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="yourstudio"
                        value={formData.instagram}
                        onChange={(e) => updateFormData('instagram', e.target.value)}
                        className="h-12 rounded-full pl-12"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="https://yourstudio.com"
                        value={formData.website}
                        onChange={(e) => updateFormData('website', e.target.value)}
                        className="h-12 rounded-full pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Spaces & Review */}
          {currentStep === 4 && (
            <div className="space-y-8">
              {/* First Space */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">First Space Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-900">Space Name</label>
                    <Input
                      placeholder="e.g. Main Hall, Studio A, Rehearsal Room 1"
                      value={formData.spaceName}
                      onChange={(e) => updateFormData('spaceName', e.target.value)}
                      className="h-14 rounded-full px-6"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">Guest Capacity</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.capacity}
                      onChange={(e) => updateFormData('capacity', e.target.value)}
                      className="h-14 rounded-full px-6"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">Price per Hour ($)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={formData.pricePerHour}
                      onChange={(e) => updateFormData('pricePerHour', e.target.value)}
                      className="h-14 rounded-full px-6"
                    />
                  </div>
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Review Studio Details</h3>
                  <button className="text-indigo-600 font-bold text-sm hover:underline">Edit All</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Studio Name</p>
                      <p className="text-xl font-bold text-gray-900">{formData.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Location</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-indigo-600 mt-0.5" />
                        <p className="text-gray-600">{formData.address || formData.city || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Camera className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Photos and media will be displayed on your listing.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-white border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full px-6"
          >
            <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
            Back
          </Button>

          <Button onClick={handleNext} className="rounded-full px-8 h-12 shadow-lg shadow-indigo-200">
            {currentStep === 4 ? 'Publish Studio' : 'Next Step'}
            {currentStep < 4 && <ChevronRight className="h-4 w-4 ml-2" />}
            {currentStep === 4 && <Check className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function StudiosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [statusFilter, setStatusFilter] = useState('Active')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredStudios = mockStudios.filter((studio) => {
    const matchesSearch = studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || studio.status === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">Studios</h1>
          <p className="text-gray-500 text-lg">Manage your physical locations and spaces</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-full h-11 px-6 gap-2"
          >
            <Map className="h-4 w-4" />
            Map View
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-full h-11 px-6 gap-2 shadow-lg shadow-indigo-200"
          >
            <Plus className="h-4 w-4" />
            Add Studio
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search studios by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full pl-12 bg-gray-50 border-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <button className="flex h-10 items-center gap-2 rounded-full bg-gray-50 px-4 hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 text-sm font-medium">City: {cityFilter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            <button className="flex h-10 items-center gap-2 rounded-full bg-gray-50 px-4 hover:bg-gray-100 transition-colors">
              <span className="text-gray-700 text-sm font-medium">Studio Type: {typeFilter}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            <button className="flex h-10 items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-4">
              <span className="text-indigo-600 text-sm font-semibold">Status: {statusFilter}</span>
              <ChevronDown className="h-4 w-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Studios Grid */}
      {filteredStudios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No studios found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Load More */}
      {filteredStudios.length > 0 && (
        <div className="flex justify-center py-6">
          <Button
            variant="outline"
            className="rounded-full h-12 px-8 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Load More Studios
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Add Studio Modal */}
      <AddStudioModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
