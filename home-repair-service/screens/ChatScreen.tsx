import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'http://localhost:4000'; // Đổi thành IP backend nếu chạy trên thiết bị thật

interface Message {
  senderId: string;
  type: 'text' | 'image';
  content: string;
  createdAt: string;
  read?: boolean;
}

export const ChatScreen = () => {
  const route = useRoute<any>();
  const { user } = useUser();
  const { orderId, partnerName } = route.params || {};
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const socketRef = useRef<any>(null);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    if (!user) return;
    // Fetch lịch sử chat từ backend
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/chat/${orderId}`);
        const chatData = res.data as { chat?: { messages?: Message[] } };
        if (chatData.chat && Array.isArray(chatData.chat.messages)) {
          setMessages(chatData.chat.messages);
        }
      } catch (err) {
        // Có thể log lỗi hoặc hiển thị thông báo
      }
    };
    fetchHistory();
    // Kết nối socket
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.emit('join', { orderId, userId: user.id });
    // Lắng nghe tin nhắn mới
    socket.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });
    socket.on('typing', ({ userId }: { userId: string }) => {
      if (userId !== user.id) setPartnerTyping(true);
    });
    socket.on('read', ({ userId }: { userId: string }) => {
      if (userId !== user.id) {
        setMessages(prev => prev.map(m => ({ ...m, read: true })));
      }
    });
    // Online/offline có thể bổ sung sau
    return () => {
      socket.disconnect();
    };
  }, [orderId, user?.id]);

  const handleSend = () => {
    if (!input.trim() || !user) return;
    const msg: Message = {
      senderId: user.id,
      type: 'text',
      content: input,
      createdAt: new Date().toISOString(),
    };
    socketRef.current.emit('message', { ...msg, orderId });
    setMessages(prev => [...prev, msg]);
    setInput('');
    socketRef.current.emit('read', { orderId, userId: user.id });
  };

  const handleTyping = () => {
    setTyping(true);
    if (user) {
      socketRef.current.emit('typing', { orderId, userId: user.id });
    }
    setTimeout(() => setTyping(false), 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat với {partnerName || 'đối tác'}</Text>
        {partnerTyping && <Text style={styles.typingText}>Đang nhập...</Text>}
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.senderId === user?.id ? styles.myMessage : styles.partnerMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
            {user && item.senderId === user.id && item.read && <Text style={styles.readText}>Đã đọc</Text>}
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onFocus={handleTyping}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  typingText: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
  message: {
    marginBottom: 12,
    maxWidth: '80%',
    borderRadius: 8,
    padding: 10,
  },
  myMessage: {
    backgroundColor: '#d1f5d3',
    alignSelf: 'flex-end',
  },
  partnerMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  readText: {
    fontSize: 10,
    color: '#4caf50',
    marginTop: 2,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#2196f3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
