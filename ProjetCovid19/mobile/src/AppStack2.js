import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { AppStack } from "./AppStack";
import {
  Button,
  Text,
  View,
  TextInput,
  CheckBox,
  ScrollView,
} from "react-native";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
//import { ButtonIndex } from "./components/Button";
import styles from "./style";
const Stack = createStackNavigator();

function ReturnTo({ navigation }) {
  return <NavigationContainer>{<AppStack />}</NavigationContainer>;
}
function TestScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [rep, setRep] = useState("");

  return (
    <ScrollView style={styles.loginScreenContainer}>
      <Text style={{ marginLeft: 50, marginBottom: 20, fontSize: 20 }}>
        Répender aux questions suivant :{" "}
      </Text>
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginBottom: 10 }}
      >
        <Text>Q1 : Avez-vous été testé pour le corona virus? </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Non effectué</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Oui. et le résultat du test est négatif.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Oui et en attente du résultat du test
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Oui. et le résultat du test est positif.
          </Text>
        </View>{" "}
        */ //{" "}
      </View>
      /*{" "}
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginBottom: 10 }}
      >
        <Text>
          Q2 : En ce qui concerne l'isolement médical. lequel des éléments
          suivants s'applique à vous:{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Je suis en isolement médical parce que j'ai rencontré une personne
            contaminée.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Je suis en isolement médical parce que j'ai des symptômes.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>
            Je ne suis pas en isolement médical mais j'étais proche de quelqu'un
            en isolement médical
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Je ne suis pas en isolement médical</Text>
        </View>
      </View>
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginBottom: 10 }}
      >
        <Text>
          Q3 : -Avez-vous actuellement ou avez-vous déjà vécu l'une des
          situations suivantes:{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Insuffisance cardiaque chronique.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Cas précédent de crise cardiaque.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Diabète.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Hypertension artérielle.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Maladie rénale chronique.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Maladie pulmonaire chronique.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Le cancer.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Système immunitaire affaibli.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Prenez des médicaments anti-immuns.</Text>
        </View>
      </View>
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginBottom: 10 }}
      >
        <Text>
          Q4 : Avez-vous eu les symptômes suivants aujourd'hui?.Veuillez les
          cocher si c'est le cas :
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Fièvre supérieure à 38 degrés.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Difficulté à respirer.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Maux d'estomac.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Douleurs musculaires.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Fatigue ou faiblesse importante.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Congestion nasale ou nez qui coule.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Inflammation de la gorge.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Toux sèche.</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ margin: 8 }}>Toux Avec mucus.</Text>
        </View>
      </View>
      <View
        style={{ justifyContent: "center", marginLeft: 20, marginBottom: 10 }}
      >
        <Text>Q5 : Depuis combien du temps avez-vous toussé ? </Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => setRep(text)}
          placeholderColor="#c4c3cb"
          style={styles.InfoFormTextInput}
        />
      </View>
      <View>
        <Button
          type="outline"
          title="Return to dashboard"
          onPress={() => ReturnTo()}
        />
      </View>
    </ScrollView>
  );
}

export const AppStack2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Les questions" component={TestScreen} />
    </Stack.Navigator>
  );
};
