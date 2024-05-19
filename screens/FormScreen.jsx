import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { TextInput as PaperInput, RadioButton, Appbar } from 'react-native-paper';
import { parseString } from 'react-native-xml2js';
import SignatureCanvas from 'react-native-signature-canvas';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormScreen({ route, navigation }) {
  const [xmlData, setXmlData ] = useState(null);
  const [xmlInput, setXmlInput] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [radioValues, setRadioValues] = useState({});
  useEffect(()=>{
    setXmlData(route.params.xmlData)
  },[])
  useEffect(() => {
    if (xmlData) {
      parseXml(xmlData);
    }
  }, [xmlData]);

  const parseXml = (xml) => {
    parseString(xml, (err, result) => {
      console.log(xml);
      if (err) {
        Alert.alert('Failed to parse XML', err.message); 
        return;
      }
      setFormFields(result.form.field);
      setXmlData(xml)
    });
  };

  const handleXmlSubmit = () => {
    if(xmlInput!=null){
      parseXml(xmlInput);
    }else{
      Alert.alert('Failed to parse XML', 'Cannot parse Empty XML');
    }
  };

  const showDateTimePicker = (mode) => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const handleRadioChange = (field, value) => {
    setRadioValues({
      ...radioValues,
      [field]: value,
    });
  };

  const renderField = (field, index) => {
    const { type, label, options } = field.$;

    switch (type) {
      case 'text':
      case 'email':
        return (
          <PaperInput
            key={index}
            label={label}
            textColor='#000'
            placeholderTextColor="#000"
            keyboardType={type === 'email' ? 'email-address' : 'default'}
            style={styles.input}
            mode="outlined"
          />
        );
      case 'datetime':
        return (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={() => showDateTimePicker('date')} style={styles.dateBtn}>
              <Text style={styles.inputDate}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode={datePickerMode}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        );
      case 'radio':
        return (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <RadioButton.Group
              onValueChange={(value) => handleRadioChange(index, value)}
              value={radioValues[index]}
            >
              {options.split(',').map((option, i) => (
                <View key={i} style={styles.radioButton}>
                  <RadioButton color="#6200ee" value={option} />
                  <Text style={styles.label}>{option}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        );
      case 'drawing':
        return (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <SignatureCanvas
              style={styles.drawing}
              onOK={(sig) => console.log(sig)}
              descriptionText="Sign here"
              clearText="Clear"
              confirmText="Save"
              webStyle={`.m-signature-pad { box-shadow: none; border: none; } 
                          .m-signature-pad--body { border: none; }
                          .m-signature-pad--footer { display: none; }`}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Form Renderer" />
      </Appbar.Header>
      {xmlData === null ? (
        <View style={styles.inputContainer}>
          <PaperInput
            multiline
            numberOfLines={10}
            value={xmlInput}
            textColor='#000'
            placeholderTextColor="#000"
            onChangeText={setXmlInput}
            placeholder="Enter XML here"
            style={styles.textInput}
            mode="outlined"
          />
          <TouchableOpacity onPress={handleXmlSubmit} style={styles.dateBtn}>
            <Text style={styles.inputDate}>Load Form</Text>
          </TouchableOpacity>
        </View>
      ) : (
        formFields.map((field, index) => renderField(field, index))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    marginVertical: 20,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  dateBtn: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    height: 40,
    color: '#000',
    justifyContent: 'center',
  },
  inputDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200ee',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  drawing: {
    marginVertical: 20,
    borderColor: '#6200ee',
    borderWidth: 2,
    width: "100%",
    height: 150,
  },
});
