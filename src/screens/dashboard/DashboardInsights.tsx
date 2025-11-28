import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { AppTheme, NordColors } from '../../theme/colors';
import { ProgressService } from '../../services/ProgressService';

const DashboardInsights = () => {
  const categoryData = ProgressService.getCategoryDistribution();

  const pieData = [
    { value: 45, color: NordColors.frost.nord9, text: '45%' },
    { value: 25, color: NordColors.frost.nord8, text: '25%' },
    { value: 15, color: NordColors.aurora.nord14, text: '15%' },
    { value: 15, color: NordColors.aurora.nord13, text: '15%' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Learning Insights
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Analyze your learning patterns
        </Text>
      </View>

      <Card style={styles.card}>
        <CardTitle title="Category Distribution" />
        <CardContent>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              innerRadius={60}
              radius={100}
              centerLabelComponent={() => (
                <View>
                  <Text variant="headlineSmall" style={styles.centerLabel}>
                    100%
                  </Text>
                  <Text variant="bodySmall" style={styles.centerSubLabel}>
                    Total
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={styles.legendContainer}>
            {categoryData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: pieData[index].color },
                  ]}
                />
                <Text variant="bodyMedium" style={styles.legendText}>
                  {item.label}: {item.value}%
                </Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      <Card style={styles.card}>
        <CardTitle title="Performance Metrics" />
        <CardContent>
          <View style={styles.metricRow}>
            <Text variant="bodyLarge" style={styles.metricLabel}>
              Average Completion Rate
            </Text>
            <Text variant="bodyLarge" style={styles.metricValue}>
              78%
            </Text>
          </View>
          <View style={styles.metricRow}>
            <Text variant="bodyLarge" style={styles.metricLabel}>
              Quiz Success Rate
            </Text>
            <Text variant="bodyLarge" style={styles.metricValue}>
              85%
            </Text>
          </View>
          <View style={styles.metricRow}>
            <Text variant="bodyLarge" style={styles.metricLabel}>
              Average Study Time
            </Text>
            <Text variant="bodyLarge" style={styles.metricValue}>
              45 min
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
    backgroundColor: AppTheme.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: AppTheme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    color: AppTheme.colors.textSecondary,
  },
  card: {
    margin: 20,
    marginTop: 0,
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  centerLabel: {
    textAlign: 'center',
    color: AppTheme.colors.text,
    fontWeight: 'bold',
  },
  centerSubLabel: {
    textAlign: 'center',
    color: AppTheme.colors.textSecondary,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: AppTheme.colors.text,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  metricLabel: {
    color: AppTheme.colors.text,
  },
  metricValue: {
    color: AppTheme.colors.primary,
    fontWeight: 'bold',
  },
});

export default DashboardInsights;
