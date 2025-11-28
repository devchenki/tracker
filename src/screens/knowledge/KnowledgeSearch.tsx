import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { AppTheme } from '../../theme/colors';

const KnowledgeSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Search Knowledge Base
        </Text>
        <Searchbar
          placeholder="Search for articles, guides, and more"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <View style={styles.content}>
        <Text variant="bodyLarge" style={styles.emptyText}>
          Start typing to search
        </Text>
      </View>
    </View>
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
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: AppTheme.colors.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: AppTheme.colors.textSecondary,
  },
});

export default KnowledgeSearch;
