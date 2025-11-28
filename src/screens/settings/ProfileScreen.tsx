import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const achievements = [
    { id: '1', icon: '🎯', name: 'First Shot', unlocked: true },
    { id: '2', icon: '💉', name: 'Streak 7', unlocked: true },
    { id: '3', icon: '🧪', name: 'Lab Scientist', unlocked: true },
    { id: '4', icon: '🔥', name: 'Week Warrior', unlocked: true },
    { id: '5', icon: '📊', name: 'Data Keeper', unlocked: true },
    { id: '6', icon: '💪', name: 'Century', unlocked: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Профиль</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Основные метрики</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>3</Text>
              <Text style={styles.metricLabel}>Циклов</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>47</Text>
              <Text style={styles.metricLabel}>Инъекций</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>156</Text>
              <Text style={styles.metricLabel}>Дней</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>12/24</Text>
              <Text style={styles.metricLabel}>Достижений</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Текущий прогресс</Text>
          <View style={styles.card}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Вес</Text>
              <View style={styles.progressValue}>
                <Text style={styles.progressMainText}>92 кг</Text>
                <Text style={styles.progressChangeText}>↑3 с начала года</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Bench</Text>
              <Text style={styles.progressMainText}>120 кг</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Squat</Text>
              <Text style={styles.progressMainText}>150 кг</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Deadlift</Text>
              <Text style={styles.progressMainText}>180 кг</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>% жира</Text>
              <View style={styles.progressValue}>
                <Text style={styles.progressMainText}>15%</Text>
                <Text style={styles.progressChangeText}>↓2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Последние достижения</Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate('AllAchievementsScreen')}>
              <Text style={styles.seeAllText}>Все →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.slice(0, 6).map(achievement => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementBadge,
                  !achievement.unlocked && styles.achievementBadgeLocked,
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementName,
                  !achievement.unlocked && styles.achievementNameLocked,
                ]}>
                  {achievement.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Статистика</Text>
          <View style={styles.card}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Самый активный день</Text>
              <Text style={styles.statValue}>Понедельник</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Самое долгое отслеживание</Text>
              <Text style={styles.statValue}>47 дней</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Средняя длительность цикла</Text>
              <Text style={styles.statValue}>12 недель</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => (navigation as any).navigate('EditProfileScreen')}
          >
            <Text style={styles.actionButtonText}>Редактировать профиль</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => (navigation as any).navigate('AllAchievementsScreen')}
          >
            <Text style={styles.actionButtonTextSecondary}>Мои достижения</Text>
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
  profileHeader: {
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: NordColors.aurora.nord14,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.frost.nord8,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  metricCard: {
    width: '48%',
    margin: '1%',
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: NordColors.frost.nord9,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
  card: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  progressValue: {
    alignItems: 'flex-end',
  },
  progressMainText: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  progressChangeText: {
    fontSize: 12,
    color: NordColors.aurora.nord14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: NordColors.polarNight.nord2,
    marginVertical: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  achievementBadge: {
    width: '31%',
    margin: '1%',
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: NordColors.aurora.nord14,
  },
  achievementBadgeLocked: {
    borderColor: NordColors.polarNight.nord3,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 10,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: NordColors.polarNight.nord3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  actionButton: {
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  actionButtonSecondary: {
    backgroundColor: NordColors.polarNight.nord1,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
  },
});

export default ProfileScreen;
