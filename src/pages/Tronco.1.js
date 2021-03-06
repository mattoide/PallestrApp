import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, RefreshControl, AsyncStorage, ScrollView, Modal, TouchableHighlight, Text, Dimensions, Picker } from 'react-native';
import { Table, Row, } from 'react-native-table-component';

import { listExercise, baseUrl } from '../../App';


export default class Tronco extends Component {


  constructor(props) {
    super(props);



    this.state = {

      message: "",
      resp: "",
      nickname: "",

      modalVisible: false,

      esercizio: { nome: '', muscolo: '', ripetizioni: '', serie: '', recupero: '', peso: '' },


      tableHead: ['Esercizio', 'Muscolo'],
      exercise: [],
      exercize: [{ nome: 'nome1', muscolo: 'muscolo1', ripetizioni: 3, serie: 3, recupero: 3, peso: 3 },
      { nome: 'nome2', muscolo: 'muscolo2', ripetizioni: 2, serie: 2, recupero: 2, peso: 2 }],


      kg: [],





    };
  }

  setModalVisible(visible, nome, muscolo) {

    this.setState({ modalVisible: visible });
    this.state.esercizio.nome = nome;
    this.state.esercizio.muscolo = muscolo;

  }




  async componentDidMount() {
    try {

      await AsyncStorage.getItem('nickname').then((value) => {
        this.setState({ nickname: value });
        console.log(this.state.nickname)

      });

    } catch (error) {
    }
    this.refresh();

  }

  render() {


    // const state = this.state.table;

    const tableData = [];

    try {

      for (let i = 0; i < this.state.exercise.length; i += 1) {
        const rowData = [];
        rowData.push(this.state.exercise[i].esercizio);
        rowData.push(this.state.exercise[i].muscolo);

        tableData.push(rowData);
      }
    } catch (e) {

    }


    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              <Row data={this.state.tableHead} exercise={this.state.exercise} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onEndReachedThreshold={0.5}
                  onRefresh={() => this.refresh()}
                />
              }>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      exercize={this.state.exercise}
                      style={[styles.row, { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                      onLongPress={() => console.log(rowData)}
                      onPress={() => this.setModalVisible(true, rowData[0], rowData[1])}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>




        <Modal visible={this.state.modalVisible}
          // onRequestClose={() => this.setState({ modalVisible: false })}
          animationType={"fade"}
          transparent={false}
        >


          <View style={styles.item}>
            <Text>{this.state.esercizio.nome}</Text>
            <Text>'        '</Text>
            <Text>{this.state.esercizio.muscolo}</Text>
          </View>

            <View style={styles.item}>
              <Text>Ripetizioni</Text>
              {this.ripetizioniPicker()}
            </View>


            <View style={styles.item}>
              <Text>Serie      </Text>
              {this.seriePicker()}
            </View>

            <View style={styles.item}>
              <Text>Recupero   </Text>
              {this.recuperoPicker()}
            </View>

            <View style={styles.item}>
              <Text>Peso       </Text>
              {this.pesoPicker()}
            </View>


          <View>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    )
  }



  refresh() {


    return fetch(baseUrl + listExercise, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: "username=" + this.state.nickname + "&partecorpo="+ "Tronco"
      body: "partecorpo=Tronco"

    })

      .then((response) => {

        if (response.status != 200) {

          response.text().then(

            (obj) => {

              this.setState({ resp: obj });
              this.setState({ user: "" });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );



            });

        } else {

          response.json()
            .then((responseJson) => {



              //  var list = responseJson;



              this.setState({ exercise: responseJson });

              this.render();




            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  pesoPicker() {
    return (
      <View style={styles.pickerz}>

        <Picker
          selectedValue={this.state.esercizio.peso}
          style={styles.picker}


          onValueChange={(itemValue, itemIndex) => this.setState({
            esercizio: {
              nome: this.state.esercizio.nome,
              muscolo: this.state.esercizio.muscolo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: this.state.esercizio.serie,
              peso: itemValue,
              recupero: this.state.esercizio.recupero
            }
          })}>

          <Picker.Item label="0 Kg" value="0" />
          <Picker.Item label="1 Kg" value="1" />
          <Picker.Item label="2 Kg" value="2" />
          <Picker.Item label="3 Kg" value="3" />
          <Picker.Item label="4 Kg" value="4" />
          <Picker.Item label="5 Kg" value="5" />
          <Picker.Item label="6 Kg" value="6" />
          <Picker.Item label="7 Kg" value="7" />
          <Picker.Item label="8 Kg" value="8" />
          <Picker.Item label="9 Kg" value="8" />
          <Picker.Item label="10 Kg" value="10" />
          <Picker.Item label="11 Kg" value="11" />
          <Picker.Item label="12 Kg" value="12" />
          <Picker.Item label="13 Kg" value="13" />
          <Picker.Item label="14 Kg" value="14" />
          <Picker.Item label="15 Kg" value="15" />
          <Picker.Item label="16 Kg" value="16" />
          <Picker.Item label="17 Kg" value="17" />
          <Picker.Item label="18 Kg" value="18" />
          <Picker.Item label="19 Kg" value="19" />
          <Picker.Item label="20 Kg" value="20" />
          <Picker.Item label="21 Kg" value="21" />
          <Picker.Item label="22 Kg" value="22" />
          <Picker.Item label="100 Kg" value="100" />

        </Picker>

      </View>
    )

  }

  seriePicker() {
    return (
      <View style={styles.pickerz}>

        <Picker
          selectedValue={this.state.esercizio.serie}
          style={styles.picker}


          onValueChange={(itemValue, itemIndex) => this.setState({
            esercizio: {
              nome: this.state.esercizio.nome,
              muscolo: this.state.esercizio.muscolo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: itemValue,
              peso: this.state.esercizio.peso,
              recupero: this.state.esercizio.recupero
            }
          })}>

          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="8" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
          <Picker.Item label="13" value="13" />
          <Picker.Item label="14" value="14" />
          <Picker.Item label="15" value="15" />

        </Picker>

      </View>
    )

  }

  ripetizioniPicker() {
    return (
      <View style={styles.pickerz}>

        <Picker
          selectedValue={this.state.esercizio.ripetizioni}
          style={styles.picker}


          onValueChange={(itemValue, itemIndex) => this.setState({
            esercizio: {
              nome: this.state.esercizio.nome,
              muscolo: this.state.esercizio.muscolo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: itemValue,
              peso: this.state.esercizio.ripetizioni,
              recupero: this.state.esercizio.recupero
            }
          })}>

          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="8" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
          <Picker.Item label="13" value="13" />
          <Picker.Item label="14" value="14" />
          <Picker.Item label="15" value="15" />

        </Picker>

      </View>
    )

  }

  recuperoPicker() {
    return (
      <View style={styles.pickerz}>

        <Picker
          selectedValue={this.state.esercizio.recupero}
          style={styles.picker}


          onValueChange={(itemValue, itemIndex) => this.setState({
            esercizio: {
              nome: this.state.esercizio.nome,
              muscolo: this.state.esercizio.muscolo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: this.state.esercizio.serie,
              peso: this.state.esercizio.peso,
              recupero: itemValue
            }
          })}>

          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="8" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="11" value="11" />
          <Picker.Item label="12" value="12" />
          <Picker.Item label="13" value="13" />
          <Picker.Item label="14" value="14" />
          <Picker.Item label="15" value="15" />

        </Picker>

      </View>
    )

  }

}



const styles = StyleSheet.create({

  container: { flex: 1, padding: 1, paddingTop: 5, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791', },
  text: { textAlign: 'center', fontWeight: '100', width: Dimensions.get('window').width / 2 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1', maxWidth: 420 },

  view: {

    marginTop: '50%',
    flex: 1, alignSelf: 'stretch', flexDirection: 'row'
  },
  res: {
    color: "green",
    textAlign: "center",
    marginTop: '2%',
    fontSize: 30

  },
  item: {

    flexDirection: 'row'
  },
  picker: {
    height: 20, width: 120
  },
  pickerz: {
marginLeft: 50,
  }
});