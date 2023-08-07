import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const signUp = async () => {
    const register = await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async () => {
    const login = await signInWithEmailAndPassword(auth, email, password);
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text: string) => setEmail(text)} value={email} />
      <TextInput style={styles.input} textContentType="password" placeholder="Password" onChangeText={(text: string) => setPassword(text)} value={password} />
      <Button onPress={signUp} title="Sign Up" />
      <Button onPress={signIn} title="Sign In" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginVertical: 3,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
