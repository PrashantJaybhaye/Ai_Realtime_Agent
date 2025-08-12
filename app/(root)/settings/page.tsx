import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download
} from 'lucide-react'
import { useState } from 'react'

const SettingsPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Shield className="w-4 h-4" />
                Privacy & Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Palette className="w-4 h-4" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Globe className="w-4 h-4" />
                Language & Region
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive updates about your interviews</p>
                </div>
                <input type="checkbox" className="rounded border-border" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Interview Reminders</h4>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming practice sessions</p>
                </div>
                <input type="checkbox" className="rounded border-border" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Performance Reports</h4>
                  <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                </div>
                <input type="checkbox" className="rounded border-border" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <select className="px-3 py-2 bg-background border border-input rounded-md text-sm">
                    <option>Private</option>
                    <option>Public</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Analytics</h4>
                    <p className="text-sm text-muted-foreground">Help improve Sidvia with usage data</p>
                  </div>
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-foreground">Change Password</h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input id="current-password" type="password" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                        <EyeOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input id="new-password" type="password" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                        <EyeOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input id="confirm-password" type="password" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                        <EyeOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-muted-foreground">Download all your interview data and feedback</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <h4 className="font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage