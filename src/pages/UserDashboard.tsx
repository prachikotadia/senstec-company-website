
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Download, BookOpen, FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, blogPosts, caseStudies } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const recentPosts = blogPosts.filter(post => post.published).slice(0, 3);
  const availableStudies = caseStudies.slice(0, 3);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="glass-morphism border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-2xl font-sf-pro font-bold text-foreground">
              Welcome, {user.name}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              {user.role}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Articles Read
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12</div>
            </CardContent>
          </Card>

          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>

          <Card className="glass-morphism">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">3</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Latest Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">By {post.author}</span>
                    <Button size="sm" variant="outline">Read More</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Case Studies */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableStudies.map((study) => (
                <div key={study.id} className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <h3 className="font-semibold text-foreground mb-2">{study.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{study.client}</p>
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                      {study.industry}
                    </span>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {study.pdfUrl && (
                        <Button size="sm" className="gradient-purple">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Available Resources */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>Available Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Infrastructure Monitoring Guide', type: 'PDF', size: '2.3 MB' },
                { title: 'API Documentation', type: 'Web', size: 'Online' },
                { title: 'Sensor Installation Manual', type: 'PDF', size: '1.8 MB' }
              ].map((resource, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg text-center">
                  <FileText className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.type} - {resource.size}</p>
                  <Button size="sm" className="gradient-purple">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
