import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SERVICE_SUB_CATEGORIES, ServiceSubCategory } from '../Constants/serviceSubCategories';
import { CustomButton } from '../components/CustomButton';
import { Colors } from '../Constants/colors';

interface ServiceSubCategoryScreenProps {
  route: { params: { parentId: string; parentName: string; selected: string[] } };
  navigation: any;
  onSelect?: (selected: ServiceSubCategory[]) => void;
}

export const ServiceSubCategoryScreen: React.FC<ServiceSubCategoryScreenProps> = ({ route, navigation, onSelect }) => {
  const { parentId, parentName, selected = [] } = route.params;
  const [selectedIds, setSelectedIds] = useState<string[]>(selected);
  const subCategories = SERVICE_SUB_CATEGORIES[parentId] || [];

  const handleToggle = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleConfirm = () => {
    const selectedSubs = subCategories.filter(sub => selectedIds.includes(sub.id));
    navigation.navigate('ServiceForm', {
      parentId,
      parentName,
      selectedSubIds: selectedIds,
      selectedSubCategories: selectedSubs,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn dịch vụ chi tiết cho "{parentName}"</Text>
      <ScrollView style={{ flex: 1 }}>
        {subCategories.map(sub => (
          <TouchableOpacity
            key={sub.id}
            style={[styles.item, selectedIds.includes(sub.id) && styles.selectedItem]}
            onPress={() => handleToggle(sub.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{sub.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{sub.name}</Text>
              <Text style={styles.desc}>{sub.description}</Text>
            </View>
            <View style={styles.checkbox}>{selectedIds.includes(sub.id) ? <Text style={{ color: Colors.primary }}>✔</Text> : null}</View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <CustomButton
        title="Xác nhận lựa chọn"
        onPress={handleConfirm}
        disabled={selectedIds.length === 0}
        style={styles.confirmBtn}
      />
      <CustomButton
        title="Quay lại"
        onPress={() => navigation.goBack()}
        variant="outline"
        style={styles.backBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 16, textAlign: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10, backgroundColor: Colors.surface || '#fff', marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  selectedItem: { borderColor: Colors.primary, backgroundColor: '#e6f7ff' },
  icon: { fontSize: 28, marginRight: 16 },
  name: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  desc: { fontSize: 14, color: Colors.textSecondary },
  checkbox: { width: 28, alignItems: 'center' },
  confirmBtn: { marginTop: 8 },
  backBtn: { marginTop: 8 },
});

export default ServiceSubCategoryScreen;
