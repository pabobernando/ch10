import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";
import { postScore } from '../../helpers/auth'
import {ref,firebaseAuth} from '../../config/constants'


export default class Game extends Component {

  state = {
    scoreIncrement : 1,
    userChoice: "",
    computerChoice : "",
    Winner : "",
    computerScore : 0,
    userScore : 0,
  }

  componentDidUpdate() {
    let currentUser = firebaseAuth().currentUser.uid
    if(this.state.Winner == "Human"){
      postScore(currentUser,1);
    }
   
  }

  computerChoice = () =>{

    let computerChoiceNum = Math.floor(Math.random() * 30 )+1;


    //display computer choice

    if (computerChoiceNum >= 0 && computerChoiceNum <= 10) {
      this.setState({
        computerChoice: "Rock"
      });
    } else if (computerChoiceNum >= 11 && computerChoiceNum <= 20) {
      this.setState({
        computerChoice: "Paper"
      });
    } else if (computerChoiceNum >= 21 && computerChoiceNum <= 30) {
      this.setState({
        computerChoice: "Scissors"
      });
    }

     //Logic for when user selects rock
     if (this.state.userChoice === "Rock" && computerChoiceNum >= 0 && computerChoiceNum <= 10) {
      this.setState({
        Winner: "Tie"
      });
    } else if (
      this.state.userChoice === "Rock" &&
      computerChoiceNum >= 11 &&
      computerChoiceNum <= 20
    ) {
      this.setState({
        Winner: "Computer",
        computerScore: this.state.computerScore + 1
      });
    } else if (
      this.state.userChoice === "Rock" &&
      computerChoiceNum >= 21 &&
      computerChoiceNum <= 30
    ) {
      this.setState({
        Winner: "Human",
        userScore: this.state.userScore + 1
      });
    }

    //Logic for when user selects scissors
    if (this.state.userChoice === "Scissors" && computerChoiceNum >= 0 && computerChoiceNum <= 10) {
      this.setState({
        Winner: "Bot",
        computerScore: this.state.computerScore + 1
      });
    } else if (
      this.state.userChoice === "Scissors" &&
      computerChoiceNum >= 11 &&
      computerChoiceNum <= 20
    ) {
      this.setState({
        Winner: "Human",
        userScore: this.state.userScore + 1
      });
    } else if (
      this.state.userChoice === "Scissors" &&
      computerChoiceNum >= 21 &&
      computerChoiceNum <= 30
    ) {
      this.setState({
        Winner: "Tie"
      });
    }

    //Logic for when user selects paper
    if (this.state.userChoice === "Paper" && computerChoiceNum >= 0 && computerChoiceNum <= 10) {
      this.setState({
        Winner: "Human",
        userScore: this.state.userScore + 1
      });
    } else if (
      this.state.userChoice === "Paper" &&
      computerChoiceNum >= 11 &&
      computerChoiceNum <= 20
    ) {
      this.setState({
        Winner: "Tie"
      });
    } else if (
      this.state.userChoice === "Paper" &&
      computerChoiceNum >= 21 &&
      computerChoiceNum <= 30
    ) {
      this.setState({
        Winner: "Bot",
        computerScore: this.state.computerScore + 1
      });
    }


   

  }



  render () {
    return (
      <SafeAreaView style={styles.container}>
      <Text style={{ color: "#000", fontWeight: "900", fontSize: 30 }}>
        Winner: {this.state.Winner}
      </Text>
      <View style={styles.gameContainer}>
        <View style={styles.human}>
          <Text style={{ color: "#000", fontWeight: "900", fontSize: 30 }}>
            Human
          </Text>
          <Text style={{ color: "#000", fontWeight: "900", fontSize: 25 }}>
            Score: {this.state.userScore}
          </Text>

          <View style={styles.gameView}>
            <View style={styles.winBackground}>
              <Text
                style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}
              >
                Choice: {this.state.userChoice}
              </Text>
            </View>

            <View style={styles.choicesContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    userChoice: "Rock"
                  })
                }
              >
                <Text
                  style={{
                    color: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "#000",
                    marginHorizontal: 20,
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  Rock
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    userChoice: "Paper"
                  })
                }
              >
                <Text
                  style={{
                    color: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    borderColor: "#000",
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  Paper
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    userChoice: "Scissors"
                  })
                }
              >
                <Text
                  style={{
                    color: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    borderColor: "#000",
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  Scissors
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bot}>
          <Text style={{ color: "#000", fontWeight: "900", fontSize: 30 }}>
            Bot
          </Text>
          <Text style={{ color: "#000", fontWeight: "900", fontSize: 25 }}>
            Score: {this.state.computerScore}
          </Text>

          <View style={styles.gameView}>
            <View style={styles.winBackground}>
              <Text
                style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}
              >
                Choice: {this.state.computerChoice}
              </Text>
            </View>

            <View style={styles.choicesContainer}>
              <Text
                style={{
                  color: "#000",
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginHorizontal: 20,
                  borderColor: "#000",
                  fontWeight: "900",
                  fontSize: 15,
                  opacity: 0
                }}
              >
                Rate
              </Text>
              <TouchableOpacity onPress={this.computerChoice}>
                <Text
                  style={{
                    color: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    borderColor: "#000",
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  Play
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    computerChoice: "",
                    userChoice: "",
                    Winner: ""
                  })
                }
              >
                <Text
                  style={{
                    color: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 20,
                    marginHorizontal: 20,
                    borderColor: "#000",
                    fontWeight: "900",
                    fontSize: 15
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
    // flexDirection: "row"
  },

  gameContainer: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      ios: {
        flexDirection: "column"
      },
      web: {
        flexDirection: "row"
      },
      default: {
        flexDirection: "column"
      }
    })
  },
  human: {
    margin: 10,
    borderWidth: 10,
    borderColor: "#000",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
    //justifyContent:"flex-start"
  },
  bot: {
    margin: 10,
    borderColor: "#000",
    borderWidth: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
    //justifyContent:"flex-end"
  },
  gameView: {
    padding: 20
  },
  winBackground: {
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  choicesContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    //alignItems:"center",
    margin: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#000"
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
    //backgroundColor:"#fff"
  }
});