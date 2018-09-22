import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, RefreshControl, AsyncStorage, ScrollView, Modal, Text, Dimensions, Picker, Button } from 'react-native';
import { Table, Row, } from 'react-native-table-component';

import { listExercise, baseUrl, addexercisescript } from '../../App';

export default class Gambe extends Component {


  constructor(props) {
    super(props);



    this.state = {

      message: "",
      resp: "",
      nickname: "",
      partecorpo: 'Gambe',

      modalVisible: false,

      esercizio: { nome: '', muscolo: '', partecorpo: '', ripetizioni: '', serie: '', recupero: '', peso: '', nickname: '' },

      tableHead: ['Esercizio', 'Muscolo'],
      exercise: [],

    };
  }

  setModalVisible(visible, nome, muscolo) {

    this.setState({ modalVisible: visible });

    this.setState({
      esercizio: {
        nome: nome,
        muscolo: muscolo,
        partecorpo: 'Gambe',
        ripetizioni: '',
        serie: '',
        recupero: '',
        peso: '',
        nickname: this.state.nickname
      }
    })

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
                     // onLongPress={() => console.log(rowData)}
                     onLongPress={() => this.setModalVisible(true, rowData[0], rowData[1])}
                     />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>


        <Button
          onPress={() => this.props.navigation.navigate('MiaHome')}


          title="Vai alla mia scheda"
          color="gray"
        />

        <Modal visible={this.state.modalVisible}
          onRequestClose={()=>{}}
          animationType={"fade"}
          transparent={true}
        >



          <View style={styles.itemRowTitle}>
            <Text style={styles.modalTextTitle}>{this.state.esercizio.nome}</Text>
            <Text style={styles.modalTextTitle}>{this.state.esercizio.muscolo}</Text>
          </View>

          <View style={styles.itemRow}>


            <View style={styles.itemCol}>

              <Text style={styles.modalText}>Ripetizioni</Text>

              <Text style={styles.modalText}>Serie      </Text>

              <Text style={styles.modalText}>Recupero   </Text>

              <Text style={styles.modalText}>Peso       </Text>

            </View>

            <View style={styles.itemCol}>

              {this.ripetizioniPicker()}

              {this.seriePicker()}

              {this.recuperoPicker()}

              {this.pesoPicker()}
            </View>

          </View>


          <View>

            <Button
              onPress={() => this.setModalVisible(false)}
              title="Annulla"
              color="red"
            />
          </View>

          <View>

            <Button
              // onPress={() => console.log(this.state.esercizio)}
              onPress={() => this.addExercise()}

              title="Conferma"
              color="green"
            />
          </View>
        </Modal>
      </View>
    )
  }

  addExercise() {

    console.log(this.state.nickname)
    return fetch(baseUrl + addexercisescript, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      // body: "username=" + this.state.nickname + "&partecorpo="+ "Tronco"


      body: '&esercizio=' + this.state.esercizio.nome +
        '&muscolo=' + this.state.esercizio.muscolo +
        '&partecorpo=' + this.state.partecorpo +
        '&ripetizioni=' + this.state.esercizio.ripetizioni +
        '&serie=' + this.state.esercizio.serie +
        '&recupero=' + this.state.esercizio.recupero +
        '&peso=' + this.state.esercizio.peso +
        '&nickname=' + this.state.nickname

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

          this.setModalVisible(false)


          response.text().then(

            (obj) => {

              this.setState({ resp: obj });

              ToastAndroid.showWithGravity(
                this.state.resp,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );



            });
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  refresh() {


    return fetch(baseUrl + listExercise, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: "username=" + this.state.nickname + "&partecorpo="+ "Tronco"
      body: "partecorpo=Gambe"

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
              partecorpo: this.state.partecorpo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: this.state.esercizio.serie,
              recupero: this.state.esercizio.recupero,
              peso: itemValue,
              nickname: this.state.nickname
            }
          })}>

          <Picker.Item label="0 Kg" value="0 Kg" />
          <Picker.Item label="1 Kg" value="1 Kg" />
          <Picker.Item label="2 Kg" value="2 Kg" />
          <Picker.Item label="3 Kg" value="3 Kg" />
          <Picker.Item label="4 Kg" value="4 Kg" />
          <Picker.Item label="5 Kg" value="5 Kg" />
          <Picker.Item label="6 Kg" value="6 Kg" />
          <Picker.Item label="7 Kg" value="7 Kg" />
          <Picker.Item label="8 Kg" value="8 Kg" />
          <Picker.Item label="9 Kg" value="9 Kg" />
          <Picker.Item label="10 Kg" value="10 Kg" />
          <Picker.Item label="11 Kg" value="11 Kg" />
          <Picker.Item label="12 Kg" value="12 Kg" />
          <Picker.Item label="13 Kg" value="13 Kg" />
          <Picker.Item label="14 Kg" value="14 Kg" />
          <Picker.Item label="15 Kg" value="15 Kg" />
          <Picker.Item label="16 Kg" value="16 Kg" />
          <Picker.Item label="17 Kg" value="17 Kg" />
          <Picker.Item label="18 Kg" value="18 Kg" />
          <Picker.Item label="19 Kg" value="19 Kg" />
          <Picker.Item label="20 Kg" value="20 Kg" />
          <Picker.Item label="21 Kg" value="21 Kg" />
          <Picker.Item label="22 Kg" value="22 Kg" />
          <Picker.Item label="100 Kg" value="100 Kg" />

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
              partecorpo: this.state.partecorpo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: itemValue,
              recupero: this.state.esercizio.recupero,
              peso: this.state.esercizio.peso,
              nickname: this.state.nickname
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
          <Picker.Item label="9" value="9" />
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
              partecorpo: this.state.partecorpo,
              ripetizioni: itemValue,
              serie: this.state.esercizio.serie,
              recupero: this.state.esercizio.recupero,
              peso: this.state.esercizio.peso,
              nickname: this.state.nickname
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
          <Picker.Item label="9" value="9" />
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
              partecorpo: this.state.partecorpo,
              ripetizioni: this.state.esercizio.ripetizioni,
              serie: this.state.esercizio.serie,
              recupero: itemValue,
              peso: this.state.esercizio.peso,
              nickname: this.state.nickname
            }
          })}>

          <Picker.Item label="0 '" value="0 '" />
          <Picker.Item label="1 '" value="1 '" />
          <Picker.Item label="2 '" value="2 '" />
          <Picker.Item label="3 '" value="3 '" />
          <Picker.Item label="4 '" value="4 '" />
          <Picker.Item label="5 '" value="5 '" />
          <Picker.Item label="6 '" value="6 '" />
          <Picker.Item label="7 '" value="7 '" />
          <Picker.Item label="8 '" value="8 '" />
          <Picker.Item label="9 '" value="9 '" />
          <Picker.Item label="10 '" value="10 '" />
          <Picker.Item label="11 '" value="11 '" />
          <Picker.Item label="12 '" value="12 '" />
          <Picker.Item label="13 '" value="13 '" />
          <Picker.Item label="14 '" value="14 '" />
          <Picker.Item label="15 '" value="15 '" />

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
  itemCol: {

    flexDirection: 'column',
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#F7F6E7',


  },
  itemRow: {

    flexDirection: 'row',
    backgroundColor: 'green',
    borderStyle: 'solid',
    backgroundColor: '#F7F6E7',
    borderColor: '#C1C0B9'



  }, itemRowTitle: {

    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#C1C0B9',
    borderRadius: 9,
    backgroundColor: '#537791',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    marginTop: Dimensions.get('window').width / 2,


  },

  modalTextTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: Dimensions.get('window').width / 2,
    fontSize: 20,

  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,

  },
  picker: {
    height: 20, width: 120
  },
  pickerz: {
    marginLeft: 50,
    paddingTop: 10,

  }
});