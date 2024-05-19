import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const predefinedXML = `<form>
    <field type="text" label="Name" />
    <field type="email" label="Email" />
    <field type="datetime" label="Appointment Date" />
    <field type="radio" label="Gender" options="Male,Female" />
    <field type="drawing" label="Signature" />
  </form>`;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form', { xmlData: predefinedXML })}
      >
        <Text style={styles.buttonText}>Render Form from XML File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form', { xmlData: null })}
      >
        <Text style={styles.buttonText}>Render Form from XML Input</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
