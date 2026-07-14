// components/notes/Notes.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Note } from '../../types';

// Types
interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: string;
  unreadCount: number;
  applicationId: string;
}

interface Props {
  notes: Note[];
  applicationId: string;
  onAddNote: (message: string) => void;
}

// Mock Contacts Data
const mockContacts: Contact[] = [
  {
    id: 'sw-001',
    name: 'Sarah Ahmed',
    role: 'Senior Social Worker',
    avatar: '👩‍💼',
    status: 'online',
    lastSeen: new Date().toISOString(),
    unreadCount: 2,
    applicationId: 'APP-001'
  },
  {
    id: 'sw-002',
    name: 'Md. Rahman',
    role: 'Social Worker',
    avatar: '👨‍💼',
    status: 'online',
    lastSeen: new Date().toISOString(),
    unreadCount: 0,
    applicationId: 'APP-001'
  },
  {
    id: 'sw-003',
    name: 'Taslima Begum',
    role: 'Foster Care Supervisor',
    avatar: '👩‍⚖️',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000 * 2).toISOString(),
    unreadCount: 0,
    applicationId: 'APP-001'
  },
  {
    id: 'sw-004',
    name: 'Kamal Hossain',
    role: 'Junior Social Worker',
    avatar: '👨‍⚕️',
    status: 'away',
    lastSeen: new Date(Date.now() - 3600000 * 5).toISOString(),
    unreadCount: 0,
    applicationId: 'APP-001'
  }
];

// Initial demo messages
const initialMessages: Note[] = [
  {
    id: '1',
    from: 'SocialWorker',
    message: 'Hello! How can I help you with your application?',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    applicationId: 'APP-001'
  },
  {
    id: '2',
    from: 'Caregiver',
    message: 'Hi! I need help with my license renewal.',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    applicationId: 'APP-001'
  },
  {
    id: '3',
    from: 'SocialWorker',
    message: 'Sure! Please upload the required documents first.',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    applicationId: 'APP-001'
  }
];

const Notes: React.FC<Props> = ({ notes: externalNotes, applicationId, onAddNote }) => {
  // States
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [newNote, setNewNote] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'online'>('all');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  
  // Local messages state - এখানে সব মেসেজ সংরক্ষণ হবে
  const [messages, setMessages] = useState<Note[]>(initialMessages);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter contacts
  const onlineContacts = mockContacts.filter(c => c.status === 'online');
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'online' && contact.status === 'online');
    return matchesSearch && matchesTab;
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  // Handle send message - এখানে মেসেজ যোগ করা হচ্ছে
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      // 1. নতুন মেসেজ তৈরি করি
      const newMessage: Note = {
        id: Date.now().toString(),
        from: 'Caregiver',
        message: newNote.trim(),
        timestamp: new Date().toISOString(),
        applicationId: applicationId
      };

      // 2. মেসেজ লিস্টে যোগ করি (সাথে সাথে দেখাবে)
      setMessages(prev => [...prev, newMessage]);
      
      // 3. Parent কে জানাই (যদি প্রয়োজন হয়)
      onAddNote(newNote.trim());
      
      // 4. ইনপুট ক্লিয়ার করি
      setNewNote('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      // 5. Social Worker এর reply simulate করি
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        
        // Social Worker এর reply
        const replyMessage: Note = {
          id: (Date.now() + 1).toString(),
          from: 'SocialWorker',
          message: `✓ Received: "${newNote.trim()}" - I'll review it shortly.`,
          timestamp: new Date().toISOString(),
          applicationId: applicationId
        };
        
        // Reply যোগ করি
        setMessages(prev => [...prev, replyMessage]);
      }, 1500 + Math.random() * 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  const getStatusText = (status: string) => {
    const texts = {
      online: 'Online',
      offline: 'Offline',
      away: 'Away',
      busy: 'Busy'
    };
    return texts[status as keyof typeof texts] || 'Offline';
  };

  // Get sender avatar
  const getAvatar = (from: string) => {
    if (from === 'Caregiver') {
      return {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        icon: '👤',
        label: 'You'
      };
    } else {
      return {
        bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
        icon: '👩‍⚕️',
        label: 'Social Worker'
      };
    }
  };

  // Quick replies
  const quickReplies = [
    { emoji: '📄', text: 'I will upload documents' },
    { emoji: '⏳', text: 'Please wait' },
    { emoji: '✅', text: 'Done' },
    { emoji: '❓', text: 'Need help' },
    { emoji: '🙏', text: 'Thank you' },
    { emoji: '📞', text: 'Call me' }
  ];

  return (
    <div className="h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-row-reverse">
      {/* ========== RIGHT SIDE - CONTACT LIST ========== */}
      <div className={`w-full sm:w-80 md:w-96 border-l border-gray-100 flex-shrink-0 flex flex-col bg-gray-50 ${
        isMobileListOpen ? 'block' : 'hidden sm:block'
      }`}>
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Messages</span>
            </h3>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {onlineContacts.length} online
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white px-3 pt-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-sm font-medium transition border-b-2 ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 py-2 text-sm font-medium transition border-b-2 relative ${
              activeTab === 'online'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Online
            {onlineContacts.length > 0 && (
              <span className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {onlineContacts.length}
              </span>
            )}
          </button>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <span className="text-3xl mb-2">🔍</span>
              <p className="text-gray-500 text-sm">No contacts found</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <motion.button
                key={contact.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelectedContact(contact);
                  setIsMobileListOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 transition-all ${
                  selectedContact?.id === contact.id
                    ? 'bg-blue-50 border-l-4 border-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    selectedContact?.id === contact.id
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      : 'bg-gray-200'
                  }`}>
                    {contact.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusColor(contact.status)}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-sm truncate ${
                      selectedContact?.id === contact.id ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {contact.lastSeen ? new Date(contact.lastSeen).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 truncate">{contact.role}</span>
                    <div className="flex items-center space-x-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(contact.status)}`} />
                      <span className="text-xs text-gray-400">{getStatusText(contact.status)}</span>
                    </div>
                  </div>
                </div>

                {/* Unread Badge */}
                {contact.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                    {contact.unreadCount}
                  </span>
                )}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* ========== LEFT SIDE - CHAT WINDOW ========== */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {!selectedContact ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl mx-auto mb-4">
                💬
              </div>
              <h4 className="text-gray-700 font-semibold">Select a contact</h4>
              <p className="text-gray-400 text-sm">Choose a Social Worker to start messaging</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setIsMobileListOpen(true)}
                className="sm:hidden mr-2 p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    selectedContact.status === 'online'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                      : 'bg-gray-200'
                  }`}>
                    {selectedContact.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedContact.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{selectedContact.name}</h4>
                  <div className="flex items-center space-x-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(selectedContact.status)}`} />
                    <span className="text-xs text-gray-500">{getStatusText(selectedContact.status)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ========== MESSAGES AREA ========== */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-4xl">💬</span>
                    </div>
                    <h4 className="text-gray-700 font-semibold">No messages yet</h4>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Start a conversation with {selectedContact.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((note, index) => {
                      const isOwn = note.from === 'Caregiver';
                      const avatar = getAvatar(note.from);
                      
                      return (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-end space-x-2 ${
                            isOwn ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          {/* Avatar */}
                          <div className={`w-8 h-8 rounded-full ${avatar.bg} flex items-center justify-center text-white text-xs flex-shrink-0 shadow-md`}>
                            {avatar.icon}
                          </div>

                          {/* Message Bubble */}
                          <div className={`flex flex-col max-w-[80%] ${
                            isOwn ? 'items-end' : 'items-start'
                          }`}>
                            <div
                              className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                                isOwn
                                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none'
                                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {note.message}
                              </p>
                            </div>

                            {/* Timestamp & Sender */}
                            <div className={`flex items-center space-x-2 mt-1 ${
                              isOwn ? 'flex-row-reverse' : ''
                            }`}>
                              <span className="text-xs text-gray-400">
                                {formatTime(note.timestamp)}
                              </span>
                              <span className={`text-xs font-medium ${
                                isOwn ? 'text-blue-600' : 'text-purple-600'
                              }`}>
                                {avatar.label}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs shadow-md">
                          👩‍⚕️
                        </div>
                        <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* ========== MESSAGE INPUT ========== */}
            <div className="border-t border-gray-200 bg-white p-4">
              <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                {/* Emoji Button */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={newNote}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={`Message ${selectedContact?.name || ''}...`}
                    rows={1}
                    className={`w-full resize-none px-4 py-2.5 rounded-2xl border-2 transition-all duration-200 outline-none ${
                      isFocused
                        ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ maxHeight: '120px' }}
                  />
                  
                  {newNote.length > 0 && (
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400">
                      {newNote.length}
                    </span>
                  )}
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 flex-shrink-0 ${
                    newNote.trim()
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>

              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickReplies.map((quick) => (
                  <button
                    key={quick.text}
                    type="button"
                    onClick={() => {
                      setNewNote(prev => prev + quick.emoji + ' ' + quick.text);
                      if (textareaRef.current) {
                        textareaRef.current.focus();
                      }
                    }}
                    className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full transition border border-gray-200 hover:border-gray-300"
                  >
                    {quick.emoji} {quick.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;