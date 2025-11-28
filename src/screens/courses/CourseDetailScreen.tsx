import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { Button } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CoursesService from '../../services/CoursesService';
import InjectionsService from '../../services/InjectionsService';
import LabsService from '../../services/LabsService';
import { Cycle, Injection, LabResult } from '../../types/dashboard';

const CourseDetailScreen = ({ route, navigation }: any) => {
  const { courseId } = route.params;
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [injections, setInjections] = useState<Injection[]>([]);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [injectionsExpanded, setInjectionsExpanded] = useState(false);
  const [injectionFilter, setInjectionFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const loadCycleData = useCallback(async () => {
    try {
      const [cycleData, injectionsData, labsData] = await Promise.all([
        CoursesService.getCycleById(courseId),
        InjectionsService.getUpcomingInjections(),
        LabsService.getLatestResults(),
      ]);

      setCycle(cycleData);
      setInjections(injectionsData);
      setLabResults(labsData.slice(0, 3));
    } catch (error) {
      console.error('Failed to load cycle data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadCycleData();
  }, [loadCycleData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCycleData();
  }, [loadCycleData]);

  const handleDelete = () => {
    Alert.alert(
      'Удалить цикл',
      'Вы уверены, что хотите удалить этот цикл?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            await CoursesService.deleteCycle(courseId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleComplete = async () => {
    Alert.alert(
      'Завершить цикл',
      'Вы уверены, что хотите завершить этот цикл?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Завершить',
          onPress: async () => {
            await CoursesService.completeCycle(courseId);
            loadCycleData();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getDaysRemaining = () => {
    if (!cycle) return 0;
    const now = new Date();
    const end = new Date(cycle.endDate);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return Math.max(0, diff);
  };

  const getDaysPassed = () => {
    if (!cycle) return 0;
    const now = new Date();
    const start = new Date(cycle.startDate);
    const diff = Math.ceil((now.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return Math.max(0, diff);
  };

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

  const getFrequencyLabel = (frequency: string) => {
    const map: { [key: string]: string } = {
      'daily': 'Ежедневно',
      'eod': 'Через день',
      'weekly': '1x в неделю',
      '2x week': '2x в неделю',
    };
    return map[frequency] || frequency;
  };

  const filteredInjections = injections.filter((inj) => {
    if (injectionFilter === 'all') return true;
    if (injectionFilter === 'completed') return inj.status === 'completed';
    return inj.status !== 'completed';
  });

  const getInjectionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return NordColors.aurora.nord14;
      case 'overdue':
        return NordColors.aurora.nord11;
      case 'due':
        return NordColors.aurora.nord13;
      default:
        return NordColors.frost.nord9;
    }
  };

  const getInjectionStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Выполнено';
      case 'overdue':
        return 'Просрочено';
      case 'due':
        return 'Сегодня';
      default:
        return 'Запланировано';
    }
  };

  if (loading || !cycle) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={NordColors.frost.nord9} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={NordColors.snowStorm.nord6} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => console.log('Edit cycle')}
            >
              <Icon name="pencil" size={20} color={NordColors.snowStorm.nord6} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleDelete}>
              <Icon name="delete" size={20} color={NordColors.aurora.nord11} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{cycle.name}</Text>
        <View style={{ ...styles.statusBadge, backgroundColor: getStatusColor(cycle.status) }}>
          <Text style={styles.statusText}>{getStatusLabel(cycle.status)}</Text>
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
        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Основная информация</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Icon name="calendar-start" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.infoLabel}>Начало</Text>
                <Text style={styles.infoValue}>{formatDate(cycle.startDate)}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="calendar-end" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.infoLabel}>Конец</Text>
                <Text style={styles.infoValue}>{formatDate(cycle.endDate)}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Icon name="clock-outline" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.infoLabel}>Дней прошло</Text>
                <Text style={styles.infoValue}>{getDaysPassed()}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="clock-time-four-outline" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.infoLabel}>Дней осталось</Text>
                <Text style={styles.infoValue}>{getDaysRemaining()}</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Прогресс цикла</Text>
                <Text style={styles.progressPercent}>{cycle.progress}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={{ ...styles.progressBar, width: `${cycle.progress}%` }} />
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>Соединения</Text>
            <View style={styles.compoundsTable}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableHeaderText, flex: 2 }}>Соединение</Text>
                <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Дозировка</Text>
                <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Частота</Text>
              </View>
              {cycle.compounds.map((compound) => (
                <View key={compound.id} style={styles.tableRow}>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>{compound.name}</Text>
                  <Text style={{ ...styles.tableCell, flex: 1 }}>
                    {compound.dosage} {compound.unit}
                  </Text>
                  <Text style={{ ...styles.tableCell, flex: 1 }}>
                    {getFrequencyLabel(compound.frequency)}
                  </Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardContent>
            <Text style={styles.cardTitle}>График инъекций</Text>
            <View style={styles.scheduleContainer}>
              <View style={styles.scheduleLegend}>
                <View style={styles.legendItem}>
                  <View style={{ ...styles.legendDot, backgroundColor: NordColors.aurora.nord14 }} />
                  <Text style={styles.legendText}>Выполнено</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={{ ...styles.legendDot, backgroundColor: NordColors.polarNight.nord3 }} />
                  <Text style={styles.legendText}>Запланировано</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={{ ...styles.legendDot, backgroundColor: NordColors.aurora.nord11 }} />
                  <Text style={styles.legendText}>Пропущено</Text>
                </View>
              </View>
              <View style={styles.scheduleGrid}>
                {Array.from({ length: cycle.duration }).map((_, index) => {
                  let color = NordColors.polarNight.nord3;
                  if (index < getDaysPassed()) {
                    color =
                      index % 3 === 0 ? NordColors.aurora.nord14 : NordColors.polarNight.nord2;
                  }
                  return (
                    <View
                      key={index}
                      style={{ ...styles.scheduleDay, backgroundColor: color }}
                    />
                  );
                })}
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setInjectionsExpanded(!injectionsExpanded)}>
            <CardContent>
              <View style={styles.expandableHeader}>
                <Text style={styles.cardTitle}>Инъекции</Text>
                <Icon
                  name={injectionsExpanded ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={NordColors.snowStorm.nord6}
                />
              </View>
            </CardContent>
          </TouchableOpacity>

          {injectionsExpanded && (
            <CardContent>
              <View style={styles.injectionFilterContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.injectionFilterChip,
                    ...(injectionFilter === 'all' ? styles.injectionFilterChipActive : {}),
                  }}
                  onPress={() => setInjectionFilter('all')}
                >
                  <Text
                    style={{
                      ...styles.injectionFilterText,
                      ...(injectionFilter === 'all' ? styles.injectionFilterTextActive : {}),
                    }}
                  >
                    Все
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.injectionFilterChip,
                    ...(injectionFilter === 'completed' ? styles.injectionFilterChipActive : {}),
                  }}
                  onPress={() => setInjectionFilter('completed')}
                >
                  <Text
                    style={{
                      ...styles.injectionFilterText,
                      ...(injectionFilter === 'completed' ? styles.injectionFilterTextActive : {}),
                    }}
                  >
                    Выполнено
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.injectionFilterChip,
                    ...(injectionFilter === 'pending' ? styles.injectionFilterChipActive : {}),
                  }}
                  onPress={() => setInjectionFilter('pending')}
                >
                  <Text
                    style={{
                      ...styles.injectionFilterText,
                      ...(injectionFilter === 'pending' ? styles.injectionFilterTextActive : {}),
                    }}
                  >
                    Запланировано
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.injectionsList}>
                {filteredInjections.length === 0 ? (
                  <Text style={styles.noInjectionsText}>Нет инъекций</Text>
                ) : (
                  filteredInjections.map((injection) => (
                    <TouchableOpacity
                      key={injection.id}
                      style={styles.injectionItem}
                      onPress={() => console.log('View injection', injection.id)}
                    >
                      <View style={styles.injectionLeft}>
                        <Text style={styles.injectionDate}>
                          {formatDate(injection.scheduledDate)}
                        </Text>
                        <Text style={styles.injectionCompound}>{injection.compound}</Text>
                        <Text style={styles.injectionDosage}>
                          {injection.dosage} {injection.unit}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.injectionStatusBadge,
                          backgroundColor: getInjectionStatusColor(injection.status),
                        }}
                      >
                        <Text style={styles.injectionStatusText}>
                          {getInjectionStatusLabel(injection.status)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </CardContent>
          )}
        </Card>

        <Card style={styles.card}>
          <CardContent>
            <View style={styles.labResultsHeader}>
              <Text style={styles.cardTitle}>Лабораторные результаты</Text>
              <TouchableOpacity onPress={() => console.log('View all labs')}>
                <Text style={styles.viewAllText}>Все результаты</Text>
              </TouchableOpacity>
            </View>
            {labResults.length === 0 ? (
              <Text style={styles.noLabsText}>Нет результатов</Text>
            ) : (
              labResults.map((result) => (
                <View key={result.id} style={styles.labResultItem}>
                  <View style={styles.labResultLeft}>
                    <Text style={styles.labResultName}>{result.testName}</Text>
                    <Text style={styles.labResultDate}>{formatDate(result.date)}</Text>
                  </View>
                  <View style={styles.labResultRight}>
                    <Text style={styles.labResultValue}>
                      {result.value} {result.unit}
                    </Text>
                    <View
                      style={{
                        ...styles.labResultStatus,
                        backgroundColor:
                          result.status === 'normal'
                            ? NordColors.aurora.nord14
                            : result.status === 'warning'
                            ? NordColors.aurora.nord13
                            : NordColors.aurora.nord11,
                      }}
                    >
                      <Text style={styles.labResultStatusText}>
                        {result.status === 'normal'
                          ? 'Норма'
                          : result.status === 'warning'
                          ? 'Внимание'
                          : 'Критично'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </CardContent>
        </Card>

        <View style={styles.actionsContainer}>
          <Button
            onPress={() => console.log('Add injection')}
            style={styles.actionButton}
          >
            <Icon name="needle" size={20} color={NordColors.snowStorm.nord6} />
            <Text style={styles.actionButtonText}>Добавить инъекцию</Text>
          </Button>
          <Button
            onPress={() => console.log('Edit cycle')}
            style={styles.actionButtonOutline}
          >
            <Icon name="pencil" size={20} color={NordColors.frost.nord9} />
            <Text style={styles.actionButtonTextOutline}>Редактировать</Text>
          </Button>
          {cycle.status === 'active' && (
            <Button
              onPress={handleComplete}
              style={styles.actionButtonOutline}
            >
              <Icon name="check-circle" size={20} color={NordColors.aurora.nord14} />
              <Text style={styles.actionButtonTextOutline}>Завершить цикл</Text>
            </Button>
          )}
        </View>

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
    backgroundColor: NordColors.polarNight.nord1,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord6,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: NordColors.polarNight.nord1,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
  },
  progressContainer: {
    marginTop: 8,
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
  compoundsTable: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  tableCell: {
    fontSize: 14,
    color: NordColors.snowStorm.nord6,
  },
  scheduleContainer: {
    marginTop: 8,
  },
  scheduleLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  scheduleDay: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  injectionFilterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  injectionFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: NordColors.polarNight.nord2,
  },
  injectionFilterChipActive: {
    backgroundColor: NordColors.frost.nord9,
  },
  injectionFilterText: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
  },
  injectionFilterTextActive: {
    color: NordColors.snowStorm.nord6,
    fontWeight: '600',
  },
  injectionsList: {
    gap: 12,
  },
  noInjectionsText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
    paddingVertical: 16,
  },
  injectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 8,
  },
  injectionLeft: {
    flex: 1,
  },
  injectionDate: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    marginBottom: 4,
  },
  injectionCompound: {
    fontSize: 13,
    color: NordColors.snowStorm.nord4,
    marginBottom: 2,
  },
  injectionDosage: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
  },
  injectionStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  injectionStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  labResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  noLabsText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
    paddingVertical: 16,
  },
  labResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  labResultLeft: {
    flex: 1,
  },
  labResultName: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    marginBottom: 4,
  },
  labResultDate: {
    fontSize: 12,
    color: NordColors.snowStorm.nord4,
  },
  labResultRight: {
    alignItems: 'flex-end',
  },
  labResultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.snowStorm.nord6,
    marginBottom: 4,
  },
  labResultStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  labResultStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: NordColors.polarNight.nord0,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: NordColors.frost.nord9,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: NordColors.snowStorm.nord6,
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonOutline: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: NordColors.frost.nord9,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonTextOutline: {
    color: NordColors.frost.nord9,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});

export default CourseDetailScreen;
