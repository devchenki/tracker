import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { Button } from '../../components/ui';
import { LineChart } from 'react-native-gifted-charts';
import { useAuth } from '../../contexts/AuthContext';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CoursesService from '../../services/CoursesService';
import InjectionsService from '../../services/InjectionsService';
import LabsService from '../../services/LabsService';
import HealthMetricsService from '../../services/HealthMetricsService';

import { 
  Cycle, 
  Injection, 
  LabResult, 
  HealthMetrics,
  WeightDataPoint,
  HormoneDataPoint,
} from '../../types/dashboard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [nextInjection, setNextInjection] = useState<Injection | null>(null);
  const [latestLabResults, setLatestLabResults] = useState<LabResult[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightDataPoint[]>([]);
  const [hormoneHistory, setHormoneHistory] = useState<HormoneDataPoint[]>([]);

  const loadDashboardData = useCallback(async () => {
    try {
      const [cycle, injection, labs, metrics, weight, hormones] = await Promise.all([
        CoursesService.getActiveCycle(),
        InjectionsService.getNextInjection(),
        LabsService.getLatestLabResults(3),
        HealthMetricsService.getHealthMetrics(),
        HealthMetricsService.getWeightHistory(30),
        LabsService.getHormoneHistory(90),
      ]);

      setActiveCycle(cycle);
      setNextInjection(injection);
      setLatestLabResults(labs);
      setHealthMetrics(metrics);
      setWeightHistory(weight);
      setHormoneHistory(hormones);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboardData();
  }, [loadDashboardData]);

  const getTimeUntilInjection = (injection: Injection) => {
    const now = new Date();
    const scheduledDateTime = new Date(`${injection.scheduledDate}T${injection.scheduledTime}`);
    const diffMs = scheduledDateTime.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours <= 0) {
      return 'Время!';
    } else if (diffHours < 24) {
      return `Через ${diffHours} ч`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `Через ${diffDays} д`;
    }
  };

  const getStatusColor = (status: 'normal' | 'warning' | 'critical') => {
    switch (status) {
      case 'normal':
        return NordColors.aurora.nord14;
      case 'warning':
        return NordColors.aurora.nord13;
      case 'critical':
        return NordColors.aurora.nord11;
      default:
        return NordColors.frost.nord9;
    }
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor={NordColors.frost.nord9}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Привет, {user?.name || 'Пользователь'}!</Text>
            <Text style={styles.date}>{formatDate()}</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Icon name="account-circle" size={48} color={NordColors.frost.nord9} />
          </TouchableOpacity>
        </View>
      </View>

      {activeCycle && (
        <Card style={styles.card}>
          <CardTitle title="Активный цикл" />
          <CardContent>
            <Text style={styles.cycleName}>{activeCycle.name}</Text>
            <View style={styles.cycleProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${activeCycle.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{activeCycle.progress}%</Text>
            </View>
            <View style={styles.cycleDetails}>
              <Text style={styles.cycleDetailText}>
                День {activeCycle.currentDay} из {activeCycle.totalDays}
              </Text>
              <Text style={styles.cycleDetailText}>
                {activeCycle.totalDays - activeCycle.currentDay} дней осталось
              </Text>
            </View>
            <Button 
              variant="outline" 
              onPress={() => navigation.navigate('CoursesTab')}
              style={styles.detailButton}
            >
              Подробнее
            </Button>
          </CardContent>
        </Card>
      )}

      {nextInjection && (
        <Card style={styles.card}>
          <CardTitle title="Предстоящая инъекция" />
          <CardContent>
            <View style={styles.injectionHeader}>
              <View style={styles.injectionInfo}>
                <Text style={styles.injectionCompound}>
                  {nextInjection.compound}
                </Text>
                <Text style={styles.injectionDosage}>
                  {nextInjection.dosage} {nextInjection.unit}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                nextInjection.status === 'due' && styles.statusBadgeDue
              ]}>
                <Text style={styles.statusText}>
                  {getTimeUntilInjection(nextInjection)}
                </Text>
              </View>
            </View>
            <View style={styles.injectionDetails}>
              <View style={styles.injectionRow}>
                <Icon name="calendar" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.injectionDetailText}>
                  {new Date(nextInjection.scheduledDate).toLocaleDateString('ru-RU')} в {nextInjection.scheduledTime}
                </Text>
              </View>
              <View style={styles.injectionRow}>
                <Icon name="map-marker" size={20} color={NordColors.snowStorm.nord4} />
                <Text style={styles.injectionDetailText}>{nextInjection.site}</Text>
              </View>
            </View>
            <Button 
              onPress={() => {}}
              style={styles.actionButton}
            >
              Записать
            </Button>
          </CardContent>
        </Card>
      )}

      {latestLabResults.length > 0 && (
        <Card style={styles.card}>
          <CardTitle title="Последние результаты анализов" />
          <CardContent>
            {latestLabResults.map((result) => (
              <View key={result.id} style={styles.labResultRow}>
                <View style={styles.labResultInfo}>
                  <Text style={styles.labResultName}>{result.testName}</Text>
                  <Text style={styles.labResultValue}>
                    {result.value} {result.unit}
                  </Text>
                </View>
                <View style={[
                  styles.labStatusBadge,
                  { backgroundColor: getStatusColor(result.status) }
                ]}>
                  <Text style={styles.labStatusText}>
                    {result.status === 'normal' ? 'Норма' : 
                     result.status === 'warning' ? 'Внимание' : 'Критично'}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity 
              onPress={() => navigation.navigate('LabsTab')}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Все результаты →</Text>
            </TouchableOpacity>
          </CardContent>
        </Card>
      )}

      {healthMetrics && (
        <Card style={styles.card}>
          <CardTitle title="Показатели здоровья" />
          <CardContent>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{healthMetrics.weight} кг</Text>
                <Text style={styles.metricLabel}>Вес</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{healthMetrics.bodyFat}%</Text>
                <Text style={styles.metricLabel}>Жир</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{healthMetrics.muscleMass} кг</Text>
                <Text style={styles.metricLabel}>Мышцы</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {healthMetrics.strength.bench}/{healthMetrics.strength.squat}/{healthMetrics.strength.deadlift}
                </Text>
                <Text style={styles.metricLabel}>B/S/D кг</Text>
              </View>
            </View>
            <Button 
              variant="outline"
              onPress={() => {}}
              style={styles.updateButton}
            >
              Обновить
            </Button>
          </CardContent>
        </Card>
      )}

      {weightHistory.length > 0 && (
        <Card style={styles.card}>
          <CardTitle title="График веса (30 дней)" />
          <CardContent>
            <View style={styles.chartContainer}>
              <LineChart
                data={weightHistory.map((point) => ({
                  value: point.value,
                  label: point.label,
                  dataPointText: point.value.toFixed(1),
                }))}
                width={SCREEN_WIDTH - 80}
                height={200}
                color={NordColors.frost.nord9}
                thickness={3}
                dataPointsColor={NordColors.frost.nord9}
                dataPointsRadius={4}
                textColor1={NordColors.snowStorm.nord4}
                textShiftY={-8}
                textShiftX={-5}
                textFontSize={10}
                yAxisColor={NordColors.polarNight.nord3}
                xAxisColor={NordColors.polarNight.nord3}
                yAxisTextStyle={{ color: NordColors.snowStorm.nord4 }}
                xAxisLabelTextStyle={{ 
                  color: NordColors.snowStorm.nord4,
                  fontSize: 10,
                }}
                curved
                areaChart
                startFillColor={NordColors.frost.nord9}
                endFillColor={NordColors.polarNight.nord1}
                startOpacity={0.3}
                endOpacity={0.1}
              />
            </View>
          </CardContent>
        </Card>
      )}

      {hormoneHistory.length > 0 && (
        <Card style={styles.card}>
          <CardTitle title="Уровни гормонов (90 дней)" />
          <CardContent>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: NordColors.frost.nord9 }]} />
                <Text style={styles.legendText}>Тестостерон</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: NordColors.frost.nord8 }]} />
                <Text style={styles.legendText}>Эстрадиол</Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              <LineChart
                data={hormoneHistory.map((point) => ({
                  value: point.testosterone,
                  label: point.label,
                }))}
                data2={hormoneHistory.map((point) => ({
                  value: point.estradiol * 10,
                  label: point.label,
                }))}
                width={SCREEN_WIDTH - 80}
                height={220}
                color={NordColors.frost.nord9}
                color2={NordColors.frost.nord8}
                thickness={3}
                thickness2={3}
                dataPointsColor={NordColors.frost.nord9}
                dataPointsColor2={NordColors.frost.nord8}
                dataPointsRadius={4}
                textColor1={NordColors.snowStorm.nord4}
                yAxisColor={NordColors.polarNight.nord3}
                xAxisColor={NordColors.polarNight.nord3}
                yAxisTextStyle={{ color: NordColors.snowStorm.nord4 }}
                xAxisLabelTextStyle={{ 
                  color: NordColors.snowStorm.nord4,
                  fontSize: 10,
                }}
                curved
              />
            </View>
          </CardContent>
        </Card>
      )}

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Быстрые действия</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('LogInjectionScreen')}
          >
            <Icon name="needle" size={32} color={NordColors.frost.nord9} />
            <Text style={styles.quickActionText}>Инъекция</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('LogTabletScreen')}
          >
            <Icon name="pill" size={32} color={NordColors.frost.nord9} />
            <Text style={styles.quickActionText}>Таблетка</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('LogNoteScreen')}
          >
            <Icon name="notebook" size={32} color={NordColors.frost.nord9} />
            <Text style={styles.quickActionText}>Заметка</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => {}}
          >
            <Icon name="flask" size={32} color={NordColors.frost.nord9} />
            <Text style={styles.quickActionText}>Анализ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
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
  loadingText: {
    color: NordColors.snowStorm.nord4,
    fontSize: 18,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: NordColors.polarNight.nord0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: NordColors.snowStorm.nord5,
    textTransform: 'capitalize',
  },
  profileIcon: {
    padding: 4,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: NordColors.polarNight.nord1,
    borderColor: NordColors.polarNight.nord3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cycleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 12,
  },
  cycleProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: NordColors.polarNight.nord3,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: NordColors.aurora.nord14,
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NordColors.aurora.nord14,
    minWidth: 45,
  },
  cycleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cycleDetailText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord5,
  },
  detailButton: {
    marginTop: 8,
  },
  injectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  injectionInfo: {
    flex: 1,
  },
  injectionCompound: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  injectionDosage: {
    fontSize: 16,
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: NordColors.polarNight.nord3,
  },
  statusBadgeDue: {
    backgroundColor: NordColors.aurora.nord14,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  injectionDetails: {
    marginBottom: 16,
    gap: 8,
  },
  injectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  injectionDetailText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord5,
  },
  actionButton: {
    marginTop: 8,
  },
  labResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord3,
  },
  labResultInfo: {
    flex: 1,
  },
  labResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  labResultValue: {
    fontSize: 14,
    color: NordColors.snowStorm.nord5,
  },
  labStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  labStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: NordColors.frost.nord9,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: NordColors.polarNight.nord2,
    borderRadius: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: NordColors.frost.nord9,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: NordColors.snowStorm.nord5,
  },
  updateButton: {
    marginTop: 8,
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: NordColors.snowStorm.nord5,
  },
  quickActions: {
    padding: 20,
    paddingTop: 8,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 1,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});

export default DashboardScreen;
