'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  DollarSign,
  Edit,
  TrendingUp,
  FileText,
  Download,
  ChevronRight,
  Shield,
  Gavel,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mock data
const mockPartner = {
  id: '1',
  company_name: 'Studio Zenith',
  legal_name: 'Zenith Wellness LLC',
  contact_name: 'Sarah Chen',
  email: 'contact@zenith.com',
  phone: '+1 234 567 890',
  address: '123 Wellness Way, New York, NY 10001',
  vat_number: 'EU12345678',
  tax_id: 'TX-99887766',
  status: 'active',
  partner_id: '#88291',
  joined_date: 'Jan 2023',
  current_balance: 1200,
  total_payouts_ytd: 12450,
  balance_change: 12,
  image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200',
}

const documents = [
  {
    id: '1',
    name: 'Service_Agreement_2024.pdf',
    modified: '2 days ago',
    size: '2.4 MB',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    id: '2',
    name: 'Insurance_Cert_Exp2024.pdf',
    modified: '1 month ago',
    size: '1.1 MB',
    icon: Shield,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: '3',
    name: 'Tax_Compliance_Form.pdf',
    modified: '3 months ago',
    size: '800 KB',
    icon: Gavel,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

const weeklyPerformance = [40, 55, 45, 70, 60, 85, 95]

export default function PartnerDetailPage() {
  const partner = mockPartner

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumbs & Header Actions */}
      <div className="flex justify-between items-end">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/partners"
              className="text-gray-400 text-sm font-medium hover:text-indigo-600 transition-colors"
            >
              Partners
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-gray-900 text-sm font-medium">{partner.company_name} Profile</span>
          </div>

          {/* Header with Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center overflow-hidden shadow-sm">
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.company_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 text-indigo-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {partner.company_name}
                </h1>
                <Badge className="bg-emerald-100 text-emerald-700 uppercase text-xs tracking-wider">
                  Active
                </Badge>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Partner ID: {partner.partner_id} • Joined {partner.joined_date}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="rounded-xl h-11 px-5">
            <Mail className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" className="rounded-xl h-11 px-5">
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Overview Card */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Partner Overview</h2>
          </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-12">
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Email Address</p>
              <p className="text-gray-900 font-medium">{partner.email}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Phone Number</p>
              <p className="text-gray-900 font-medium">{partner.phone}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Physical Address</p>
              <p className="text-gray-900 font-medium">{partner.address}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Legal Entity Name</p>
              <p className="text-gray-900 font-medium">{partner.legal_name}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">VAT Number</p>
              <p className="text-gray-900 font-medium">{partner.vat_number}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Tax Identification</p>
              <p className="text-gray-900 font-medium">{partner.tax_id}</p>
            </div>
          </div>
        </div>

        {/* Financials Card */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Financials</h2>
          <div className="space-y-6">
            <div className="p-5 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-sm font-medium mb-1">Current Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-indigo-600">
                  ${partner.current_balance.toLocaleString()}.00
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  {partner.balance_change}%
                </span>
              </div>
            </div>
            <div className="p-5 border border-gray-100 rounded-2xl">
              <p className="text-gray-500 text-sm font-medium mb-1">Total Payouts (YTD)</p>
              <span className="text-2xl font-bold text-gray-900">
                ${partner.total_payouts_ytd.toLocaleString()}.00
              </span>
            </div>
            <a
              href="#"
              className="flex items-center justify-between text-indigo-600 text-sm font-bold hover:underline px-2"
            >
              <span>View Payout History</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Studio Performance Card */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Studio Performance</h2>
              <p className="text-gray-500 text-sm">Monthly Booking Trends</p>
            </div>
            <select className="bg-gray-50 border-none rounded-lg text-xs font-bold pr-10 focus:ring-indigo-500">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          {/* Chart Visualization */}
          <div className="relative h-48 w-full mt-4">
            <div className="absolute inset-0 flex items-end gap-2 px-2">
              {weeklyPerformance.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex-1 rounded-t-lg transition-all',
                    index === weeklyPerformance.length - 1
                      ? 'bg-indigo-600'
                      : index >= weeklyPerformance.length - 3
                      ? 'bg-indigo-400'
                      : 'bg-indigo-200'
                  )}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 border-b border-l border-gray-100" />
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Documents Card */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Documents</h2>
            <button className="text-indigo-600 text-xs font-bold hover:underline">
              Upload New
            </button>
          </div>
          <div className="space-y-4">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', doc.iconBg)}>
                      <Icon className={cn('h-5 w-5', doc.iconColor)} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                      <p className="text-[11px] text-gray-400">
                        Modified {doc.modified} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
