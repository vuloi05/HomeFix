import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = 'http://10.174.120.161:4000'; // Địa chỉ IP LAN backend

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
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const socketRef = useRef<any>(null);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError('');
    // Fetch lịch sử chat từ backend (phân trang)
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://10.174.120.161:4000/api/chat/${orderId}?page=${page}&limit=30`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const chatData = res.data as { chat?: { messages?: Message[] }, hasMore?: boolean };
        if (chatData.chat && Array.isArray(chatData.chat.messages)) {
          setMessages(chatData.chat.messages);
          setHasMore(!!chatData.hasMore);
        }
      } catch (err) {
        setError('Không thể tải lịch sử chat');
      } finally {
        setLoading(false);
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
    socket.on('online', ({ userId }: { userId: string }) => {
      if (userId !== user.id) setOnline(true);
    });
    socket.on('offline', ({ userId }: { userId: string }) => {
      if (userId !== user.id) setOnline(false);
    });
    socket.on('left', ({ userId }: { userId: string }) => {
      if (userId !== user.id) Alert.alert('Thông báo', 'Đối tác đã rời phòng chat');
    });
    return () => {
      socket.disconnect();
    };
  }, [orderId, user?.id, page]);

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

  // Gửi ảnh
  const handleSendImage = async () => {
    if (!user) return;
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      // Upload ảnh lên server (giả sử có endpoint /api/chat/upload)
      try {
        const formData = new FormData();
        formData.append('image', { uri, name: 'chat.jpg', type: 'image/jpeg' } as any);
        const uploadRes = await axios.post(`http://10.174.120.161:4000/api/chat/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
        });
        const data = uploadRes.data as { url: string };
        if (data.url) {
          const msg: Message = {
            senderId: user.id,
            type: 'image',
            content: data.url,
            createdAt: new Date().toISOString(),
          };
          socketRef.current.emit('message', { ...msg, orderId });
          setMessages(prev => [...prev, msg]);
        }
      } catch (err) {
        Alert.alert('Lỗi', 'Không gửi được ảnh');
      }
    }
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
        <Text style={{ color: online ? 'green' : 'red', marginTop: 4 }}>{online ? 'Đang online' : 'Offline'}</Text>
      </View>
      {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
      {loading ? <Text style={{ textAlign: 'center' }}>Đang tải...</Text> : null}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.senderId === user?.id ? styles.myMessage : styles.partnerMessage]}>
            {item.type === 'image' ? (
              <Image source={{ uri: item.content }} style={{ width: 180, height: 180, borderRadius: 8 }} />
            ) : (
              <Text style={styles.messageText}>{item.content}</Text>
            )}
            <Text style={styles.timeText}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
            {user && item.senderId === user.id && item.read && <Text style={styles.readText}>Đã đọc</Text>}
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onEndReached={() => {
          if (hasMore && !loading) setPage(p => p + 1);
        }}
        onEndReachedThreshold={0.2}
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
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: '#4caf50' }]} onPress={handleSendImage}>
          <Text style={styles.sendButtonText}>Ảnh</Text>
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
