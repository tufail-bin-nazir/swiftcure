import React, { Component } from 'react';
import { Avatar, List, ListItem, Icon } from 'react-native-elements';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { appUrl } from '../actions/ServiceUrls';

class Doctor extends Component {

  getClinicDetails(cid, did) {
    console.log(cid);
    console.log(did);
    axios({
      method: 'get',
      url: `${appUrl}ClinicService/getClinicTiming/${cid}/${did}`,
      headers: { 'X-AUTH-TOKEN': this.props.token }
    })
    .then(response => {
      console.log(response);
    });
   }

render() {
   const { id, name, image, description, education, specialization, clinic } = this.props.doc;
   const doceducation = education;
   const docspecialization = specialization;
   const docclinic = clinic;

   return (
     <ScrollView>
      <Card>
        <CardSection >
          <Avatar
            xlarge
            rounded
            source={{ uri: `${appUrl}DoctorService/getimage/${image}` }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <View style={{ marginTop: 30 }}>
          <Text style={{ marginLeft: 30, color: '#007aff', fontSize: 15, fontStyle: 'italic' }}>
              {name}
            </Text>
            <Text
               style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 10,
                  width: 200,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start'
          }}>
              {description}
              </Text>
            </View>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
          <Icon
           name='book'
           color='#007aff'
          />
          <Text style={{ color: '#007aff', paddingTop: 5, paddingLeft: 10 }}>
           Education
          </Text>
           </View>
            <List containerStyle={{ marginBottom: 20 }}>
              {
                doceducation.map((l, i) => (
                  <ListItem
                    hideChevron
                    key={i}
                    title={l.educationName}
                  />
                ))
              }
            </List>

        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
             name='archive'
              color='#007aff'
            />
            <Text style={{ color: '#007aff', paddingTop: 5, paddingLeft: 10 }}>
              Speciality
            </Text>
        </View>
            <List containerStyle={{ marginBottom: 20 }}>
              {
                docspecialization.map((l, i) => (
                  <ListItem
                    hideChevron
                    key={i}
                    title={l.specializationName}
                  />
                ))
              }
            </List>

        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
          <Icon
            name='attachment'
            color='#007aff'
          />
          <Text style={{ color: '#007aff', paddingTop: 5, paddingLeft: 10 }}>
            Clinics
          </Text>
          </View>

            <List containerStyle={{ marginBottom: 20 }}>
              {
                docclinic.map((l, i) => (
                  <ListItem
                    onPress={this.getClinicDetails.bind(this, l.id, id)}
                    key={i}
                    title={l.name}
                  />
                ))
              }
            </List>

        </CardSection>
      </Card>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(Doctor);
