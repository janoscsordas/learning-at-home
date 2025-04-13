import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import { Text } from "react-native";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useUser } from "../../hooks/useUser";
import { Colors } from "../../constants/Colors";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { register } = useUser();

  const handleSubmit = async () => {
    setError(null);

    try {
      await register(email, password);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Invalid email or password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
            Register for an account
        </ThemedText>

        <ThemedTextInput
            placeholder="Email"
            style={{ width: "80%", marginBottom: 20 }}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
        />

        <ThemedTextInput
            placeholder="Password"
            style={{ width: "80%", marginBottom: 20 }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
        />

        <ThemedButton onPress={handleSubmit}>
            <Text style={{ color: "#f2f2f2" }}>Register</Text>
        </ThemedButton>

        <Spacer />

        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />
        <Link href="/login">
            <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
        </Link>
        </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
});
