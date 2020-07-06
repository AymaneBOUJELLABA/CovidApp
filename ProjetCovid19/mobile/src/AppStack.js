//this is something to test
import React, { useContext, useState, useEffect, StyleSheet } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import styles from "./style";
import { Keyboard, Text, View, TextInput } from "react-native";
import { Button, CheckBox, Picker, Image } from "react-native";
import axios from "axios";
import { AuthStack } from "./AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
axios.defaults.baseURL = "http://192.168.1.13:8000";

const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get("/api/user")
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        Bienvenue {name} sur votre platforme de test de covid19
      </Text>

      <View
        style={{
          flex: 8,
          marginTop: 60,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
          }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            style={{ width: 75, height: 75 }}
            source={require("./../assets/question.png")}
          />
          <Text>Fiche d'investigation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Image
            style={{ width: 75, height: 75 }}
            source={require("./../assets/location.png")}
          />
          <Text>Carte géographique</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <Button
          title="Logout"
          color="#e74c3c"
          style={{ width: "100%" }}
          onPress={() => logout()}
        />
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { logout, addInfo, info } = useContext(AuthContext);
  const [isSelected, setSelection] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPreom] = useState("");
  const [age, setAge] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [ville, setVille] = useState("");
  const [selectedSexe, setSelectedSexe] = useState("");
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ flex: 9 }}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>
            Remplir votre information personnel
          </Text>
        </View>
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setNom(text)}
          placeholder="Nom"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setPreom(text)}
          placeholder="Prenom"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setAge(text)}
          placeholder="Age"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setAdresse(text)}
          placeholder="Adresse"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setTelephone(text)}
          placeholder="Telephone"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />

        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setVille(text)}
          placeholder="Ville"
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 45,
          }}
        >
          <Text>Sexe:</Text>
          <Picker
            selectedValue={selectedSexe}
            style={{
              height: 50,
              width: 250,
              marginHorizontal: 30,
            }}
            onValueChange={(itemValue, itemIndex) => setSelectedSexe(itemValue)}
          >
            <Picker.Item label="Femme" value="femme" />
            <Picker.Item label="Homme" value="homme" />
          </Picker>
        </View>
      </View>
      <Button
        title="Submit"
        style={{ flex: 1 }}
        onPress={() => {
          addInfo(nom, prenom, age, adresse, telephone, ville, selectedSexe);
        }}
      />
    </View>
  );
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{ title: "Acceuil" }}
        component={DashboardScreen}
      />
      <Stack.Screen
        name="Settings"
        options={{ title: "Formulaire" }}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

{
  /* <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center", }}
          />
          <Text style={{ margin: 8, }} >Do you like React Native?</Text>
        </View>
        <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
      </View> */
}
