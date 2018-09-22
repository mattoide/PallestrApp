import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, RefreshControl, AsyncStorage, ScrollView, Button, Modal, Text, Dimensions } from 'react-native';
import { Table, Row, } from 'react-native-table-component';

import { baseUrl, listMyExercise, removeexercisescript } from '../../../App';


export default class MioTronco extends Component {


  constructor(props) {
    super(props);



    this.state = {

      message: "",
      resp: "",
      nickname: "",
      modalVisible: false,

      esercizio: { nome: '', muscolo: '', partecorpo: '', ripetizioni: '', serie: '', recupero: '', peso: '', nickname: '' },


      tableHead: ['Esercizio', 'Muscolo', 'Ripetizioni/Serie', 'Recupero', 'Peso'],
      exercise: [],
      exercize: [{ nome: 'nome1', muscolo: 'muscolo1', ripetizioni: 3, serie: 3, recupero: 3, peso: 3 },
      { nome: 'nome2', muscolo: 'muscolo2', ripetizioni: 2, serie: 2, recupero: 2, peso: 2 }],







    };
  }

  setModalVisible(visible, nome, muscolo) {

    this.setState({ modalVisible: visible });

    this.setState({
      esercizio: {
        nome: nome,
        muscolo: muscolo,
        partecorpo: 'Braccia',
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


    const tableData = [];

    try {

      for (let i = 0; i < this.state.exercise.length; i += 1) {
        const rowData = [];
        rowData.push(this.state.exercise[i].nome);
        rowData.push(this.state.exercise[i].muscolo);
        rowData.push(this.state.exercise[i].ripetizioni + "/" + this.state.exercise[i].serie);
        rowData.push(this.state.exercise[i].recupero);
        rowData.push(this.state.exercise[i].peso);

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
                     onLongPress={() => this.setModalVisible(true, rowData[0], rowData[1])}


                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        <Button
          onPress={() => this.props.navigation.navigate('Home')}


          title="Vai a tutti gli esercizi"
          color="gray"
        />


        <Modal visible={this.state.modalVisible}
          onRequestClose={() => { }}
          animationType={"fade"} 
          transparent={true}
        >



          <View style={styles.itemRowTitle}>
            <Text style={styles.modalTextTitle}>Vuoi eliminare: </Text>

            <Text style={styles.modalTextTitle}>{this.state.esercizio.nome} </Text>
            <Text style={styles.modalTextTitle}>{this.state.esercizio.muscolo}</Text>
            <Text style={styles.modalTextTitle}> dalla tua scheda? </Text>

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
              onPress={() => this.removeExercise()}

              title="Conferma"
              color="green"
            />
          </View>
        </Modal>
      </View>
    )
  }



  removeExercise() {

    console.log(this.state.nickname)
    return fetch(baseUrl + removeexercisescript, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: "username=" + this.state.nickname + "&partecorpo="+ "Braccia"


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
              this.refresh();


            });
        }
      }).catch((error) => {
        console.error(error);
      });
  }


  refresh() {


    return fetch(baseUrl + listMyExercise, {

      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "username=" + this.state.nickname + "&partecorpo=" + "Tronco"

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

              console.log(responseJson)


              //  var list = responseJson;



              this.setState({ exercise: responseJson });

              this.render();




            })
        }
      }).catch((error) => {
        console.error(error);
      });
  }



}



const styles = StyleSheet.create({

  container: { flex: 1, padding: 1, paddingTop: 5, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791', },
  text: { textAlign: 'center', fontWeight: '100', width: 83 },
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
  itemRowTitle: {

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
    //width: Dimensions.get('window').width / 2,

  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,

  },
});