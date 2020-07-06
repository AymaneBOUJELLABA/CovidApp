import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput } from "react-native";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
//import { ButtonIndex } from "./components/Button";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginFormView}>
        <View style={{ flex: 7 }}>
          <Text style={styles.logoText}>Covid19 Test</Text>
          {error && (
            <Text style={{ color: "red", marginBottom: 24, marginLeft: 100 }}>
              {error}
            </Text>
          )}
          <TextInput
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            secureTextEntry={true}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Button title="Login" onPress={() => login(email, password)} />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                textAlign: "right",
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 16,
              }}
            >
              Vous n'avez pas de compte?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginFormView}>
        <View style={{ flex: 7 }}>
          <Text style={styles.logoText}>Covid19 Test</Text>
          {error && (
            <Text style={{ color: "red", marginBottom: 24, marginLeft: 100 }}>
              {error}
            </Text>
          )}
          <TextInput
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
          />
          <TextInput
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            secureTextEntry={true}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Button
            title="Register"
            onPress={() => register(name, email, password)}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                textAlign: "right",
                paddingVertical: 10,
                paddingRight: 10,
                fontSize: 16,
              }}
            >
              Vous avez deja un compte?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ title: "Identification" }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        options={{ title: "Inscription" }}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};
