import React from 'react';
import { useUser } from '../contexts/UserContext';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, View as RNView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserRole } from '../types';
import { CustomButton } from '../components/CustomButton';
import { Colors } from '../Constants/colors';
import { CustomInput } from '../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
  role: UserRole;
  setRole: (role: UserRole) => void;
  setShowAdminModal: (show: boolean) => void;
  setAdminPassword: (pw: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation, role, setRole, setShowAdminModal, setAdminPassword }) => {
  const { setUserType, setUser, loadMockUsers } = useUser();
  const [selectType, setSelectType] = React.useState<'customer' | 'worker' | null>(null);
  const [userOptions, setUserOptions] = React.useState<any[]>([]);
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showRoleSheet, setShowRoleSheet] = React.useState(false);
  const [showAdminPwModal, setShowAdminPwModal] = React.useState(false);
  const [adminPw, setAdminPw] = React.useState('');
  const [adminPwError, setAdminPwError] = React.useState('');

  React.useEffect(() => {
    if (role === 'customer') {
      // Nếu đang ở WelcomeScreen, tự động chuyển sang ServiceFormScreen
      navigation.navigate('ServiceForm');
    }
  }, [role]);

  const handleGetStarted = () => {
    navigation.navigate('ServiceForm');
  };

  const handleSelectRole = async (role: UserRole) => {
    setShowRoleSheet(false);
    if (role === 'admin') {
      setShowAdminPwModal(true);
    } else if (role === 'worker' || role === 'customer') {
      setSelectType(role);
      const users = await loadMockUsers(role);
      setUserOptions(users);
      setShowUserModal(true);
    }
  };

  const handleChooseUser = (user: any) => {
    setUserType(selectType);
    setUser(user);
    setShowUserModal(false);
    setRole(selectType);
  };

  const handleAdminLogin = () => {
    if (adminPw === '123') {
      setRole('admin');
      setShowAdminPwModal(false);
      setAdminPw('');
      setAdminPwError('');
    } else {
      setAdminPwError('Sai mật khẩu!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🔧</Text>
          <Text style={styles.logoText}>HomeFix</Text>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Chào mừng đến với HomeFix</Text>
          <Text style={styles.subtitle}>
            Dịch vụ sửa chữa tại nhà uy tín, nhanh chóng và chất lượng
          </Text>
          <Text style={styles.description}>
            Chúng tôi cung cấp các dịch vụ sửa chữa điện nước, điện lạnh, 
            thợ mộc và nhiều dịch vụ khác tại nhà của bạn.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Nhanh chóng</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Giá cả hợp lý</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Chất lượng đảm bảo</Text>
          </View>
        </View>
      </View>

      {/* Get Started Button */}
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Text style={{ color: Colors.textSecondary, fontSize: 15, marginBottom: 8 }}>
          Hãy chọn vai trò để tiếp tục sử dụng ứng dụng.
        </Text>
        <CustomButton
          title="Chọn vai trò"
          onPress={() => setShowRoleSheet(true)}
          style={{ minWidth: 160 }}
        />
      </View>
      {/* Bottom sheet chọn vai trò */}
      <Modal
        visible={showRoleSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRoleSheet(false)}
      >
        <RNView style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <RNView style={{ backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Chọn vai trò</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }} onPress={() => handleSelectRole('customer')}>
              <Ionicons name="person-outline" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Khách hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }} onPress={() => handleSelectRole('worker')}>
              <Ionicons name="construct-outline" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Thợ sửa chữa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }} onPress={() => handleSelectRole('admin')}>
              <Ionicons name="shield-checkmark-outline" size={24} color={Colors.primary} style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 16 }}>Admin</Text>
            </TouchableOpacity>
            <CustomButton title="Đóng" onPress={() => setShowRoleSheet(false)} variant="outline" style={{ marginTop: 16 }} />
          </RNView>
        </RNView>
      </Modal>
      {/* Modal chọn user mẫu */}
      <Modal
        visible={showUserModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowUserModal(false)}
      >
        <RNView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <RNView style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, minWidth: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
              {selectType === 'customer' ? 'Chọn khách hàng mẫu' : 'Chọn thợ mẫu'}
            </Text>
            {userOptions.map((u) => (
              <TouchableOpacity key={u.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }} onPress={() => handleChooseUser(u)}>
                <Image source={{ uri: u.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{u.name}</Text>
                  <Text style={{ fontSize: 13, color: '#888' }}>{u.phone}</Text>
                  {u.specialty && <Text style={{ fontSize: 13, color: '#888' }}>{u.specialty}</Text>}
                </View>
              </TouchableOpacity>
            ))}
            <CustomButton title="Đóng" onPress={() => setShowUserModal(false)} variant="outline" style={{ marginTop: 16 }} />
          </RNView>
        </RNView>
      </Modal>

      {/* Modal nhập mật khẩu admin */}
      <Modal
        visible={showAdminPwModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAdminPwModal(false)}
      >
        <RNView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <RNView style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Nhập mật khẩu Admin</Text>
            <CustomInput
              placeholder="Mật khẩu admin"
              value={adminPw}
              onChangeText={setAdminPw}
              secureTextEntry
              error={adminPwError}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
              <CustomButton title="Hủy" onPress={() => { setShowAdminPwModal(false); setAdminPw(''); setAdminPwError(''); }} variant="outline" style={{ marginRight: 8 }} />
              <CustomButton title="Xác nhận" onPress={handleAdminLogin} />
            </View>
          </RNView>
        </RNView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  getStartedButton: {
    backgroundColor: Colors.primary,
  },
});
