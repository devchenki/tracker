import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/ui';
import { BarChart } from 'react-native-gifted-charts';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { NordTheme, NordColors } from '../../theme/nord';
import { ProgressService } from '../../services/ProgressService';

const DashboardOverview = () => {
  const { user } = useAuth();
  const weeklyProgress = ProgressService.getWeeklyProgress();
  const stats = ProgressService.getLearningStats();

  const barData = weeklyProgress.map(item => ({
    value: item.value,
    label: item.label,
    frontColor: NordTheme.colors.primary,
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome back, {user?.name}!
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Here's your learning progress
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <CardContent>
            <Text variant="displaySmall" style={styles.statValue}>
              {stats.streak}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Day Streak 🔥
            </Text>
          </CardContent>
        </Card>

        <Card style={styles.statCard}>
          <CardContent>
            <Text variant="displaySmall" style={styles.statValue}>
              {stats.totalHours}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Hours Learned
            </Text>
          </CardContent>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <CardTitle title="Weekly Activity" />
        <CardContent>
          <View style={styles.chartContainer}>
            <BarChart
              data={barData}
              barWidth={28}
              barBorderRadius={4}
              frontColor={NordTheme.colors.primary}
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              noOfSections={4}
              maxValue={100}
              yAxisTextStyle={styles.yAxisText}
              xAxisLabelTextStyle={styles.xAxisText}
            />
          </View>
          <Text variant="bodySmall" style={styles.chartSubtext}>
            Minutes spent learning each day
          </Text>
        </CardContent>
      </Card>

      <Card style={styles.summaryCard}>
        <CardTitle title="Learning Summary" />
        <CardContent>
          <View style={styles.summaryRow}>
            <Text variant="bodyLarge" style={styles.summaryLabel}>
              Courses Enrolled
            </Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {stats.totalCourses}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodyLarge" style={styles.summaryLabel}>
              Courses Completed
            </Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {stats.completedCourses}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodyLarge" style={styles.summaryLabel}>
              In Progress
            </Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {stats.totalCourses - stats.completedCourses}
            </Text>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordTheme.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: NordTheme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    color: NordTheme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 8,
  },
  statValue: {
    color: NordTheme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    color: NordTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  chartCard: {
    margin: 20,
    marginTop: 12,
  },
  chartContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  yAxisText: {
    color: NordTheme.colors.textSecondary,
    fontSize: 10,
  },
  xAxisText: {
    color: NordTheme.colors.textSecondary,
    fontSize: 10,
  },
  chartSubtext: {
    color: NordTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  summaryCard: {
    margin: 20,
    marginTop: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: NordTheme.colors.border,
  },
  summaryLabel: {
    color: NordTheme.colors.text,
  },
  summaryValue: {
    color: NordTheme.colors.primary,
    fontWeight: 'bold',
  },
});

export default DashboardOverview;
