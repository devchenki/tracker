import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import KnowledgeBaseService, { CompoundCategory, CompoundInfo } from '../../services/KnowledgeBaseService';

const KnowledgeBaseScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CompoundCategory>('All');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const compounds = useMemo(() => {
    let result = KnowledgeBaseService.getAllCompounds();
    
    if (searchQuery) {
      result = KnowledgeBaseService.searchCompounds(searchQuery);
    }
    
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }
    
    return result;
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const categories: Array<'All' | CompoundCategory> = ['All', 'Injectables', 'Orals', 'Support'];

  const getCompoundsByCategory = (category: CompoundCategory) => {
    return compounds.filter(c => c.category === category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>База знаний</Text>
      </View>

      <View style={styles.searchSection}>
        <RNTextInput
          style={styles.searchInput}
          placeholder="Поиск по названию..."
          placeholderTextColor={NordColors.polarNight.nord3}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === cat && styles.categoryChipTextActive,
            ]}>
              {cat === 'All' ? 'Все' : cat === 'Injectables' ? 'Инъекционные' : cat === 'Orals' ? 'Оральные' : 'Вспомогательные'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedCategory === 'All' ? (
          <>
            {['Injectables', 'Orals', 'Support'].map(cat => {
              const categoryCompounds = getCompoundsByCategory(cat as CompoundCategory);
              if (categoryCompounds.length === 0) return null;
              
              return (
                <View key={cat} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>
                    {cat === 'Injectables' ? '💉 ИНЪЕКЦИОННЫЕ' : cat === 'Orals' ? '💊 ОРАЛЬНЫЕ' : '🛡️ ВСПОМОГАТЕЛЬНЫЕ'}
                  </Text>
                  {categoryCompounds.map(compound => (
                    <CompoundCard
                      key={compound.id}
                      compound={compound}
                      isExpanded={expandedIds.has(compound.id)}
                      onToggle={() => toggleExpand(compound.id)}
                    />
                  ))}
                </View>
              );
            })}
          </>
        ) : (
          <View style={styles.categorySection}>
            {compounds.map(compound => (
              <CompoundCard
                key={compound.id}
                compound={compound}
                isExpanded={expandedIds.has(compound.id)}
                onToggle={() => toggleExpand(compound.id)}
              />
            ))}
          </View>
        )}

        {compounds.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Ничего не найдено</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

interface CompoundCardProps {
  compound: CompoundInfo;
  isExpanded: boolean;
  onToggle: () => void;
}

const CompoundCard: React.FC<CompoundCardProps> = ({ compound, isExpanded, onToggle }) => {
  const isTopCompound = ['test_e', 'anavar', 'dbol'].includes(compound.id);
  
  return (
    <TouchableOpacity 
      style={[
        styles.compoundCard,
        isTopCompound && styles.compoundCardTop,
      ]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.compoundHeader}>
        <View style={styles.compoundHeaderLeft}>
          <Text style={styles.compoundName}>{compound.name}</Text>
          <Text style={styles.compoundShortName}>({compound.shortName})</Text>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </View>

      {isExpanded && (
        <View style={styles.compoundDetails}>
          <DetailRow label="Дозировка" value={compound.dosage} />
          {compound.halfLife && <DetailRow label="Период полуэлиминации" value={compound.halfLife} />}
          {compound.aromatizes && <DetailRow label="Ароматизирует" value={compound.aromatizes} />}
          {compound.onset && <DetailRow label="Начало" value={compound.onset} />}
          <DetailRow label="Эффект" value={compound.effects} />
          {compound.requires && <DetailRow label="Требует" value={compound.requires} />}
          {compound.warnings && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>{compound.warnings}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: NordColors.polarNight.nord1,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
  },
  searchSection: {
    padding: 16,
    backgroundColor: NordColors.polarNight.nord1,
  },
  searchInput: {
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  categoryFilter: {
    backgroundColor: NordColors.polarNight.nord1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: 60,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: NordColors.polarNight.nord0,
    marginRight: 8,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord3,
  },
  categoryChipActive: {
    backgroundColor: NordColors.frost.nord9,
    borderColor: NordColors.frost.nord9,
  },
  categoryChipText: {
    color: NordColors.snowStorm.nord4,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: NordColors.polarNight.nord0,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NordColors.frost.nord9,
    marginBottom: 12,
  },
  compoundCard: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: NordColors.polarNight.nord2,
  },
  compoundCardTop: {
    borderColor: NordColors.aurora.nord14,
    borderWidth: 2,
  },
  compoundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compoundHeaderLeft: {
    flex: 1,
  },
  compoundName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  compoundShortName: {
    fontSize: 14,
    color: NordColors.frost.nord9,
  },
  expandIcon: {
    fontSize: 16,
    color: NordColors.frost.nord9,
    marginLeft: 12,
  },
  compoundDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: NordColors.polarNight.nord2,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord8,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: NordColors.aurora.nord11,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  warningText: {
    color: NordColors.snowStorm.nord6,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: NordColors.polarNight.nord3,
  },
});

export default KnowledgeBaseScreen;
