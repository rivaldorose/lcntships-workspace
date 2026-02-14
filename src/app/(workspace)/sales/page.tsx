'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Plus,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Building2,
  Target,
  Trophy,
  TrendingUp,
  Zap,
  BarChart3,
  ChevronRight,
  Grid3X3,
  List,
  Map,
  Loader2,
  Inbox,
  X,
  Upload,
  FileSpreadsheet,
  Check,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { salesLeadsApi, type SalesLead } from '@/lib/supabase'

const sourceColorMap: Record<string, string> = {
  'Apollo': 'bg-purple-100 text-purple-700',
  'Referral': 'bg-blue-100 text-blue-700',
  'Cold Email': 'bg-gray-100 text-gray-700',
  'LinkedIn': 'bg-blue-100 text-blue-700',
  'Website': 'bg-emerald-100 text-emerald-700',
  'CSV Import': 'bg-orange-100 text-orange-700',
  'Manual': 'bg-slate-100 text-slate-700',
}

const getSourceColor = (source?: string) => {
  if (!source) return 'bg-gray-100 text-gray-700'
  return sourceColorMap[source] || 'bg-gray-100 text-gray-700'
}

const pipelineColumns = [
  { id: 'cold', label: 'Cold', color: 'bg-slate-400', dotColor: 'bg-slate-400' },
  { id: 'warm', label: 'Warm', color: 'bg-amber-400', dotColor: 'bg-amber-400' },
  { id: 'hot', label: 'Hot', color: 'bg-orange-500', dotColor: 'bg-orange-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-indigo-500', dotColor: 'bg-indigo-500' },
  { id: 'closed', label: 'Closed', color: 'bg-emerald-500', dotColor: 'bg-emerald-500' },
]

const milestones = [
  { value: 0, label: 'Start' },
  { value: 250, label: '250' },
  { value: 500, label: '500' },
  { value: 750, label: '750' },
  { value: 1000, label: '1000' },
]

interface LeadCardProps {
  lead: SalesLead
}

function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <Badge className={cn('text-xs font-medium', getSourceColor(lead.source))}>
          {lead.source || 'Unknown'}
        </Badge>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <h4 className="font-semibold text-gray-900 mb-1">{lead.company_name}</h4>

      {lead.city && (
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{lead.city}</span>
        </div>
      )}

      {lead.contact_name && (
        <div className="text-sm text-gray-500 mb-3">{lead.contact_name}</div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        {lead.email && (
          <span className="text-xs text-gray-400 truncate">{lead.email}</span>
        )}
        {lead.phone && (
          <span className="text-xs text-gray-400">{lead.phone}</span>
        )}
      </div>

      <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {lead.phone && (
          <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <Phone className="h-3.5 w-3.5 mx-auto text-gray-500" />
          </button>
        )}
        {lead.email && (
          <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <Mail className="h-3.5 w-3.5 mx-auto text-gray-500" />
          </button>
        )}
        <button className="flex-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <Building2 className="h-3.5 w-3.5 mx-auto text-gray-500" />
        </button>
      </div>
    </div>
  )
}

// Add Lead Modal Component
interface AddLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

function AddLeadModal({ isOpen, onClose, onSuccess }: AddLeadModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<{
    company_name: string
    contact_name: string
    email: string
    phone: string
    city: string
    address: string
    website: string
    source: string
    status: 'cold' | 'warm' | 'hot' | 'negotiation' | 'closed' | 'lost'
    notes: string
  }>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    website: '',
    source: 'Manual',
    status: 'cold',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company_name.trim()) return

    setLoading(true)
    try {
      await salesLeadsApi.create(formData)
      onSuccess()
      onClose()
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        website: '',
        source: 'Manual',
        status: 'cold',
        notes: '',
      })
    } catch (error) {
      console.error('Error creating lead:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Nieuwe Lead Toevoegen</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrijfsnaam *
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Bijv. Studio Amsterdam"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contactpersoon
              </label>
              <input
                type="text"
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Jan Jansen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Amsterdam"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="info@studio.nl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefoon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+31 6 12345678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="https://www.studio.nl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bron
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Manual">Handmatig</option>
                <option value="Apollo">Apollo</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Website">Website</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'cold' | 'warm' | 'hot' | 'negotiation' | 'closed' })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="cold">Cold</option>
                <option value="warm">Warm</option>
                <option value="hot">Hot</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notities
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Extra informatie over deze lead..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.company_name.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Opslaan...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Lead Toevoegen
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// CSV Upload Modal Component
interface CSVUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

function CSVUploadModal({ isOpen, onClose, onSuccess }: CSVUploadModalProps) {
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<Partial<SalesLead>[]>([])
  const [error, setError] = useState<string | null>(null)
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse CSV line respecting quoted values with commas inside
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())

    return result
  }

  const parseCSV = (text: string): Partial<SalesLead>[] => {
    const lines = text.split('\n').filter(line => line.trim())
    if (lines.length < 2) return []

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/['"]/g, ''))
    const leads: Partial<SalesLead>[] = []

    // Map common header variations including Apollo export format
    const headerMap: Record<string, keyof SalesLead> = {
      // Standard formats
      'company_name': 'company_name',
      'company': 'company_name',
      'bedrijf': 'company_name',
      'bedrijfsnaam': 'company_name',
      // Apollo format
      'company name': 'company_name',
      'company name for emails': 'company_name',
      // Contact name
      'contact_name': 'contact_name',
      'contact': 'contact_name',
      'contactpersoon': 'contact_name',
      // Email
      'email': 'email',
      'e-mail': 'email',
      'mail': 'email',
      // Phone - Apollo uses multiple phone fields
      'phone': 'phone',
      'telefoon': 'phone',
      'tel': 'phone',
      'work direct phone': 'phone',
      'mobile phone': 'phone',
      'corporate phone': 'phone',
      // City
      'city': 'city',
      'stad': 'city',
      'plaats': 'city',
      'company city': 'city',
      // Address
      'address': 'address',
      'adres': 'address',
      'company address': 'address',
      // Website
      'website': 'website',
      'url': 'website',
      'site': 'website',
      // Notes/Industry
      'notes': 'notes',
      'notities': 'notes',
      'opmerkingen': 'notes',
      'industry': 'notes',
    }

    // For Apollo: we need to combine First Name + Last Name for contact
    const firstNameIndex = headers.indexOf('first name')
    const lastNameIndex = headers.indexOf('last name')

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length < 2) continue

      const lead: Partial<SalesLead> = {
        source: 'Apollo',
        status: 'cold',
      }

      // Handle Apollo First Name + Last Name
      if (firstNameIndex !== -1 && lastNameIndex !== -1) {
        const firstName = values[firstNameIndex]?.trim() || ''
        const lastName = values[lastNameIndex]?.trim() || ''
        if (firstName || lastName) {
          lead.contact_name = `${firstName} ${lastName}`.trim()
        }
      }

      headers.forEach((header, index) => {
        const mappedKey = headerMap[header]
        if (mappedKey && values[index]) {
          const value = values[index].trim()
          // Don't overwrite if already set (e.g., contact_name from first+last)
          if (mappedKey === 'contact_name' && lead.contact_name) return
          // For phone, prefer non-empty values
          if (mappedKey === 'phone' && lead.phone) return
          if (value) {
            (lead as Record<string, string>)[mappedKey] = value
          }
        }
      })

      if (lead.company_name) {
        leads.push(lead)
      }
    }

    return leads
  }

  const handleFile = (selectedFile: File) => {
    setError(null)
    setImportResult(null)

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Alleen CSV bestanden zijn toegestaan')
      return
    }

    setFile(selectedFile)

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const parsed = parseCSV(text)
      if (parsed.length === 0) {
        setError('Geen geldige leads gevonden in het bestand. Zorg dat er een "company_name" of "bedrijf" kolom is.')
      } else {
        setPreview(parsed)
      }
    }
    reader.readAsText(selectedFile)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleImport = async () => {
    if (preview.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const results = await salesLeadsApi.createMany(preview)
      setImportResult({ success: results.length, failed: preview.length - results.length })
      onSuccess()

      // Clear after success
      setTimeout(() => {
        onClose()
        setFile(null)
        setPreview([])
        setImportResult(null)
      }, 2000)
    } catch (error) {
      console.error('Error importing leads:', error)
      setError('Er ging iets mis bij het importeren. Probeer het opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setPreview([])
    setError(null)
    setImportResult(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-50">
              <FileSpreadsheet className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">CSV Importeren</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {importResult ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Voltooid!</h3>
              <p className="text-gray-500">
                {importResult.success} leads succesvol geïmporteerd
                {importResult.failed > 0 && `, ${importResult.failed} mislukt`}
              </p>
            </div>
          ) : !file ? (
            <>
              <div
                className={cn(
                  'border-2 border-dashed rounded-2xl p-8 text-center transition-colors',
                  dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                )}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Sleep je CSV bestand hierheen of{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    blader
                  </button>
                </p>
                <p className="text-sm text-gray-400">
                  CSV met kolommen: bedrijf, contact, email, telefoon, stad, etc.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Ondersteunde kolommen:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>• company_name / bedrijf / bedrijfsnaam</div>
                  <div>• contact_name / contact / contactpersoon</div>
                  <div>• email / e-mail / mail</div>
                  <div>• phone / telefoon / tel</div>
                  <div>• city / stad / plaats</div>
                  <div>• website / url / site</div>
                  <div>• address / adres</div>
                  <div>• notes / notities / opmerkingen</div>
                </div>
              </div>
            </>
          ) : (
            <>
              {error ? (
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl text-red-700 mb-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{file.name}</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {preview.length} leads gevonden
                    </Badge>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                    <div className="max-h-64 overflow-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="text-left p-3 font-medium text-gray-600">Bedrijf</th>
                            <th className="text-left p-3 font-medium text-gray-600">Contact</th>
                            <th className="text-left p-3 font-medium text-gray-600">Email</th>
                            <th className="text-left p-3 font-medium text-gray-600">Stad</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {preview.slice(0, 10).map((lead, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">{lead.company_name}</td>
                              <td className="p-3 text-gray-600">{lead.contact_name || '-'}</td>
                              <td className="p-3 text-gray-600">{lead.email || '-'}</td>
                              <td className="p-3 text-gray-600">{lead.city || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {preview.length > 10 && (
                      <div className="p-3 bg-gray-50 text-center text-sm text-gray-500">
                        ... en {preview.length - 10} meer
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => { setFile(null); setPreview([]); setError(null) }}
                  className="flex-1"
                >
                  Ander bestand
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={loading || preview.length === 0}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importeren...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {preview.length} Leads Importeren
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SalesPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'pipeline' | 'list' | 'map'>('pipeline')
  const [leads, setLeads] = useState<SalesLead[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCSVModal, setShowCSVModal] = useState(false)

  const loadLeads = async () => {
    try {
      const data = await salesLeadsApi.getAll()
      setLeads(data || [])
    } catch (error) {
      console.error('Error loading leads:', error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  // Calculate stats from real data
  const coldLeads = leads.filter(l => l.status === 'cold')
  const warmLeads = leads.filter(l => l.status === 'warm')
  const hotLeads = leads.filter(l => l.status === 'hot')
  const negotiationLeads = leads.filter(l => l.status === 'negotiation')
  const closedLeads = leads.filter(l => l.status === 'closed')

  const activeLeadsCount = coldLeads.length + warmLeads.length + hotLeads.length + negotiationLeads.length
  const totalLeads = leads.length
  const conversionRate = totalLeads > 0 ? Math.round((closedLeads.length / totalLeads) * 100) : 0

  const currentStudios = closedLeads.length
  const goalStudios = 1000
  const progressPercent = (currentStudios / goalStudios) * 100

  const getLeadsByStatus = (status: string) => {
    return leads.filter(l => l.status === status)
  }

  // Calculate source distribution
  const sourceDistribution = leads.reduce((acc, lead) => {
    const source = lead.source || 'Unknown'
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedSources = Object.entries(sourceDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="p-4 rounded-full bg-gray-100 mb-4">
            <Inbox className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nog geen leads</h2>
          <p className="text-gray-500 mb-6">Voeg je eerste sales lead toe of importeer een CSV bestand</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowCSVModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              CSV Importeren
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Lead Toevoegen
            </Button>
          </div>
        </div>

        <AddLeadModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={loadLeads}
        />
        <CSVUploadModal
          isOpen={showCSVModal}
          onClose={() => setShowCSVModal(false)}
          onSuccess={loadLeads}
        />
      </>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section - Road to 1000 */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-indigo-200" />
                <span className="text-indigo-200 text-sm font-medium">Company Goal</span>
              </div>
              <h1 className="text-3xl font-bold">Road to 1,000 Studios</h1>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{currentStudios}</div>
              <div className="text-indigo-200">of {goalStudios.toLocaleString()} studios</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Milestones */}
            <div className="flex justify-between mt-2">
              {milestones.map((milestone) => (
                <div key={milestone.value} className="flex flex-col items-center">
                  <div className={cn(
                    'w-3 h-3 rounded-full border-2 -mt-5 mb-1',
                    currentStudios >= milestone.value
                      ? 'bg-emerald-400 border-emerald-300'
                      : 'bg-white/20 border-white/40'
                  )} />
                  <span className="text-xs text-indigo-200">{milestone.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeLeadsCount}</div>
              <div className="text-indigo-200 text-sm">Active Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{closedLeads.length}</div>
              <div className="text-indigo-200 text-sm">Closed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <div className="text-indigo-200 text-sm">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalLeads}</div>
              <div className="text-indigo-200 text-sm">Total Leads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={activeFilter === 'cold' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'cold' ? null : 'cold')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-slate-400 mr-2" />
            Cold Leads
            <Badge variant="secondary" className="ml-2">{coldLeads.length}</Badge>
          </Button>
          <Button
            variant={activeFilter === 'warm' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'warm' ? null : 'warm')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
            Warm Leads
            <Badge variant="secondary" className="ml-2">{warmLeads.length}</Badge>
          </Button>
          <Button
            variant={activeFilter === 'hot' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(activeFilter === 'hot' ? null : 'hot')}
            className="rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
            Hot Leads
            <Badge variant="secondary" className="ml-2">{hotLeads.length}</Badge>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('pipeline')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'pipeline' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={cn(
                'p-2 rounded-md transition-colors',
                activeView === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              )}
            >
              <Map className="h-4 w-4" />
            </button>
          </div>

          <Button variant="outline" onClick={() => setShowCSVModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            CSV Import
          </Button>

          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {pipelineColumns.map((column) => {
          const columnLeads = getLeadsByStatus(column.id)
          const showColumn = !activeFilter || activeFilter === column.id

          if (!showColumn) return null

          return (
            <div key={column.id} className="bg-gray-50/50 rounded-2xl p-4">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2.5 h-2.5 rounded-full', column.dotColor)} />
                  <span className="font-semibold text-gray-900">{column.label}</span>
                  <Badge variant="secondary" className="text-xs">{columnLeads.length}</Badge>
                </div>
                <span className="text-sm text-gray-500">{columnLeads.length} leads</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {columnLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}

                {/* Add Card Button */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full p-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add lead</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Outreach Tools */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-50">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Outreach Tools</h3>
              <p className="text-sm text-gray-500">Quick actions</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">Send Bulk Emails</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">LinkedIn Campaign</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <span className="text-sm font-medium">Schedule Calls</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-50">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Sources</h3>
              <p className="text-sm text-gray-500">Lead origins</p>
            </div>
          </div>
          <div className="space-y-3">
            {sortedSources.map(([source, count]) => {
              const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0
              return (
                <div key={source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{source}</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Funnel Health */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Funnel Health</h3>
              <p className="text-sm text-gray-500">Conversion rates</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Cold → Warm</span>
              <span className="text-sm font-semibold text-emerald-600">
                {coldLeads.length > 0 ? Math.round((warmLeads.length / (coldLeads.length + warmLeads.length)) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Warm → Hot</span>
              <span className="text-sm font-semibold text-emerald-600">
                {warmLeads.length > 0 ? Math.round((hotLeads.length / (warmLeads.length + hotLeads.length)) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Hot → Closed</span>
              <span className="text-sm font-semibold text-emerald-600">
                {hotLeads.length > 0 ? Math.round((closedLeads.length / (hotLeads.length + closedLeads.length)) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Overall</span>
              <span className="text-sm font-semibold text-emerald-600">{conversionRate}%</span>
            </div>
          </div>
        </div>

        {/* Top Closers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-50">
              <Trophy className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Closers</h3>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                S
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Sarah Chen</div>
                <div className="text-xs text-gray-500">12 studios</div>
              </div>
              <Badge className="bg-amber-100 text-amber-700">1st</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium">
                M
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Mike Johnson</div>
                <div className="text-xs text-gray-500">9 studios</div>
              </div>
              <Badge className="bg-gray-100 text-gray-700">2nd</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Alex Rivera</div>
                <div className="text-xs text-gray-500">7 studios</div>
              </div>
              <Badge className="bg-orange-100 text-orange-700">3rd</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadLeads}
      />
      <CSVUploadModal
        isOpen={showCSVModal}
        onClose={() => setShowCSVModal(false)}
        onSuccess={loadLeads}
      />
    </div>
  )
}
