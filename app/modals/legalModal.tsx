import React from 'react';
import { StyleSheet } from 'react-native';
import Legal from '../../components/Legal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LegalModal() {
  return (
    <SafeAreaView style={styles.container}>
      <Legal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});
