import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const MOCK_ARTICLES = [
  { id: '1', title: 'Getting Started with React Native', category: 'Tutorial', readTime: '5 min' },
  { id: '2', title: 'Understanding React Hooks', category: 'Guide', readTime: '8 min' },
  { id: '3', title: 'State Management Best Practices', category: 'Article', readTime: '10 min' },
  { id: '4', title: 'Performance Optimization Tips', category: 'Tutorial', readTime: '12 min' },
];

const KnowledgeArticles = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Knowledge Base
        </Text>
        <Searchbar
          placeholder="Search articles"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView style={styles.list}>
        {MOCK_ARTICLES.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => navigation.navigate('KnowledgeDetail' as never, { articleId: article.id } as never)}
          >
            <Card style={styles.card}>
              <CardTitle title={article.title} subtitle={article.category} />
              <CardContent>
                <Text variant="bodySmall" style={styles.readTime}>
                  ⏱️ {article.readTime} read
                </Text>
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
    backgroundColor: NordTheme.colors.surface,
  },
  list: {
    flex: 1,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  readTime: {
    color: NordTheme.colors.textSecondary,
  },
});

export default KnowledgeArticles;
