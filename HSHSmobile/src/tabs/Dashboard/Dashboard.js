import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Button
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {getGuests, getInteractions, getActionItems} from '../../redux/actions.js';

const Icon = require('react-native-vector-icons/Ionicons');

function mapStateToProps(state, ownProps) {
    return {
        actionItems: state.actionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions
    };}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGuests: getGuests,
        getInteractions: getInteractions,
        getActionItems: getActionItems
    };
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.loading = true;
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        }
    };

    componentDidMount() {
        this.makeRemoteRequest();
    };

    makeRemoteRequest = () => {
        this.props.getInteractions();
        this.props.getGuests();
        this.props.getActionItems();
    };

    componentWillUpdate(nextProps, nextState) {
        console.log(this.props.guests);
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderMarkers = () => {

        var markers = [];
        for (var actionItemId in this.props.actionItems) {
            let actionItem = this.props.actionItems[actionItemId];
            let coordinate = {latitude: actionItem.locationCoord.lat, longitude: actionItem.locationCoord.lng};
            markers.push(
                <MapView.Marker
                    coordinate = {coordinate}
                    title = {actionItem.title}
                    description = {actionItem.description}
                    key = {actionItemId}
                />
            )
        }
        return markers;
    };

    // I'm not sure if this is the best way to have logical statements within renders, but it's not the worst way!
    render() {
        return (

            (this.props.loading &&  <ActivityIndicator animating size="large" />) ||


            (!this.props.loading &&
            <View>
                <MapView
                    style = {{
                        height: Dimensions.get('window').height*0.4,
                        width: Dimensions.get('window').width,
                        margin: 0}}
                    initialRegion={{
                        latitude: 42.405804,
                        longitude: -71.11956,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.01,
                    }}>
                    {
                        this.props.actionItems && this.renderMarkers()
                    }
                </MapView>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Button
                    onPress={() => {}}
                    title="Add New Note"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={() => {}}
                        title="Add Action Item"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                <View style={{flexDirection: 'column', alignItems: 'center'}}>

                    <Text>
                        Lottery Status: Number not given out
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                    </View>

                    <Button
                        onPress={() => {}}
                        title="Call on Lottery"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            )
        );
    }
}

const styles = StyleSheet.create({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
