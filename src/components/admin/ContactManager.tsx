
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, Calendar, Eye, Shield } from 'lucide-react';
import { sanitizeInput } from '@/utils/security';

const ContactManager = () => {
  const { contactMessages, setContactMessages } = useApp();

  const markAsRead = (id: string) => {
    setContactMessages(contactMessages.map(msg => 
      msg.id === id ? { ...msg, status: 'read' as const } : msg
    ));
  };

  const markAsReplied = (id: string) => {
    setContactMessages(contactMessages.map(msg => 
      msg.id === id ? { ...msg, status: 'replied' as const } : msg
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Sanitize message content for display
  const sanitizeMessage = (message: string) => {
    return sanitizeInput(message);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Contact Messages</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Input sanitization active</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {contactMessages.filter(m => m.status === 'new').length} new messages
          </div>
        </div>
      </div>

      {contactMessages.length === 0 ? (
        <Card className="glass-morphism">
          <CardContent className="p-12 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contactMessages.map((message) => (
            <Card key={message.id} className="glass-morphism">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{sanitizeInput(message.name)}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {sanitizeInput(message.email)}
                      </span>
                      {message.phone && (
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {sanitizeInput(message.phone)}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {sanitizeInput(message.type)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                  <p className="text-foreground whitespace-pre-wrap">{sanitizeMessage(message.message)}</p>
                </div>
                <div className="flex space-x-2">
                  {message.status === 'new' && (
                    <Button size="sm" variant="outline" onClick={() => markAsRead(message.id)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  {message.status !== 'replied' && (
                    <Button size="sm" className="gradient-purple" onClick={() => markAsReplied(message.id)}>
                      <Mail className="w-4 h-4 mr-2" />
                      Mark as Replied
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`mailto:${sanitizeInput(message.email)}`, '_blank')}
                  >
                    Reply via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactManager;
