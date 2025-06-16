
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const ChatWidget = () => {
  const { addContactMessage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m here to help. What can I assist you with today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const quickQuestions = [
    { text: 'What is predictive maintenance?', icon: '🔧' },
    { text: 'Request a demo', icon: '📱' },
    { text: 'Talk to support', icon: '💬' },
    { text: 'Pricing information', icon: '💰' },
    { text: 'Technical documentation', icon: '📚' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    // Simulate bot response based on input
    setTimeout(() => {
      let response = '';
      const input = inputValue.toLowerCase();
      
      if (input.includes('predictive maintenance')) {
        response = 'Predictive maintenance uses AI and machine learning to analyze sensor data and predict when equipment might fail. This allows for proactive repairs, reducing downtime and maintenance costs by up to 40%.';
      } else if (input.includes('demo') || input.includes('demonstration')) {
        response = 'I\'d be happy to arrange a demo! Our technical team can show you our monitoring solutions in action. Would you like me to connect you with our sales team?';
      } else if (input.includes('support') || input.includes('help')) {
        response = 'I can help you get in touch with our technical support team. They\'re available 24/7 for urgent infrastructure monitoring issues. Would you like me to create a support ticket?';
      } else if (input.includes('price') || input.includes('cost')) {
        response = 'Pricing depends on your specific requirements like number of sensors, data frequency, and analytics features. Our solutions start from $2,500. Would you like a custom quote?';
      } else if (input.includes('documentation') || input.includes('docs')) {
        response = 'Our technical documentation includes API references, SDK guides, and integration examples. You can access them in our Developers section or I can send you direct links.';
      } else {
        response = 'Thanks for your question! For detailed technical assistance, I can connect you with our expert team. Would you like me to schedule a call or send your inquiry via email?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    
    let response = '';
    if (question.includes('predictive maintenance')) {
      response = 'Predictive maintenance uses AI to predict when equipment might fail, allowing for proactive repairs and minimal downtime. Our solutions can reduce maintenance costs by up to 40% while improving safety.';
    } else if (question.includes('demo')) {
      response = 'I\'d be happy to arrange a personalized demo! Our team can show you our monitoring solutions in action. Would you like me to connect you with our sales team right now?';
      setShowContactForm(true);
    } else if (question.includes('support')) {
      response = 'Our support team is available 24/7 for urgent infrastructure issues. For immediate assistance, I can create a priority support ticket. What type of support do you need?';
    } else if (question.includes('pricing')) {
      response = 'Our solutions are customized based on your needs. Basic monitoring starts at $2,500, while enterprise solutions can be tailored to your budget. Would you like a personalized quote?';
    } else if (question.includes('documentation')) {
      response = 'I can guide you to our technical documentation. What specifically are you looking for? API docs, SDK guides, or integration examples?';
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);
  };

  const handleSendEmail = () => {
    if (userName && userEmail) {
      const inquiry = messages.filter(m => m.type === 'user').map(m => m.content).join('\n');
      
      addContactMessage({
        name: userName,
        email: userEmail,
        type: 'Chat Support',
        message: `Chat conversation:\n\n${inquiry}`
      });

      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Perfect! I\'ve sent your inquiry to our team. You\'ll receive a response within 2 hours. Is there anything else I can help you with?' 
      }]);
      
      setShowContactForm(false);
      setUserName('');
      setUserEmail('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full gradient-purple shadow-2xl chat-bounce hover-float spotlight-effect"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-morphism rounded-3xl w-96 h-[600px] flex flex-col shadow-2xl slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Senstec Assistant</h4>
                <p className="text-xs text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Online - Usually replies instantly
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs p-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-purple text-white ml-4' 
                    : 'bg-secondary text-foreground mr-4'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question.text)}
                    className="w-full text-left justify-start text-xs h-auto py-2"
                  >
                    <span className="mr-2">{question.icon}</span>
                    {question.text}
                  </Button>
                ))}
              </div>
            )}

            {/* Contact Form */}
            {showContactForm && (
              <div className="bg-muted/20 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-medium">Let's connect you with our team:</p>
                <Input
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-8"
                />
                <Input
                  placeholder="Your email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="h-8"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleSendEmail} size="sm" className="gradient-purple flex-1">
                    <Mail className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                  <Button onClick={() => setShowContactForm(false)} size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/20">
            <div className="flex space-x-2 mb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm" className="gradient-purple">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-center space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-xs"
                onClick={() => setShowContactForm(true)}
              >
                <Mail className="w-3 h-3 mr-1" />
                Email Us
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <HelpCircle className="w-3 h-3 mr-1" />
                Help
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
