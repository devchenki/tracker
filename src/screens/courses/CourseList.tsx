import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'React Native Fundamentals',
    description: 'Master the basics of React Native development',
    duration: '8 hours',
    lessons: 20,
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript advanced features',
    duration: '12 hours',
    lessons: 25,
    level: 'Advanced',
  },
  {
    id: '3',
    title: 'Mobile UI/UX Design',
    description: 'Create beautiful mobile interfaces',
    duration: '10 hours',
    lessons: 18,
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'State Management',
    description: 'Learn Redux, Context API, and more',
    duration: '6 hours',
    lessons: 15,
    level: 'Intermediate',
  },
];

const CourseList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Courses
        </Text>
        <Searchbar
          placeholder="Search courses"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.filterContainer}>
          <Chip style={styles.chip} selected>
            All
          </Chip>
          <Chip style={styles.chip}>Beginner</Chip>
          <Chip style={styles.chip}>Intermediate</Chip>
          <Chip style={styles.chip}>Advanced</Chip>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {MOCK_COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            onPress={() => (navigation as any).navigate('CourseDetail', { courseId: course.id })}
          >
            <Card style={styles.card}>
              <CardTitle
                title={course.title}
                subtitle={course.level}
              />
              <CardContent>
                <Text variant="bodyMedium" style={styles.description}>
                  {course.description}
                </Text>
                <View style={styles.metadata}>
                  <Text variant="bodySmall" style={styles.metadataText}>
                    ⏱️ {course.duration}
                  </Text>
                  <Text variant="bodySmall" style={styles.metadataText}>
                    📚 {course.lessons} lessons
                  </Text>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordTheme.colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    color: NordTheme.colors.text,
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: NordTheme.colors.surface,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: NordTheme.colors.surface,
  },
  list: {
    flex: 1,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  description: {
    color: NordTheme.colors.textSecondary,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
  },
  metadataText: {
    color: NordTheme.colors.textSecondary,
  },
});

export default CourseList;
