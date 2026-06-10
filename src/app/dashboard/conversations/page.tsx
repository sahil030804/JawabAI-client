'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

interface Message {
  id: string;
  role: 'customer' | 'ai';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
  avatar: string;
}

function generateMockConversations(): Conversation[] {
  const now = new Date();
  const time = (minsAgo: number) => {
    const d = new Date(now.getTime() - minsAgo * 60000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return [
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      lastMessage: 'Thanks! I will check the size chart and get back to you.',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'PS',
      messages: [
        { id: 'm1', role: 'customer', content: 'Hi, I saw your product on Instagram. Is the blue dress still available in medium size?', timestamp: time(15) },
        { id: 'm2', role: 'ai', content: 'Hello Priya! Yes, the blue dress is available in medium size. It\'s one of our bestsellers! Would you like to place an order?', timestamp: time(14) },
        { id: 'm3', role: 'customer', content: 'Great! What about the delivery time?', timestamp: time(10) },
        { id: 'm4', role: 'ai', content: 'Standard delivery takes 3-5 business days. We also offer express delivery within 24 hours for an additional ₹99. Would you like me to check the size chart for you?', timestamp: time(9) },
        { id: 'm5', role: 'customer', content: 'Thanks! I will check the size chart and get back to you.', timestamp: time(2) },
      ],
    },
    {
      id: '2',
      customerName: 'Rahul Verma',
      customerPhone: '+91 87654 32109',
      lastMessage: 'Perfect, I will share my requirements via email.',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'RV',
      messages: [
        { id: 'm6', role: 'customer', content: 'Hi, I need bulk pricing for your catering service. We have an office event for 200 people.', timestamp: time(70) },
        { id: 'm7', role: 'ai', content: 'Hello Rahul! Thank you for your interest. Our corporate catering starts at ₹350 per person for a standard menu. For 200 people, I can offer a special rate of ₹300 per person with a complimentary dessert platter. Would you like to see our menu options?', timestamp: time(69) },
        { id: 'm8', role: 'customer', content: 'That sounds good. Can you share the menu options for vegetarian?', timestamp: time(65) },
        { id: 'm9', role: 'ai', content: 'Absolutely! Our vegetarian menu includes:\n\n1. Starter: Paneer Tikka, Hara Bhara Kabab\n2. Main Course: Dal Makhani, Paneer Butter Masala, Mix Veg, Naan/Rice\n3. Dessert: Gulab Jamun, Ice Cream\n\nWe also have Jain and vegan options available.', timestamp: time(64) },
        { id: 'm10', role: 'customer', content: 'Perfect, I will share my requirements via email.', timestamp: time(60) },
      ],
    },
    {
      id: '3',
      customerName: 'Ananya Gupta',
      customerPhone: '+91 76543 21098',
      lastMessage: 'Oh okay, I understand. I will wait for the restock.',
      timestamp: '3 hours ago',
      unread: 1,
      avatar: 'AG',
      messages: [
        { id: 'm11', role: 'customer', content: 'Hello! I ordered a pair of shoes last week but haven\'t received any tracking update.', timestamp: time(190) },
        { id: 'm12', role: 'ai', content: 'Hello Ananya! I apologize for the inconvenience. Let me check your order status right away. Could you please share your order number?', timestamp: time(189) },
        { id: 'm13', role: 'customer', content: 'Order #ORD-2024-7890', timestamp: time(185) },
        { id: 'm14', role: 'ai', content: 'Thank you! I can see that your order is currently in transit. The estimated delivery is within 2 days. Here\'s your tracking link: https://track.example.com/ORD20247890\n\nIs there anything else I can help you with?', timestamp: time(184) },
        { id: 'm15', role: 'customer', content: 'Actually I wanted the grey color but I ordered black by mistake. Can I change it?', timestamp: time(180) },
        { id: 'm16', role: 'ai', content: 'I understand. Unfortunately, since the order is already in transit, I cannot change the color. However, you can initiate a return once delivered and place a new order for the grey variant. Our return policy is hassle-free with free pickup.', timestamp: time(179) },
        { id: 'm17', role: 'customer', content: 'Oh okay, I understand. I will wait for the restock.', timestamp: time(175) },
      ],
    },
    {
      id: '4',
      customerName: 'Vikram Singh',
      customerPhone: '+91 65432 10987',
      lastMessage: 'Perfect, looking forward to it.',
      timestamp: '5 hours ago',
      unread: 0,
      avatar: 'VS',
      messages: [
        { id: 'm18', role: 'customer', content: 'Hi, I want to book a consultation for web development services.', timestamp: time(310) },
        { id: 'm19', role: 'ai', content: 'Hello Vikram! Thank you for your interest. We offer the following web development packages:\n\n1. Basic: ₹25,000 (Landing page, 5 sections)\n2. Business: ₹55,000 (Multi-page, CMS, Blog)\n3. E-commerce: ₹85,000 (Shop, Payment gateway, Inventory)\n\nWhich package interests you?', timestamp: time(309) },
        { id: 'm20', role: 'customer', content: 'I am interested in the Business package. Can I see some portfolio examples?', timestamp: time(305) },
        { id: 'm21', role: 'ai', content: 'Absolutely! Here are some recent projects:\n\n1. ShopEase (E-commerce) - shopease.example.com\n2. GreenLeaf Organics (Business) - greenleaf.example.com\n3. Dr. Patel\'s Clinic (Booking System) - drpatel.example.com\n\nWould you like to schedule a free 30-minute consultation call?', timestamp: time(304) },
        { id: 'm22', role: 'customer', content: 'Yes, please schedule it for this Friday at 11 AM.', timestamp: time(300) },
        { id: 'm23', role: 'ai', content: 'Perfect! I\'ve scheduled your consultation for this Friday at 11:00 AM. You\'ll receive a Google Meet link via email shortly. Our senior developer will join the call.', timestamp: time(299) },
        { id: 'm24', role: 'customer', content: 'Perfect, looking forward to it.', timestamp: time(295) },
      ],
    },
    {
      id: '5',
      customerName: 'Neha Patel',
      customerPhone: '+91 54321 09876',
      lastMessage: 'Done! Already shared with my friends 😊',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'NP',
      messages: [
        { id: 'm25', role: 'customer', content: 'Hey! I received my order today and I absolutely LOVE it! The quality is amazing!', timestamp: time(1440) },
        { id: 'm26', role: 'ai', content: 'That makes us so happy to hear, Neha! 🌟 Thank you for your kind words. We take great pride in our product quality.\n\nAs a thank you, here\'s a special discount code: WELCOME10 for 10% off your next purchase!', timestamp: time(1439) },
        { id: 'm27', role: 'customer', content: 'Wow thank you! I will definitely order again soon. Can I also leave a review?', timestamp: time(1435) },
        { id: 'm28', role: 'ai', content: 'Of course! We would love to hear your feedback. You can leave a review here: https://example.com/review/ORD20247891\n\nAlso, if you share your experience on Instagram and tag us (@jawabai), you get a chance to win a ₹500 gift voucher!', timestamp: time(1434) },
        { id: 'm29', role: 'customer', content: 'Done! Already shared with my friends 😊', timestamp: time(1420) },
      ],
    },
  ];
}

function formatTime(dateStr: string): string {
  return dateStr;
}

export default function ConversationsPage() {
  const { user } = useAuth();
  const [conversations] = useState<Conversation[]>(generateMockConversations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  const filteredConversations = conversations.filter(c =>
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customerPhone.includes(searchQuery)
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    // Mock: just add message to local state
    setNewMessage('');
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Conversations
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            View and manage all customer conversations. Your AI assistant handles replies automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Conversation List */}
          <Card className={`lg:col-span-1 ${selectedId ? 'hidden lg:block' : ''}`}>
            <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]">
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    {searchQuery ? 'No conversations match your search' : 'No conversations yet'}
                  </div>
                ) : (
                  filteredConversations.map(conv => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedId(conv.id)}
                      className={`w-full text-left p-3 sm:p-4 hover:bg-gray-50 transition-colors ${
                        selectedId === conv.id ? 'bg-[#25D366]/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                          style={{ backgroundColor: selectedId === conv.id ? '#25D366' : '#0F172A' }}
                        >
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-[#0F172A] text-sm truncate">
                              {conv.customerName}
                            </p>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                              {conv.timestamp}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Chat View */}
          <Card className={`lg:col-span-2 ${!selectedId ? 'hidden lg:block' : ''}`}>
            {selectedConversation ? (
              <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]">
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="lg:hidden p-1 -ml-1 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {selectedConversation.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm sm:text-base">
                        {selectedConversation.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.customerPhone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#25D366] rounded-full" />
                    <span className="text-xs text-gray-500 ml-1">AI Active</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#F8FAFC]">
                  {selectedConversation.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                          msg.role === 'customer'
                            ? 'bg-white text-[#0F172A] border border-gray-100 shadow-sm'
                            : 'bg-[#25D366] text-white shadow-sm'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            msg.role === 'customer' ? 'text-gray-400' : 'text-white/70'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                          {msg.role === 'ai' && (
                            <span className="ml-2 inline-flex items-center">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span className="ml-1">AI</span>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t border-gray-100 bg-white rounded-b-xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Reply as business..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-gray-50 pr-10"
                        disabled
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <button
                      className="p-2.5 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed"
                      disabled
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                    Replies are handled automatically by AI. Upgrade to send manual replies.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)] flex items-center justify-center">
                <EmptyState
                  icon={
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  title="Select a conversation"
                  description="Choose a conversation from the list to view messages"
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
