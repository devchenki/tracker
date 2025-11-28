import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { Button } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CoursesService from '../../services/CoursesService';
import { Cycle } from '../../types/dashboard';

type FilterType = 'all' | 'active' | 'completed' | 'planned';

const CoursesScreen = ({ navigation }: any) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [filteredCycles, setFilteredCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadCycles = useCallback(async () => {
    try {
      const data = await CoursesService.getAllCycles();
      setCycles(data);
      applyFilters(data, filter, searchQuery);
    } catch (error) {
      console.error('Failed to load cycles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter, searchQuery]);

  useEffect(() => {
    loadCycles();
  }, []);

  useEffect(() => {
    applyFilters(cycles, filter, searchQuery);
  }, [filter, searchQuery, cycles]);

  const applyFilters = (data: Cycle[], currentFilter: FilterType, query: string) => {
    let filtered = data;

    if (currentFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === currentFilter);
    }

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(lowerQuery));
    }

    setFilteredCycles(filtered);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCycles();
  }, [loadCycles]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return NordColors.aurora.nord14;
      case 'completed':
        return NordColors.frost.nord8;
      case 'planned':
        return NordColors.frost.nord9;
      default:
        return NordColors.snowStorm.nord4;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активный';
      case 'completed':
        return 'Завершен';
      case 'planned':
        return 'Запланирован';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const renderCycleCard = (cycle: Cycle) => {
    return (
      <TouchableOpacity
        key={cycle.id}
        onPress={() => navigation.navigate('CourseDetailScreen', { courseId: cycle.id })}
      >
        <Card style={styles.cycleCard}>
          <CardContent>
            <View style={styles.cardHeader}>
              <Text style={styles.cycleName}>{cycle.name}</Text>
              <View style={{ ...styles.statusBadge, backgroundColor: getStatusColor(cycle.status) }}>
                <Text style={styles.statusText}>{getStatusLabel(cycle.status)}</Text>
              </View>
            </View>

            <View style={styles.dateRow}>
              <Icon name="calendar-start" size={16} color={NordColors.snowStorm.nord4} />
              <Text style={styles.dateText}>
                {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Прогресс</Text>
                <Text style={styles.progressPercent}>{cycle.progress}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={{ ...styles.progressBar, width: `${cycle.progress}%` }} />
              </View>
            </View>

            <View style={styles.injectionsRow}>
              <Icon name="needle" size={16} color={NordColors.snowStorm.nord4} />
              <Text style={styles.injectionsText}>
                Инъекции: {cycle.completedInjections} из {cycle.injections}
              </Text>
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="clipboard-text-outline" size={64} color={NordColors.polarNight.nord3} />
        <Text style={styles.emptyTitle}>Нет циклов</Text>
        <Text style={styles.emptySubtitle}>Создайте свой первый цикл</Text>
        <Button
          onPress={() => console.log('Create cycle')}
          style={styles.emptyButton}
        >
          <Text style={styles.buttonText}>Создать цикл</Text>
        </Button>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={NordColors.frost.nord9} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Циклы</Text>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => console.log('Create new cycle')}
          >
            <Icon name="plus" size={24} color={NordColors.snowStorm.nord6} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={20}
            color={NordColors.snowStorm.nord4}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск по названию"
            placeholderTextColor={NordColors.polarNight.nord3}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={NordColors.snowStorm.nord4} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={{
              ...styles.filterChip,
              ...(filter === 'all' ? styles.filterChipActive : {}),
            }}
            onPress={() => setFilter('all')}
          >
            <Text
              style={{
                ...styles.filterChipText,
                ...(filter === 'all' ? styles.filterChipTextActive : {}),
              }}
            >
              Все
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.filterChip,
              ...(filter === 'active' ? styles.filterChipActive : {}),
            }}
            onPress={() => setFilter('active')}
          >
            <Text
              style={{
                ...styles.filterChipText,
                ...(filter === 'active' ? styles.filterChipTextActive : {}),
              }}
            >
              Активные
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.filterChip,
              ...(filter === 'completed' ? styles.filterChipActive : {}),
            }}
            onPress={() => setFilter('completed')}
          >
            <Text
              style={{
                ...styles.filterChipText,
                ...(filter === 'completed' ? styles.filterChipTextActive : {}),
              }}
            >
              Завершенные
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.filterChip,
              ...(filter === 'planned' ? styles.filterChipActive : {}),
            }}
            onPress={() => setFilter('planned')}
          >
            <Text
              style={{
                ...styles.filterChipText,
                ...(filter === 'planned' ? styles.filterChipTextActive : {}),
              }}
            >
              Запланированные
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={NordColors.frost.nord9}
          />
        }
      >
        {filteredCycles.length === 0 ? (
          renderEmptyState()
        ) : (
          filteredCycles.map(renderCycleCard)
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: NordColors.polarNight.nord0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord6,
  },
  newButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: NordColors.frost.nord9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: NordColors.snowStorm.nord6,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: NordColors.polarNight.nord1,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord2,
  },
  filterChipActive: {
    backgroundColor: NordColors.frost.nord9,
    borderColor: NordColors.frost.nord9,
  },
  filterChipText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
  filterChipTextActive: {
    color: NordColors.snowStorm.nord6,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  cycleCard: {
    backgroundColor: NordColors.polarNight.nord1,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cycleName: {
    fontSize: 20,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: NordColors.frost.nord9,
    borderRadius: 4,
  },
  injectionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  injectionsText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: NordColors.frost.nord9,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: NordColors.snowStorm.nord6,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});

export default CoursesScreen;
