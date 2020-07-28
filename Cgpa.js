import React, { Component } from 'react';
import { TouchableOpacity, Image, Animated, ScrollView, StyleSheet, View, Text, Picker, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

var a = 0;
var cr = 0;
var crd = 0;
var pk = 4;
var Total = 0;
var Tcr = 0;
var ind = 1;


class Screen extends Component {

  constructor() {
    super();

    this.state = {
      A: 4,
      Subject: '',
      Credit: 0,
      Total: 0,
    }
    this.Cgpa = 0;

  }

  creditfunc = (text) => {

    this.setState({ Credit: text })
    crd = text;

  }


  pick = (text) => {

    this.setState({ A: text })
    pk = parseFloat(text);
  }


//custom component
  render() {

    return (
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 2 }}>
        <TextInput style={styles.input}

          placeholder="SUBJECT"
          placeholderTextColor="white"
          keyboardType="numeric"
        />

        <View style={styles.picker}>

          <Picker style={styles.picker}
            selectedValue={this.state.A}
            onValueChange={this.pick}
          >

            <Picker.Item label="A+" value="4" />
            <Picker.Item label="A" value="3.75" />
            <Picker.Item label="A-" value="3.5" />
            <Picker.Item label="B+" value="3.25" />
            <Picker.Item label="B" value="3.00" />
            <Picker.Item label="B-" value="2.75" />
            <Picker.Item label="C+" value="2.5" />
            <Picker.Item label="C" value="2.25" />
            <Picker.Item label="D" value="2.00" />
            <Picker.Item label="F" value="0.0" />
          </Picker>

        </View>

        <TextInput style={styles.input2}

          placeholder="Credit"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={this.creditfunc} />

      </View>
    );

  }
}




export default class App extends Component {

  constructor() {
    super();
    this.state = {
      valueArray: [],
      disabled: false,
      textCg: 0
    }
    this.index = 0;
    this.animatedValue = new Animated.Value(0);
  }

  removeItem = () => {
    this.setState(prevState => ({
      valueArray: prevState.valueArray.splice(this.index, 0),
    }));

    Total = 0;
    Tcr = 0;
    this.setState({ textCg: 0 })
    ind = 1;
    pk = 4;
    crd = 0
    this.index = 0
  }

  addMore = () => {

    this.animatedValue.setValue(0);
    let newlyAddedValue = { index: this.index }
    this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.index = this.index + 1;

        this.setState({ disabled: false });

        Total = Total + (pk * crd)
        Tcr = Tcr + parseFloat(crd);
        pk = 4

      });
    });

  }

  Calculate = () => {

    var cg = 0;

    if (ind == 1) {

      Total = Total + (pk * crd)
      Tcr = Tcr + parseFloat(crd);
      cg = Total / Tcr;
      cg = cg.toFixed(3)
      this.setState({ textCg: cg })
      ind = 2
    }

  }

  render() {


    const animationValue = this.animatedValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });

    let newArray = this.state.valueArray.map((item, key) => {

      if ((key) == this.index) {
        return (
          <Animated.View key={key} style={[styles.viewHolder, { opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
            <Text style={styles.headerText}>SUBJECT: {item.index + 1}</Text>


          </Animated.View>


        );
      }
      else {
        return (


          <View key={key} style={styles.viewHolder}>

            <Screen />

          </View>
        );
      }
    });



    return (
      <View style={styles.container} >

        <StatusBar style="light" backgroundColor="grey" />

        <View style={styles.CGPATextView}>
          <Text style={styles.CgpaText}>
            {this.state.textCg}</Text>

        </View>


        <ScrollView style={{marginBottom:40,borderWidth:3,borderColor:'grey'}}>
          <View style={{ flex: 1, padding: 4 }}>
            {
              newArray
            }
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} disabled={this.state.disabled} onPress={this.addMore}>
          <Image source={require('./plus.png')} style={styles.buttonImage} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row',justifyContent:'center',marginLeft:40}}>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => this.Calculate()
            }>

            <Text style={styles.submitButtonText}> Calculate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={
              () => { this.removeItem() }
            }>

            <Text style={styles.submitButtonText}> Clear</Text>
            
          </TouchableOpacity>


        </View>



      </View>
    );
  }
}



const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#232E33'
    },
    viewHolder: {
      height: 60,
      backgroundColor: '#13242E',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderWidth: 0.1,
      borderEndWidth:2,
      borderStartWidth:2,
      borderColor: 'grey'

    },

    CgpaText: {
      borderWidth: 3,
      borderColor: 'grey',
      color: 'white',
      borderRadius: 10,
      width: 150,
      fontSize: 30,
      height: 50,
      textAlign: "center",
      paddingTop: 5
    },
    submitButton: {
      backgroundColor: '#13242E',
      paddingTop: 8,
      alignItems: 'center',
      height: 55,
      width: 150,
      borderRadius: 20,
      borderColor: 'grey',
      borderWidth: 2,
      marginBottom: 10
    },
    clearButton: {
      backgroundColor: '#13242E',
      paddingTop: 8,
      marginHorizontal: 30,
      alignItems: 'center',
      height: 55,
      width: 150,
      borderRadius: 20,
      borderColor: 'grey',
      borderWidth: 2,
      marginBottom: 10
    },
    submitButtonText: {
      color: 'white',
      fontSize: 17,
      marginTop:5
    },
    CGPATextView: {
      marginTop:20,
      paddingBottom: 30,
      paddingTop: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      color: 'white',
      fontSize: 25
    },
    buttonDesign: {
      position: 'absolute',
      right: 5,
      bottom: 55,
      marginBottom: 15,
      borderRadius: 30,
      width: 65,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
  
    },


    buttonImage: {
      resizeMode: 'contain',
      width: '100%',
    },

    picker: {

      height: 50,
      width: 100,
      borderColor: 'grey',
      borderWidth: 3,
      borderRadius: 20,
      color: 'white',
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 15,


    },
    input: {

      height: 50,
      width: 120,
      padding: 10,
      borderColor: 'grey',
      borderWidth: 3,
      borderRadius: 20,
      color: 'white',
      textAlign: "center",

    },
   
    input2: {

      height: 50,
      width: 100,
      padding: 10,
      marginLeft: 15,
      borderColor: 'grey',
      borderWidth: 3,
      borderRadius: 20,
      color: 'white',
      textAlign: "center",

    },
  });