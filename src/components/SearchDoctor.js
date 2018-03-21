import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Input, Button, Card, Spinner } from './common';
import { appUrl } from '../actions/ServiceUrls';

class SearchDoctor extends Component {
   state = { search: '', docList: [], spinnner: false }
  docDescription(id) {
    console.log(id);
    axios({
        method: 'get',
        url: `${appUrl}DoctorService/getDoctor/${id}`,
        headers: { 'X-AUTH-TOKEN': this.props.token }
        })
        .then((response) => {
          console.log(response);
           Actions.doctor({ doc: response.data });
        })
        .catch((error) => {
               console.log(error);
        });
    }
  searchDoctors() {
   this.setState({ spinner: true });
      axios({
          method: 'get',
          url: `${appUrl}DoctorService/getDoctorList/${this.state.search}`,
          headers: { 'X-AUTH-TOKEN': this.props.token }
          })
          .then((response) => {
            console.log(response.data);
                  this.setState({ docList: response.data });
                  this.setState({ spinner: false });
               })
          .catch((error) => {
                 console.log(error);
                });
          }
  renderDocList() {
      if (this.state.spinner) {
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
      }
        return (
          <List>
           <FlatList
                data={this.state.docList}
                renderItem={({ item }) => {
                return (
                    <ListItem
                      roundAvatar
                      onPress={this.docDescription.bind(this, item.id)}
                      title={item.name}
                      subtitle={item.description}
                      avatar={{ uri: `${appUrl}DoctorService/getimage/${item.image}` }}
                    />
                  );
                }}
                keyExtractor={item => item.name}
           />
         </List>
        );
    }
  render() {
    return (
         <Card>
           <CardSection>
            <Input
               placeholder="Name/Specialization"
               label="Search"
               onChangeText={(text) => { this.setState({ search: text }); }}
               value={this.state.search}

            />
           </CardSection>
           <CardSection>
             <Button onPress={this.searchDoctors.bind(this)}>
               Search
             </Button>
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
          {this.renderDocList()}
          </CardSection>
        </Card>
     );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};
export default connect(mapStateToProps)(SearchDoctor);
