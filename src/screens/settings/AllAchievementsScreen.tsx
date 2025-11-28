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
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AchievementsService from '../../services/AchievementsService';
import { Achievement, AchievementsSummary, AchievementCategoryType } from '../../types/achievements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type FilterType = 'all' | 'unlocked' | 'locked';

const AllAchievementsScreen = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [summary, setSummary] = useState<AchievementsSummary | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategoryType | 'ALL'>('ALL');

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const [achievementsData, summaryData] = await Promise.all([
      AchievementsService.getAllAchievements(),
      AchievementsService.getAchievementsSummary(),
    ]);

    setAchievements(achievementsData);
    setSummary(summaryData);
  };

  const getFilteredAchievements = () => {
    let filtered = achievements;

    // Filter by status
    if (filter === 'unlocked') {
      filtered = filtered.filter(a => a.status === 'UNLOCKED');
    } else if (filter === 'locked') {
      filtered = filtered.filter(a => a.status === 'LOCKED');
    }

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    return filtered;
  };

  const groupAchievementsByCategory = (achievementsToGroup: Achievement[]) => {
    const grouped: { [key in AchievementCategoryType]?: Achievement[] } = {};
    
    achievementsToGroup.forEach(achievement => {
      if (!grouped[achievement.category]) {
        grouped[achievement.category] = [];
      }
      grouped[achievement.category]!.push(achievement);
    });

    return grouped;
  };

  const getCategoryName = (category: AchievementCategoryType) => {
    const names = {
      INJECTIONS: 'Инъекции',
      LABS: 'Лабораторные',
      CYCLES: 'Циклы',
      CONSISTENCY: 'Последовательность',
      MILESTONES: 'Вехи',
    };
    return names[category];
  };

  const getCategoryIcon = (category: AchievementCategoryType) => {
    const icons = {
      INJECTIONS: 'needle',
      LABS: 'flask',
      CYCLES: 'sync',
      CONSISTENCY: 'fire',
      MILESTONES: 'star',
    };
    return icons[category];
  };

  const filteredAchievements = getFilteredAchievements();
  const groupedAchievements = groupAchievementsByCategory(filteredAchievements);

  return (
    <ScrollView style={styles.container}>
      {/* Summary */}
      {summary && (
        <Card style={styles.summaryCard}>
          <CardContent>
            <Text style={styles.summaryTitle}>Прогресс достижений</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{summary.totalAchievements}</Text>
                <Text style={styles.summaryLabel}>Всего</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={{ ...styles.summaryValue, color: NordColors.aurora.nord14 }}>
                  {summary.unlockedAchievements}
                </Text>
                <Text style={styles.summaryLabel}>Разблокировано</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {summary.totalPoints.toLocaleString()}
                </Text>
                <Text style={styles.summaryLabel}>Очков</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={{ ...styles.summaryValue, color: NordColors.frost.nord9 }}>
                  {summary.progressPercentage}%
                </Text>
                <Text style={styles.summaryLabel}>Прогресс</Text>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${summary.progressPercentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {summary.totalPoints.toLocaleString()} / {summary.maxPoints.toLocaleString()} очков
              </Text>
            </View>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={filter === 'all' ? {...styles.filterChipText, ...styles.filterChipTextActive} : styles.filterChipText}>
              Все
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'unlocked' && styles.filterChipActive]}
            onPress={() => setFilter('unlocked')}
          >
            <Icon 
              name="check-circle" 
              size={16} 
              color={filter === 'unlocked' ? NordColors.snowStorm.nord6 : NordColors.polarNight.nord3} 
            />
            <Text style={filter === 'unlocked' ? {...styles.filterChipText, ...styles.filterChipTextActive} : styles.filterChipText}>
              Разблокированные
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'locked' && styles.filterChipActive]}
            onPress={() => setFilter('locked')}
          >
            <Icon 
              name="lock" 
              size={16} 
              color={filter === 'locked' ? NordColors.snowStorm.nord6 : NordColors.polarNight.nord3} 
            />
            <Text style={filter === 'locked' ? {...styles.filterChipText, ...styles.filterChipTextActive} : styles.filterChipText}>
              Заблокированные
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Category Filters */}
      <View style={styles.categoryFiltersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === 'ALL' && styles.categoryChipActive]}
            onPress={() => setSelectedCategory('ALL')}
          >
            <Text style={selectedCategory === 'ALL' ? {...styles.categoryChipText, ...styles.categoryChipTextActive} : styles.categoryChipText}>
              Все категории
            </Text>
          </TouchableOpacity>
          {(['INJECTIONS', 'LABS', 'CYCLES', 'CONSISTENCY', 'MILESTONES'] as AchievementCategoryType[]).map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Icon 
                name={getCategoryIcon(cat)} 
                size={16} 
                color={selectedCategory === cat ? NordColors.snowStorm.nord6 : NordColors.frost.nord9} 
              />
              <Text style={selectedCategory === cat ? {...styles.categoryChipText, ...styles.categoryChipTextActive} : styles.categoryChipText}>
                {getCategoryName(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Achievements by Category */}
      {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
        <View key={category}>
          <View style={styles.categoryHeader}>
            <Icon 
              name={getCategoryIcon(category as AchievementCategoryType)} 
              size={24} 
              color={NordColors.frost.nord9} 
            />
            <Text style={styles.categoryTitle}>
              {getCategoryName(category as AchievementCategoryType)}
            </Text>
            <Text style={styles.categoryCount}>
              {categoryAchievements.filter(a => a.status === 'UNLOCKED').length} / {categoryAchievements.length}
            </Text>
          </View>

          {categoryAchievements.map(achievement => (
            <Card key={achievement.id} style={styles.achievementCard}>
              <CardContent>
                <View style={styles.achievementContent}>
                  <View style={[
                    styles.achievementIcon,
                    achievement.status === 'LOCKED' && styles.achievementIconLocked
                  ]}>
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  </View>
                  
                  <View style={styles.achievementInfo}>
                    <View style={styles.achievementHeader}>
                      <Text style={achievement.status === 'LOCKED' ? {...styles.achievementTitle, ...styles.achievementTitleLocked} : styles.achievementTitle}>
                        {achievement.title}
                      </Text>
                      {achievement.status === 'UNLOCKED' ? (
                        <Icon name="check-circle" size={20} color={NordColors.aurora.nord14} />
                      ) : (
                        <Icon name="lock" size={20} color={NordColors.polarNight.nord3} />
                      )}
                    </View>
                    
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                    
                    <View style={styles.achievementFooter}>
                      <View style={styles.pointsBadge}>
                        <Icon name="star" size={14} color={NordColors.aurora.nord13} />
                        <Text style={styles.pointsText}>{achievement.points} pts</Text>
                      </View>
                      
                      {achievement.unlockedDate && (
                        <Text style={styles.unlockedDate}>
                          {new Date(achievement.unlockedDate).toLocaleDateString('ru-RU')}
                        </Text>
                      )}
                    </View>

                    {/* Progress Bar for Locked Achievements */}
                    {achievement.status === 'LOCKED' && achievement.maxProgress && (
                      <View style={styles.achievementProgressContainer}>
                        <View style={styles.achievementProgressBar}>
                          <View 
                            style={[
                              styles.achievementProgressFill,
                              { width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }
                            ]}
                          />
                        </View>
                        <Text style={styles.achievementProgressText}>
                          {achievement.progress} / {achievement.maxProgress} (
                          {Math.round(((achievement.progress || 0) / achievement.maxProgress) * 100)}%)
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      ))}

      {filteredAchievements.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="trophy-outline" size={64} color={NordColors.polarNight.nord3} />
          <Text style={styles.emptyStateText}>Нет достижений</Text>
        </View>
      )}

      {/* Leaderboard teaser */}
      <Card style={styles.leaderboardCard}>
        <CardContent>
          <View style={styles.leaderboardContent}>
            <Icon name="trophy" size={48} color={NordColors.aurora.nord13} />
            <Text style={styles.leaderboardTitle}>Вы на вершине! 🏆</Text>
            <Text style={styles.leaderboardText}>
              Продолжайте отслеживать свой прогресс и разблокируйте все достижения
            </Text>
          </View>
        </CardContent>
      </Card>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
  },
  summaryLabel: {
    fontSize: 12,
    color: NordColors.polarNight.nord3,
    marginTop: 4,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: NordColors.aurora.nord14,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: NordColors.polarNight.nord3,
    textAlign: 'center',
    marginTop: 8,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: NordColors.polarNight.nord1,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: NordColors.frost.nord9,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.polarNight.nord3,
    marginLeft: 4,
  },
  filterChipTextActive: {
    color: NordColors.snowStorm.nord6,
  },
  categoryFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: NordColors.polarNight.nord1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: NordColors.frost.nord9,
  },
  categoryChipActive: {
    backgroundColor: NordColors.frost.nord9,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: NordColors.frost.nord9,
    marginLeft: 4,
  },
  categoryChipTextActive: {
    color: NordColors.snowStorm.nord6,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: NordColors.polarNight.nord1,
    marginBottom: 8,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
    marginLeft: 12,
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord9,
  },
  achievementCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  achievementContent: {
    flexDirection: 'row',
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: NordColors.polarNight.nord2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  achievementTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
  },
  achievementTitleLocked: {
    color: NordColors.polarNight.nord3,
  },
  achievementDescription: {
    fontSize: 14,
    color: NordColors.polarNight.nord3,
    marginBottom: 8,
  },
  achievementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: NordColors.polarNight.nord2,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.aurora.nord13,
    marginLeft: 4,
  },
  unlockedDate: {
    fontSize: 12,
    color: NordColors.aurora.nord14,
    fontWeight: '600',
  },
  achievementProgressContainer: {
    marginTop: 12,
  },
  achievementProgressBar: {
    height: 6,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: NordColors.aurora.nord14,
    borderRadius: 3,
  },
  achievementProgressText: {
    fontSize: 11,
    color: NordColors.polarNight.nord3,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: NordColors.polarNight.nord3,
    marginTop: 16,
  },
  leaderboardCard: {
    margin: 16,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  leaderboardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: NordColors.snowStorm.nord4,
    marginTop: 16,
    marginBottom: 8,
  },
  leaderboardText: {
    fontSize: 14,
    color: NordColors.polarNight.nord3,
    textAlign: 'center',
  },
  footer: {
    height: 20,
  },
});

export default AllAchievementsScreen;
