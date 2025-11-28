import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import { useNavigation } from '@react-navigation/native';
import AchievementsService, { Achievement, AchievementCategory } from '../../services/AchievementsService';

const AllAchievementsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({ total: 0, unlocked: 0, points: 0, totalPoints: 0 });
  const [filter, setFilter] = useState<'All' | 'Unlocked' | 'Locked'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | AchievementCategory>('All');

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const data = await AchievementsService.getAchievements();
    const statsData = await AchievementsService.getStats();
    setAchievements(data);
    setStats(statsData);
  };

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'Unlocked' && !a.unlocked) return false;
    if (filter === 'Locked' && a.unlocked) return false;
    if (categoryFilter !== 'All' && a.category !== categoryFilter) return false;
    return true;
  });

  const getAchievementsByCategory = (category: AchievementCategory) => {
    return filteredAchievements.filter(a => a.category === category);
  };

  const progressPercent = Math.round((stats.unlocked / stats.total) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Все достижения</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{stats.total}</Text>
            <Text style={styles.summaryLabel}>Всего</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: NordColors.aurora.nord14 }]}>
              {stats.unlocked} ✓
            </Text>
            <Text style={styles.summaryLabel}>Разблокировано</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {stats.points}/{stats.totalPoints}
            </Text>
            <Text style={styles.summaryLabel}>Очков</Text>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>Прогресс: {progressPercent}%</Text>
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['All', 'Unlocked', 'Locked'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
                {f === 'All' ? 'Все' : f === 'Unlocked' ? 'Разблокированные' : 'Заблокированные'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {categoryFilter === 'All' ? (
          <>
            {(['Injections', 'Labs', 'Cycles', 'Consistency', 'Milestones'] as AchievementCategory[]).map(cat => {
              const categoryAchievements = getAchievementsByCategory(cat);
              if (categoryAchievements.length === 0) return null;

              return (
                <View key={cat} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>
                    {cat === 'Injections' ? '💉 ИНЪЕКЦИИ' :
                     cat === 'Labs' ? '🧪 ЛАБОРАТОРНЫЕ' :
                     cat === 'Cycles' ? '🔄 ЦИКЛЫ' :
                     cat === 'Consistency' ? '🔥 ПОСЛЕДОВАТЕЛЬНОСТЬ' :
                     '🎖️ ВЕХИ'}
                  </Text>
                  {categoryAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.categorySection}>
            {filteredAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        )}

        {filteredAchievements.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Нет достижений</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const progressPercent = Math.round((achievement.progress / achievement.maxProgress) * 100);

  return (
    <View style={[
      styles.achievementCard,
      achievement.unlocked && styles.achievementCardUnlocked,
    ]}>
      <View style={styles.achievementHeader}>
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        <View style={styles.achievementInfo}>
          <Text style={styles.achievementName}>{achievement.name}</Text>
          <Text style={styles.achievementDescription}>{achievement.description}</Text>
        </View>
      </View>

      <View style={styles.achievementFooter}>
        <View style={styles.achievementStatus}>
          {achievement.unlocked ? (
            <Text style={styles.unlockedText}>✓ UNLOCKED</Text>
          ) : (
            <>
              <Text style={styles.lockedText}>🔒 LOCKED</Text>
              {achievement.progress > 0 && (
                <View style={styles.progressInfo}>
                  <View style={styles.miniProgressBar}>
                    <View style={[styles.miniProgressFill, { width: `${progressPercent}%` }]} />
                  </View>
                  <Text style={styles.progressDetailText}>
                    {achievement.progress}/{achievement.maxProgress} ({progressPercent}%)
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{achievement.points} pts</Text>
        </View>
      </View>

      {achievement.unlocked && achievement.unlockedDate && (
        <Text style={styles.unlockedDate}>
          Разблокировано: {new Date(achievement.unlockedDate).toLocaleDateString('ru-RU')}
        </Text>
      )}
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
  summaryCard: {
    backgroundColor: NordColors.polarNight.nord1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: NordColors.frost.nord9,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: NordColors.aurora.nord14,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
  },
  filters: {
    backgroundColor: NordColors.polarNight.nord1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: NordColors.polarNight.nord0,
    marginRight: 8,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  filterChipActive: {
    backgroundColor: NordColors.frost.nord9,
    borderColor: NordColors.frost.nord9,
  },
  filterChipText: {
    color: NordColors.snowStorm.nord4,
    fontSize: 14,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: NordColors.polarNight.nord0,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.frost.nord9,
    marginBottom: 12,
  },
  achievementCard: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: NordColors.polarNight.nord3,
  },
  achievementCardUnlocked: {
    borderColor: NordColors.aurora.nord14,
  },
  achievementHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  achievementIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: NordColors.snowStorm.nord5,
    lineHeight: 20,
  },
  achievementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementStatus: {
    flex: 1,
  },
  unlockedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: NordColors.aurora.nord14,
  },
  lockedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord5,
    marginBottom: 4,
  },
  progressInfo: {
    marginTop: 4,
  },
  miniProgressBar: {
    height: 4,
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: NordColors.aurora.nord14,
  },
  progressDetailText: {
    fontSize: 12,
    color: NordColors.snowStorm.nord5,
  },
  pointsBadge: {
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  unlockedDate: {
    fontSize: 11,
    color: NordColors.polarNight.nord3,
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: NordColors.polarNight.nord3,
  },
});

export default AllAchievementsScreen;
