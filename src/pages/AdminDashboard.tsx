
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomCursor from '@/components/CustomCursor';
import BlogManager from '@/components/admin/BlogManager';
import CaseStudyManager from '@/components/admin/CaseStudyManager';
import ContactManager from '@/components/admin/ContactManager';
import MediaManager from '@/components/admin/MediaManager';
import ThemeToggle from '@/components/ThemeToggle';

const AdminDashboard = () => {
  const { user, contactMessages, blogPosts, caseStudies } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const stats = [
    { title: 'Total Messages', value: contactMessages.length, color: 'text-blue-600' },
    { title: 'Blog Posts', value: blogPosts.length, color: 'text-green-600' },
    { title: 'Case Studies', value: caseStudies.length, color: 'text-purple-600' },
    { title: 'New Messages', value: contactMessages.filter(m => m.status === 'new').length, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      
      {/* Header */}
      <div className="glass-morphism border-b border-border p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="spotlight-effect w-fit">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl lg:text-2xl font-sf-pro font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
            <span className="text-foreground font-medium hidden sm:block">{user.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 spotlight-effect">
            <TabsTrigger value="overview" className="spotlight-effect text-xs lg:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="content" className="spotlight-effect text-xs lg:text-sm">Content</TabsTrigger>
            <TabsTrigger value="messages" className="spotlight-effect text-xs lg:text-sm">Messages</TabsTrigger>
            <TabsTrigger value="media" className="spotlight-effect text-xs lg:text-sm">Media</TabsTrigger>
            <TabsTrigger value="settings" className="spotlight-effect text-xs lg:text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-morphism hover-float spotlight-effect">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-morphism spotlight-effect">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contactMessages.slice(0, 5).map((message) => (
                      <div key={message.id} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg hover-float spotlight-effect">
                        <div>
                          <p className="font-medium text-foreground">{message.name}</p>
                          <p className="text-sm text-muted-foreground">{message.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          message.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism spotlight-effect">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gradient-purple hover-float spotlight-effect" onClick={() => setActiveTab('content')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Blog Post
                  </Button>
                  <Button className="w-full justify-start hover-float spotlight-effect" variant="outline" onClick={() => setActiveTab('content')}>
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Case Studies
                  </Button>
                  <Button className="w-full justify-start hover-float spotlight-effect" variant="outline" onClick={() => setActiveTab('messages')}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Tabs defaultValue="blog" className="space-y-4">
              <TabsList className="spotlight-effect">
                <TabsTrigger value="blog" className="spotlight-effect">Blog Posts</TabsTrigger>
                <TabsTrigger value="cases" className="spotlight-effect">Case Studies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blog">
                <BlogManager />
              </TabsContent>
              
              <TabsContent value="cases">
                <CaseStudyManager />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="messages">
            <ContactManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass-morphism spotlight-effect">
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Title</label>
                      <input className="w-full p-2 border border-input bg-background rounded-md spotlight-effect" defaultValue="Senstec Ltd" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Email</label>
                      <input className="w-full p-2 border border-input bg-background rounded-md spotlight-effect" defaultValue="contact@senstec.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input className="w-full p-2 border border-input bg-background rounded-md spotlight-effect" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">SEO Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Meta Description</label>
                      <textarea className="w-full p-2 border border-input bg-background rounded-md spotlight-effect" rows={3} defaultValue="AI-powered infrastructure monitoring solutions for bridges, dams, and marine structures." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Keywords</label>
                      <input className="w-full p-2 border border-input bg-background rounded-md spotlight-effect" defaultValue="infrastructure monitoring, AI sensors, predictive maintenance" />
                    </div>
                  </div>
                </div>
                
                <Button className="gradient-purple hover-float spotlight-effect">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
