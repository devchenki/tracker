import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput as RNTextInput, Alert } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import TabletService from '../../services/TabletService';
import KnowledgeBaseService from '../../services/KnowledgeBaseService';
import { useNavigation } from '@react-navigation/native';

const LogTabletScreen: React.FC = () => {
  const navigation = useNavigation();
  const [compound, setCompound] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [cycleId, setCycleId] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCompoundDropdown, setShowCompoundDropdown] = useState(false);

  const compounds = KnowledgeBaseService.getAllCompounds();
  const oralCompounds = compounds.filter(c => c.category === 'Orals');

  const setCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };

  const handleSave = async () => {
    if (!compound || !dosage) {
      Alert.alert('Ошибка', 'Заполните обязательные поля');
      return;
    }

    setLoading(true);
    try {
      await TabletService.logTablet({
        compound,
        dosage: parseFloat(dosage),
        unit: 'mg',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: time || new Date().toTimeString().slice(0, 5),
        cycleId: cycleId || undefined,
        notes: notes || undefined,
      });

      Alert.alert('Успех', 'Таблетка записана ✓', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить таблетку');
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
        <Text style={styles.title}>Записать таблетку</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Таблетка *</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCompoundDropdown(!showCompoundDropdown)}
          >
            <Text style={[styles.dropdownText, !compound && styles.placeholder]}>
              {compound || 'Выберите таблетку'}
            </Text>
            <Text style={styles.dropdownIcon}>{showCompoundDropdown ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          
          {showCompoundDropdown && (
            <View style={styles.dropdownMenu}>
              {oralCompounds.map(c => (
                <TouchableOpacity
                  key={c.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCompound(c.name);
                    setShowCompoundDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{c.name}</Text>
                  <Text style={styles.dropdownItemSubtext}>{c.dosage}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Дозировка (мг) *</Text>
          <RNTextInput
            style={styles.input}
            placeholder="50"
            placeholderTextColor={NordColors.polarNight.nord3}
            value={dosage}
            onChangeText={setDosage}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Время приема</Text>
          <View style={styles.timeRow}>
            <TouchableOpacity style={styles.timeButton} onPress={setCurrentTime}>
              <Text style={styles.timeButtonText}>Сейчас</Text>
            </TouchableOpacity>
            <RNTextInput
              style={[styles.input, styles.timeInput]}
              placeholder="18:00"
              placeholderTextColor={NordColors.polarNight.nord3}
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Связанный цикл</Text>
          <RNTextInput
            style={styles.input}
            placeholder="Вне цикла"
            placeholderTextColor={NordColors.polarNight.nord3}
            value={cycleId}
            onChangeText={setCycleId}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Заметки</Text>
          <RNTextInput
            style={[styles.input, styles.notesInput]}
            placeholder="С едой / Натощак / На ночь..."
            placeholderTextColor={NordColors.polarNight.nord3}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Сохранение...' : 'Записать таблетку'}
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
  placeholder: {
    color: NordColors.polarNight.nord3,
  },
  dropdown: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  dropdownText: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  dropdownIcon: {
    fontSize: 12,
    color: NordColors.frost.nord9,
  },
  dropdownMenu: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  dropdownItemText: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: NordColors.polarNight.nord3,
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },
  timeButtonText: {
    color: NordColors.polarNight.nord0,
    fontSize: 16,
    fontWeight: '600',
  },
  timeInput: {
    flex: 1,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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

export default LogTabletScreen;
