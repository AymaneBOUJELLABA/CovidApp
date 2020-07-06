import React, { Component } from "react";
import { Text, View, ToastAndroid } from "react-native";
import styles from "./style";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Input, CheckBox } from "react-native-elements";
import Success from "./Success";
import { navigate } from "./rootNavigation";

export default class Survey extends Component {
  state = {
    success: false,
    questions: [
      {
        text: "Avez-vous été testé pour le corona virus?",
        options: [
          "Non effectué.",
          "Oui. et le résultat du test est négatif.",
          "Oui et en attente du résultat du test .",
          "Oui. et le résultat du test est positif.",
        ],
        selected: null,
        multi: false,
      },
      {
        text:
          "En ce qui concerne l'isolement médical. lequel des éléments suivants s'applique à vous:",
        options: [
          "Je suis en isolement médical parce que j'ai rencontré une personne contaminée.",
          "Je suis en isolement médical parce que j'ai des symptômes.",
          "Je ne suis pas en isolement médical mais j'étais proche de quelqu'un en isolement médical.",
          "Je ne suis pas en isolement médical.",
        ],
        selected: null,
        multi: false,
      },
      {
        text:
          "Avez-vous actuellement ou avez-vous déjà vécu l'une des situations suivantes:",
        options: [
          "Insuffisance cardiaque chronique.",
          "Cas précédent de crise cardiaque.",
          "Diabète.",
          "Hypertension artérielle.",
          "Maladie rénale chronique.",
          "Maladie pulmonaire chronique.",
          "Le cancer.",
          "Système immunitaire affaibli.",
          "Prenez des médicaments anti-immuns.",
        ],
        selected: [],
        multi: true,
      },
      {
        text:
          "Avez-vous eu les symptômes suivants aujourd'hui? Veuillez les cocher si c'est le cas :",
        options: [
          "Fièvre supérieure à 38 degrés.",
          "Difficulté à respirer.",
          "Maux d'estomac.",
          "Douleurs musculaires.",
          "Fatigue ou faiblesse importante.",
          "Congestion nasale ou nez qui coule.",
          "Inflammation de la gorge.",
          "Toux sèche.",
          "Toux Avec mucus.",
        ],
        selected: [],
        multi: true,
      },
      {
        text: "Depuis combien du temps avez-vous toussé ?",
      },
    ],
    days: null,
  };

  updateQuetion = (questionIndex, optionIndex) => {
    const { questions } = this.state;
    if (!questions[questionIndex].multi)
      questions[questionIndex].selected = optionIndex;
    else {
      if (questions[questionIndex].selected.includes(optionIndex)) {
        let index = questions[questionIndex].selected.indexOf(optionIndex);
        questions[questionIndex].selected.splice(index, 1);
      } else questions[questionIndex].selected.push(optionIndex);
    }
    this.setState({ questions });
  };

  submit = () => {
    console.log(this.state);
    this.setState({ success: true });
  };

  render() {
    return this.state.success ? (
      <Success goHome={() => navigate("Dashboard")} />
    ) : (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 9, paddingHorizontal: 10 }}>
          <ProgressSteps>
            {this.state.questions.map((question, index) => (
              <ProgressStep
                nextBtnDisabled={
                  question.options
                    ? !this.state.questions[index].multi &&
                      this.state.questions[index].selected == null
                    : !this.state.days
                }
                nextBtnText="Suivant"
                onSubmit={this.submit}
              >
                <View style={styles.stepView}>
                  <Text>{question.text}</Text>
                  {question.options ? (
                    question.options.map((option, key) => (
                      <CheckBox
                        containerStyle={styles.checkboxContainer}
                        onPress={() => this.updateQuetion(index, key)}
                        textStyle={{ fontSize: 16, fontWeight: "normal" }}
                        title={option}
                        checked={
                          question.multi
                            ? question.selected.includes(key)
                            : question.selected === key
                        }
                      />
                    ))
                  ) : (
                    <Input
                      placeholder="Nombre des jours"
                      keyboardType="decimal-pad"
                      onChangeText={(days) => this.setState({ days })}
                    />
                  )}
                </View>
              </ProgressStep>
            ))}
          </ProgressSteps>
        </View>
      </View>
    );
  }
}
