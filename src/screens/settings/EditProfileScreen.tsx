import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { Button, Input } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileService from '../../services/ProfileService';
import { UserProfile, ExperienceLevel } from '../../types/profile';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Beginner');
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await ProfileService.getUserProfile();
    setProfile(data);
    setName(data.name);
    setEmail(data.email);
    setAge(data.age?.toString() || '');
    setWeight(data.weight?.toString() || '');
    setHeight(data.height?.toString() || '');
    setPhone(data.phone || '');
    setExperienceLevel(data.experienceLevel);
    setEmailNotifications(data.emailNotifications);
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Ошибка', 'Имя и email обязательны');
      return;
    }

    setLoading(true);
    try {
      await ProfileService.updateUserProfile({
        name: name.trim(),
        email: email.trim(),
        age: age ? parseInt(age) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        phone: phone.trim() || undefined,
        experienceLevel,
        emailNotifications,
      });

      Alert.alert('Успешно', 'Профиль обновлен', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Доступ запрещен', 'Нужно разрешение для доступа к фото');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await ProfileService.updateAvatar(result.assets[0].uri);
      Alert.alert('Успешно', 'Аватар обновлен');
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Доступ запрещен', 'Нужно разрешение для доступа к камере');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await ProfileService.updateAvatar(result.assets[0].uri);
      Alert.alert('Успешно', 'Аватар обновлен');
    }
  };

  const handleDeleteAvatar = async () => {
    Alert.alert(
      'Удалить аватар',
      'Вы уверены?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            await ProfileService.deleteAvatar();
            Alert.alert('Успешно', 'Аватар удален');
          },
        },
      ]
    );
  };

  const handleChooseAvatar = () => {
    Alert.alert(
      'Выбрать фото',
      'Откуда загрузить фото?',
      [
        { text: 'Камера', onPress: handleTakePhoto },
        { text: 'Галерея', onPress: handlePickImage },
        { text: 'Отмена', style: 'cancel' },
      ]
    );
  };

  const selectExperienceLevel = () => {
    Alert.alert(
      'Уровень опыта',
      'Выберите ваш уровень',
      [
        { text: 'Начинающий', onPress: () => setExperienceLevel('Beginner') },
        { text: 'Опытный', onPress: () => setExperienceLevel('Experienced') },
        { text: 'Профессионал', onPress: () => setExperienceLevel('Professional') },
        { text: 'Отмена', style: 'cancel' },
      ]
    );
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Avatar Section */}
      <Card style={styles.card}>
        <CardContent>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.avatarButton}
              onPress={handleChooseAvatar}
            >
              <Icon name="camera" size={16} color={NordColors.frost.nord9} />
              <Text style={styles.avatarButtonText}>Выбрать фото</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.avatarButtonDelete}
              onPress={handleDeleteAvatar}
            >
              <Icon name="delete" size={16} color={NordColors.aurora.nord11} />
              <Text style={styles.avatarButtonDeleteText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Text style={styles.sectionTitle}>ОСНОВНАЯ ИНФОРМАЦИЯ</Text>
      <Card style={styles.card}>
        <CardContent>
          <Input
            label="Имя пользователя"
            value={name}
            onChangeText={setName}
            placeholder="Введите ваше имя"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Возраст"
            value={age}
            onChangeText={setAge}
            placeholder="25"
            keyboardType="numeric"
          />
          <Input
            label="Вес (кг)"
            value={weight}
            onChangeText={setWeight}
            placeholder="75"
            keyboardType="numeric"
          />
          <Input
            label="Рост (см)"
            value={height}
            onChangeText={setHeight}
            placeholder="180"
            keyboardType="numeric"
          />
          
          <TouchableOpacity 
            style={styles.selector}
            onPress={selectExperienceLevel}
          >
            <View style={styles.selectorContent}>
              <Text style={styles.selectorLabel}>Уровень опыта</Text>
              <View style={styles.selectorValue}>
                <Text style={styles.selectorValueText}>
                  {experienceLevel === 'Beginner' ? 'Начинающий' : 
                   experienceLevel === 'Experienced' ? 'Опытный' : 'Профессионал'}
                </Text>
                <Icon name="chevron-down" size={20} color={NordColors.polarNight.nord3} />
              </View>
            </View>
          </TouchableOpacity>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>КОНТАКТНЫЕ ДАННЫЕ</Text>
      <Card style={styles.card}>
        <CardContent>
          <Input
            label="Телефон (опционально)"
            value={phone}
            onChangeText={setPhone}
            placeholder="+7 (999) 123-45-67"
            keyboardType="phone-pad"
          />
          
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setEmailNotifications(!emailNotifications)}
          >
            <Icon 
              name={emailNotifications ? 'checkbox-marked' : 'checkbox-blank-outline'} 
              size={24} 
              color={emailNotifications ? NordColors.frost.nord9 : NordColors.polarNight.nord3} 
            />
            <Text style={styles.checkboxLabel}>Уведомлять на email</Text>
          </TouchableOpacity>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <Button 
          variant="primary" 
          fullWidth 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          Отмена
        </Button>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  loadingText: {
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.polarNight.nord3,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: NordColors.frost.nord9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord6,
  },
  avatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: NordColors.polarNight.nord2,
    marginBottom: 8,
  },
  avatarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord9,
    marginLeft: 8,
  },
  avatarButtonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatarButtonDeleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.aurora.nord11,
    marginLeft: 8,
  },
  selector: {
    marginTop: 12,
  },
  selectorContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 8,
  },
  selectorLabel: {
    fontSize: 12,
    color: NordColors.polarNight.nord3,
    marginBottom: 4,
  },
  selectorValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorValueText: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    marginLeft: 12,
  },
  buttonsContainer: {
    padding: 16,
    gap: 12,
  },
  footer: {
    height: 20,
  },
});

export default EditProfileScreen;
