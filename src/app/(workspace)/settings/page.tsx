'use client'

import { useState } from 'react'
import {
  Briefcase,
  User,
  Users,
  Bell,
  CreditCard,
  Puzzle,
  Settings,
  Palette,
  Plus,
  MoreHorizontal,
  Check,
  ArrowRight,
  Mail,
  Smartphone,
  Image,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Navigation items
const navItems = [
  { id: 'business-profile', label: 'Business Profile', icon: Briefcase },
  { id: 'my-account', label: 'My Account', icon: User },
  { id: 'team-members', label: 'Team Members', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'payments', label: 'Payments & Payouts', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'platform-settings', label: 'Platform Settings', icon: Settings },
  { id: 'branding', label: 'Branding', icon: Palette },
]

// Mock data
const teamMembers = [
  { id: '1', name: 'Rivaldo Rose', email: 'rivaldo@lcntships.nl', role: 'Admin', initials: 'RR', color: 'bg-indigo-100 text-indigo-600' },
  { id: '2', name: 'Anna de Vries', email: 'anna@lcntships.nl', role: 'Manager', initials: 'AV', color: 'bg-pink-100 text-pink-600' },
  { id: '3', name: 'Mark Jansen', email: 'mark@lcntships.nl', role: 'Support', initials: 'MJ', color: 'bg-blue-100 text-blue-600' },
]

const integrations = [
  { id: '1', name: 'Google Calendar', description: 'Sync bookings directly to your calendar to avoid double bookings.', connected: true, logo: 'gcal' },
  { id: '2', name: 'Mailchimp', description: 'Automatically add new customers to your newsletter audiences.', connected: false, logo: 'mailchimp' },
  { id: '3', name: 'Zapier', description: 'Connect with 3,000+ apps to automate your workflows.', connected: true, logo: 'zapier' },
  { id: '4', name: 'Slack', description: 'Receive notifications and updates directly in your team channels.', connected: false, logo: 'slack' },
]

// Toggle Switch Component
function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors',
        checked ? 'bg-indigo-600' : 'bg-gray-200'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  )
}

// Small Toggle for notifications
function SmallToggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-9 h-5 rounded-full transition-colors',
        checked ? 'bg-indigo-600' : 'bg-gray-200'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('business-profile')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState({
    newBooking: true,
    bookingCancelled: true,
    weeklySummary: false,
  })
  const [pushNotifications, setPushNotifications] = useState({
    realTimeBookings: true,
    urgentIssues: true,
    marketingUpdates: false,
  })

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 bg-gray-50 py-6 pl-6 pr-4 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-6 px-2">
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Manage workspace</p>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
                  isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className={cn('text-sm', isActive ? 'font-semibold' : 'font-medium')}>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="max-w-[900px] mx-auto flex flex-col gap-10">
          {/* Business Profile Section */}
          <section id="business-profile" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Business Profile</h2>
              <p className="text-gray-500 text-sm">Manage your company details and public profile information.</p>
            </div>
            <div className="flex flex-col gap-6">
              {/* Company Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-100 pb-2">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Legal Name</label>
                    <Input className="h-12 rounded-xl bg-gray-50" defaultValue="lcntships BV" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">KVK Number</label>
                    <Input className="h-12 rounded-xl bg-gray-50" placeholder="12345678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">BTW Number</label>
                    <Input className="h-12 rounded-xl bg-gray-50" placeholder="NL85..." />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Address</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input className="md:col-span-3 h-12 rounded-xl bg-gray-50" placeholder="Street Address" />
                      <Input className="h-12 rounded-xl bg-gray-50" placeholder="City" />
                      <Input className="h-12 rounded-xl bg-gray-50" placeholder="Postal Code" />
                      <select className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Netherlands</option>
                        <option>Belgium</option>
                        <option>Germany</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-100 pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Business Email</label>
                    <Input className="h-12 rounded-xl bg-gray-50" type="email" placeholder="hello@lcntships.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Business Phone</label>
                    <Input className="h-12 rounded-xl bg-gray-50" type="tel" placeholder="+31 6 12345678" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Support Email</label>
                    <Input className="h-12 rounded-xl bg-gray-50" type="email" placeholder="support@lcntships.com" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button className="rounded-xl shadow-md shadow-indigo-200">
                    Save Changes
                    <Check className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* My Account Section */}
          <section id="my-account" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">My Account</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold cursor-pointer relative group overflow-hidden">
                    RR
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-xs font-medium">
                      Change
                    </div>
                  </div>
                  <button className="text-indigo-600 text-sm font-semibold hover:underline">Remove</button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Full Name</label>
                    <Input className="h-12 rounded-xl bg-gray-50" defaultValue="Rivaldo Rose" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Role</label>
                    <div className="h-12 rounded-xl border border-gray-200 bg-gray-100 px-4 flex items-center text-gray-500 text-sm cursor-not-allowed">
                      Admin
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Email Address</label>
                    <Input className="h-12 rounded-xl bg-gray-50" type="email" defaultValue="rivaldo@lcntships.nl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Security</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <Toggle checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Current Password</label>
                      <Input className="h-10 rounded-xl bg-gray-50" type="password" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">New Password</label>
                      <Input className="h-10 rounded-xl bg-gray-50" type="password" />
                    </div>
                    <Button variant="outline" className="h-10 rounded-xl">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Members Section */}
          <section id="team-members" className="scroll-mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <Button className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold', member.color)}>
                              {member.initials}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{member.role}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section id="notifications" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Email Column */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    <Mail className="h-4 w-4" /> Email
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">New booking received</span>
                      <SmallToggle
                        checked={emailNotifications.newBooking}
                        onChange={(checked) => setEmailNotifications({ ...emailNotifications, newBooking: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Booking cancelled</span>
                      <SmallToggle
                        checked={emailNotifications.bookingCancelled}
                        onChange={(checked) => setEmailNotifications({ ...emailNotifications, bookingCancelled: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Weekly summary</span>
                      <SmallToggle
                        checked={emailNotifications.weeklySummary}
                        onChange={(checked) => setEmailNotifications({ ...emailNotifications, weeklySummary: checked })}
                      />
                    </div>
                  </div>
                </div>
                {/* Push Column */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    <Smartphone className="h-4 w-4" /> Push
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Real-time bookings</span>
                      <SmallToggle
                        checked={pushNotifications.realTimeBookings}
                        onChange={(checked) => setPushNotifications({ ...pushNotifications, realTimeBookings: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Urgent issues</span>
                      <SmallToggle
                        checked={pushNotifications.urgentIssues}
                        onChange={(checked) => setPushNotifications({ ...pushNotifications, urgentIssues: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Marketing updates</span>
                      <SmallToggle
                        checked={pushNotifications.marketingUpdates}
                        onChange={(checked) => setPushNotifications({ ...pushNotifications, marketingUpdates: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payments Section */}
          <section id="payments" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Payments & Payouts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Platform Fee</span>
                    <span className="text-sm font-bold text-gray-900">10%</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Minimum Payout</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                      <Input className="h-10 rounded-xl bg-gray-50 pl-8" type="number" defaultValue="50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Frequency</label>
                    <select className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:ring-2 focus:ring-indigo-500">
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Processor</h3>
                  <p className="text-sm text-gray-500 mb-6">Manage your connection to Stripe for secure payments.</p>
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-100">
                    <Check className="h-5 w-5" />
                    <span className="text-sm font-bold">Stripe Connected</span>
                  </div>
                </div>
                <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline mt-4 inline-flex items-center gap-1">
                  Manage Stripe Account <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Bank Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Account Holder</label>
                    <Input className="h-12 rounded-xl bg-gray-50" placeholder="lcntships BV" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Bank Name</label>
                    <Input className="h-12 rounded-xl bg-gray-50" placeholder="ING Bank" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">IBAN</label>
                    <Input className="h-12 rounded-xl bg-gray-50 font-mono" placeholder="NL23 INGB 0000 •••• ••" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="rounded-xl">
                    Update Bank Details
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Integrations Section */}
          <section id="integrations" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs',
                      integration.logo === 'gcal' && 'bg-white border border-gray-100 shadow-sm',
                      integration.logo === 'mailchimp' && 'bg-yellow-400',
                      integration.logo === 'zapier' && 'bg-orange-500',
                      integration.logo === 'slack' && 'bg-white border border-gray-100 shadow-sm'
                    )}>
                      {integration.logo === 'gcal' && '📅'}
                      {integration.logo === 'mailchimp' && 'MC'}
                      {integration.logo === 'zapier' && 'Z'}
                      {integration.logo === 'slack' && '💬'}
                    </div>
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide',
                      integration.connected
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    )}>
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900">{integration.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 flex-1">{integration.description}</p>
                  <button className={cn(
                    'mt-4 w-full py-2 rounded-lg text-xs font-semibold transition-colors',
                    integration.connected
                      ? 'border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  )}>
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Platform Settings Section */}
          <section id="platform-settings" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Min Booking Duration</label>
                  <select className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm">
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Max Booking Duration</label>
                  <select className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm">
                    <option>12 hours</option>
                    <option>24 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Advance Notice</label>
                  <select className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm">
                    <option>24 hours</option>
                    <option>48 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Cancellation Window</label>
                  <select className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm">
                    <option>48 hours</option>
                    <option>72 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Branding Section */}
          <section id="branding" className="scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Branding</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Logo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                      <Image className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Upload new
                      </Button>
                      <p className="text-[10px] text-gray-500">Recommended size 400x400px</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Brand Colors</h3>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 border border-gray-200 shadow-sm cursor-pointer" />
                        <span className="text-xs text-gray-500 text-center">Primary</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-200 shadow-sm cursor-pointer" />
                        <span className="text-xs text-gray-500 text-center">Secondary</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">Platform Name</label>
                    <Input className="h-10 rounded-xl bg-gray-50" defaultValue="lcntships" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <div className="mt-8 border border-red-100 bg-red-50/50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-red-700">Danger Zone</h3>
                <p className="text-sm text-red-600/80 mt-1">This will permanently delete your workspace and all associated data.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Workspace
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
