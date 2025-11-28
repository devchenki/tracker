import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput as RNTextInput, Alert } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import NotesService, { NoteCategory } from '../../services/NotesService';
import { useNavigation } from '@react-navigation/native';

const LogNoteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState<NoteCategory | ''>('');
  const [text, setText] = useState('');
  const [cycleId, setCycleId] = useState('');
  const [loading, setLoading] = useState(false);

  const categories: { value: NoteCategory; label: string; icon: string }[] = [
    { value: 'Progress', label: 'Прогресс', icon: '💪' },
    { value: 'Side Effects', label: 'Побочные эффекты', icon: '⚠️' },
    { value: 'Mood', label: 'Настроение', icon: '😊' },
    { value: 'General', label: 'Общее', icon: '📝' },
  ];

  const handleSave = async () => {
    if (!category || !text.trim()) {
      Alert.alert('Ошибка', 'Выберите категорию и введите текст заметки');
      return;
    }

    setLoading(true);
    try {
      await NotesService.addNote(
        category,
        text,
        cycleId || undefined,
        new Date().toISOString()
      );

      Alert.alert('Успех', 'Заметка добавлена ✓', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить заметку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Записать заметку</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Категория *</Text>
          <View style={styles.categoryGrid}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryButton,
                  category === cat.value && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat.value)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  category === cat.value && styles.categoryTextActive,
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Связанный цикл</Text>
          <RNTextInput
            style={styles.input}
            placeholder="Не связана"
            placeholderTextColor={NordColors.polarNight.nord3}
            value={cycleId}
            onChangeText={setCycleId}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Текст заметки *</Text>
          <RNTextInput
            style={[styles.input, styles.textInput]}
            placeholder="Сегодня добавил 2кг на скамье! Чувствую себя супер..."
            placeholderTextColor={NordColors.polarNight.nord3}
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={8}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Дата</Text>
          <View style={styles.dateDisplay}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Сохранение...' : 'Сохранить заметку'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.frost.nord8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryButton: {
    width: '48%',
    margin: '1%',
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: NordColors.polarNight.nord3,
  },
  categoryButtonActive: {
    borderColor: NordColors.frost.nord9,
    backgroundColor: NordColors.polarNight.nord2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  textInput: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  dateDisplay: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  dateText: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  actions: {
    marginTop: 24,
    marginBottom: 40,
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

export default LogNoteScreen;
