import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput as RNTextInput, Alert } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

type UserStatus = 'Beginner' | 'Experienced' | 'Professional';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('92');
  const [height, setHeight] = useState('185');
  const [status, setStatus] = useState<UserStatus>('Experienced');
  const [loading, setLoading] = useState(false);

  const statuses: UserStatus[] = ['Beginner', 'Experienced', 'Professional'];

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Ошибка', 'Заполните обязательные поля');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Успех', 'Профиль обновлен', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 500);
  };

  const getStatusLabel = (s: UserStatus) => {
    const labels = {
      'Beginner': 'Начинающий',
      'Experienced': 'Опытный',
      'Professional': 'Профессионал',
    };
    return labels[s];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Редактировать профиль</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <TouchableOpacity style={styles.avatarButton}>
            <Text style={styles.avatarButtonText}>Выбрать фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButtonSecondary}>
            <Text style={styles.avatarButtonSecondaryText}>Удалить аватар</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Основная информация</Text>
          <View style={styles.card}>
            <View style={styles.formField}>
              <Text style={styles.label}>Имя пользователя *</Text>
              <RNTextInput
                style={styles.input}
                placeholder="Введите имя"
                placeholderTextColor={NordColors.polarNight.nord3}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Email *</Text>
              <RNTextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor={NordColors.polarNight.nord3}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Возраст</Text>
              <RNTextInput
                style={styles.input}
                placeholder="25"
                placeholderTextColor={NordColors.polarNight.nord3}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Вес (кг)</Text>
                <RNTextInput
                  style={styles.input}
                  placeholder="92"
                  placeholderTextColor={NordColors.polarNight.nord3}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Рост (см)</Text>
                <RNTextInput
                  style={styles.input}
                  placeholder="185"
                  placeholderTextColor={NordColors.polarNight.nord3}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Статус</Text>
              <View style={styles.statusSelector}>
                {statuses.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.statusButton,
                      status === s && styles.statusButtonActive,
                    ]}
                    onPress={() => setStatus(s)}
                  >
                    <Text style={[
                      styles.statusButtonText,
                      status === s && styles.statusButtonTextActive,
                    ]}>
                      {getStatusLabel(s)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: NordColors.polarNight.nord1,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    color: NordColors.frost.nord9,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: NordColors.polarNight.nord1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: NordColors.frost.nord9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  avatarButton: {
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
  },
  avatarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  avatarButtonSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  avatarButtonSecondaryText: {
    fontSize: 14,
    color: NordColors.aurora.nord11,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.frost.nord8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  statusSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statusButton: {
    flex: 1,
    margin: 4,
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: NordColors.polarNight.nord3,
  },
  statusButtonActive: {
    borderColor: NordColors.frost.nord9,
    backgroundColor: NordColors.polarNight.nord2,
  },
  statusButtonText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
  statusButtonTextActive: {
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  actions: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: NordColors.polarNight.nord0,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  cancelButtonText: {
    color: NordColors.snowStorm.nord5,
    fontSize: 16,
  },
});

export default EditProfileScreen;
