import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { quarterbacks as initialQuarterbacks } from './data';
import { useQuarterbacks } from './methods';

const App = () => {
  const { quarterbacks, moveItem, calculatePoints, simulateWeek, scores } = useQuarterbacks();
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => select(index)}
      onLongPress={() => moveSelected(index)}
    >
      <View style={styles.item}>
        <Text>{item.name} ({item.points} points)</Text>
      </View>
    </TouchableOpacity>
  );

  const renderScore = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text>{item.name}: {item.score} points</Text>
    </View>
  );

  const select = (index) => {
    setSelected(selected === index ? null : index);
  };

  const moveSelected = (toIndex) => {
    if (selected !== null) {
      moveItem(selected, toIndex);
      calculatePoints();
      setSelected(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monday Morning QB</Text>
      <FlatList
        data={quarterbacks}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button title="Simulate Week" onPress={simulateWeek} />
      <FlatList
        data={scores}
        renderItem={renderScore}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default App;
