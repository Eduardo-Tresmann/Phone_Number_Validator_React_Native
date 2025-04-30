import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const PhoneNumberValidator = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState('');

  const validatePhoneNumber = async () => {
    const accessKey = 'sua-key';
    const apiUrl = `http://apilayer.net/api/validate?access_key=${accessKey}&number=${phoneNumber}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.valid) {
        setIsValid(true);
        setValidationMessage(
          `Número válido: ${data.international_format}\n` +
          `País: ${data.country_name}\n` +
          `Localização: ${data.location}\n` +
          `Operadora: ${data.carrier}`
        );
      } else {
        setIsValid(false);
        setValidationMessage('Número de telefone inválido!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível validar o número!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validador de Número de Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número de telefone"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Validar" onPress={validatePhoneNumber} color="#1e90ff" />
      {isValid !== null && (
        <Text style={styles.result}>
          {validationMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default PhoneNumberValidator;