import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { Button } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileService from '../../services/ProfileService';
import AchievementsService from '../../services/AchievementsService';
import { 
  UserProfile, 
  ProfileMetrics, 
  CurrentProgress, 
  ProfileStats 
} from '../../types/profile';
import { Achievement } from '../../types/achievements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [metrics, setMetrics] = useState<ProfileMetrics | null>(null);
  const [progress, setProgress] = useState<CurrentProgress | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const [profileData, metricsData, progressData, statsData, achievements] = await Promise.all([
      ProfileService.getUserProfile(),
      ProfileService.getProfileMetrics(),
      ProfileService.getCurrentProgress(),
      ProfileService.getProfileStats(),
      AchievementsService.getRecentAchievements(6),
    ]);

    setProfile(profileData);
    setMetrics(metricsData);
    setProgress(progressData);
    setStats(statsData);
    setRecentAchievements(achievements);
  };

  if (!profile || !metrics || !progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' ? NordColors.aurora.nord14 : NordColors.aurora.nord13;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <CardContent>
          <View style={styles.headerContent}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>
                {profile.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(profile.status) }]} />
              <Text style={styles.statusText}>{profile.status}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Text style={styles.sectionTitle}>ОСНОВНЫЕ МЕТРИКИ</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Card style={styles.card}>
            <CardContent>
              <Icon name="sync" size={32} color={NordColors.frost.nord9} />
              <Text style={styles.metricValue}>{metrics.totalCycles}</Text>
              <Text style={styles.metricLabel}>Циклов</Text>
            </CardContent>
          </Card>
        </View>
        <View style={styles.metricCard}>
          <Card style={styles.card}>
            <CardContent>
              <Icon name="needle" size={32} color={NordColors.frost.nord8} />
              <Text style={styles.metricValue}>{metrics.totalInjections}</Text>
              <Text style={styles.metricLabel}>Инъекций</Text>
            </CardContent>
          </Card>
        </View>
        <View style={styles.metricCard}>
          <Card style={styles.card}>
            <CardContent>
              <Icon name="calendar-check" size={32} color={NordColors.frost.nord7} />
              <Text style={styles.metricValue}>{metrics.trackingDays}</Text>
              <Text style={styles.metricLabel}>Дней отслеживания</Text>
            </CardContent>
          </Card>
        </View>
        <View style={styles.metricCard}>
          <Card style={styles.card}>
            <CardContent>
              <Icon name="trophy" size={32} color={NordColors.aurora.nord13} />
              <Text style={styles.metricValue}>
                {metrics.achievementsUnlocked}/{metrics.totalAchievements}
              </Text>
              <Text style={styles.metricLabel}>Достижений</Text>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* Current Progress */}
      <Text style={styles.sectionTitle}>ТЕКУЩИЙ ПРОГРЕСС</Text>
      <Card style={styles.card}>
        <CardContent>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Вес:</Text>
            <View style={styles.progressValue}>
              <Text style={styles.progressText}>{progress.weight} кг</Text>
              {progress.weightChange !== 0 && (
                <View style={styles.changeBadge}>
                  <Icon 
                    name={progress.weightChange > 0 ? 'arrow-up' : 'arrow-down'} 
                    size={14} 
                    color={progress.weightChange > 0 ? NordColors.aurora.nord14 : NordColors.aurora.nord11} 
                  />
                  <Text style={{
                    ...styles.changeText,
                    color: progress.weightChange > 0 ? NordColors.aurora.nord14 : NordColors.aurora.nord11
                  }}>
                    {Math.abs(progress.weightChange)}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.strengthTitle}>Силовые показатели:</Text>
          <View style={styles.strengthRow}>
            <View style={styles.strengthItem}>
              <Text style={styles.strengthLabel}>Bench</Text>
              <Text style={styles.strengthValue}>{progress.benchPress} кг</Text>
            </View>
            <View style={styles.strengthItem}>
              <Text style={styles.strengthLabel}>Squat</Text>
              <Text style={styles.strengthValue}>{progress.squat} кг</Text>
            </View>
            <View style={styles.strengthItem}>
              <Text style={styles.strengthLabel}>Deadlift</Text>
              <Text style={styles.strengthValue}>{progress.deadlift} кг</Text>
            </View>
          </View>

          {progress.bodyFat !== undefined && (
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Процент жира:</Text>
              <View style={styles.progressValue}>
                <Text style={styles.progressText}>{progress.bodyFat}%</Text>
                {progress.bodyFatChange !== undefined && progress.bodyFatChange !== 0 && (
                  <View style={styles.changeBadge}>
                    <Icon 
                      name={progress.bodyFatChange > 0 ? 'arrow-up' : 'arrow-down'} 
                      size={14} 
                      color={progress.bodyFatChange < 0 ? NordColors.aurora.nord14 : NordColors.aurora.nord11} 
                    />
                    <Text style={{
                      ...styles.changeText,
                      color: progress.bodyFatChange < 0 ? NordColors.aurora.nord14 : NordColors.aurora.nord11
                    }}>
                      {Math.abs(progress.bodyFatChange)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </CardContent>
      </Card>

      {/* Achievements Showcase */}
      <View style={styles.achievementsHeader}>
        <Text style={styles.sectionTitle}>ДОСТИЖЕНИЯ</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllAchievements')}>
          <Text style={styles.seeAllText}>Все</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.achievementsGrid}>
        {recentAchievements.map((achievement) => (
          <TouchableOpacity 
            key={achievement.id} 
            style={styles.achievementItem}
            onPress={() => navigation.navigate('AllAchievements')}
          >
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
            </View>
            <Text style={styles.achievementTitle} numberOfLines={2}>
              {achievement.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Statistics */}
      {stats && (
        <>
          <Text style={styles.sectionTitle}>СТАТИСТИКА</Text>
          <Card style={styles.card}>
            <CardContent>
              <View style={styles.statRow}>
                <Icon name="calendar-star" size={24} color={NordColors.frost.nord9} />
                <Text style={styles.statLabel}>Самый активный день</Text>
                <Text style={styles.statValue}>{stats.mostActiveDay}</Text>
              </View>
              <View style={styles.statRow}>
                <Icon name="fire" size={24} color={NordColors.aurora.nord12} />
                <Text style={styles.statLabel}>Самая долгая серия</Text>
                <Text style={styles.statValue}>{stats.longestStreak} дней</Text>
              </View>
              <View style={styles.statRow}>
                <Icon name="chart-timeline-variant" size={24} color={NordColors.frost.nord8} />
                <Text style={styles.statLabel}>Средняя длительность цикла</Text>
                <Text style={styles.statValue}>{stats.averageCycleLength} недель</Text>
              </View>
            </CardContent>
          </Card>
        </>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <Button 
          variant="primary" 
          fullWidth 
          onPress={() => navigation.navigate('EditProfile')}
        >
          Редактировать профиль
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onPress={() => navigation.navigate('AllAchievements')}
        >
          Мои достижения
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
  headerCard: {
    margin: 16,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: NordColors.frost.nord9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarLargeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: NordColors.polarNight.nord2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  metricCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    padding: 8,
  },
  card: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 13,
    color: NordColors.polarNight.nord3,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  progressValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
    marginRight: 8,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: NordColors.polarNight.nord2,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  strengthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
    marginBottom: 12,
  },
  strengthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  strengthItem: {
    flex: 1,
    alignItems: 'center',
  },
  strengthLabel: {
    fontSize: 13,
    color: NordColors.polarNight.nord3,
    marginBottom: 4,
  },
  strengthValue: {
    fontSize: 18,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  achievementItem: {
    width: (SCREEN_WIDTH - 64) / 3,
    alignItems: 'center',
    padding: 8,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: NordColors.polarNight.nord1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementTitle: {
    fontSize: 11,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    flex: 1,
    fontSize: 15,
    color: NordColors.snowStorm.nord4,
    marginLeft: 12,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  buttonsContainer: {
    padding: 16,
    gap: 12,
  },
  footer: {
    height: 20,
  },
});

export default ProfileScreen;
