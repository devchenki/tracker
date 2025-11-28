import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { NordTheme } from '../../theme/nord';

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
    backgroundColor: NordTheme.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: NordTheme.colors.text,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: NordTheme.colors.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: NordTheme.colors.textSecondary,
  },
});

export default KnowledgeSearch;
