/* GuestProfile */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import data from './dummy/data.json';

const Timestamp = require('react-timestamp');

export default class GuestProfile extends Component {
    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.view_crud_note_page = this.view_crud_note_page.bind(this);
    };

    // matching receptivity to emojis {0-4} where 4 is the best and 0 is the worst
    id_to_emoji = [":smirk:", ":slightly_smiling_face:", ":grinning:", ":smiley:", ":smile:"];

    /********************** Helper functions section **********************/

    // convert string to int and map it to an index from our dummy data
    get_name_int = (name) => {
        val = 0;
        for(let i = 0; i < name.length; i++) {
            val += name.charCodeAt(i);
        }
        return val % 4;
    };

    // gets dummy values from data.json
    get_data = () => {
        return(data.guests[this.get_name_int(this.props.name)]);
    };

    // stores dummy values from data.json
    profile_data = this.get_data();

    // gets emoji from receptive value
    get_receptive = () => {
        return(nodeEmoji.get(this.id_to_emoji[this.profile_data.receptive]));
    };

    //
    view_crud_note_page = () => {
      this.props.navigator.push({
          screen: 'CRUDnote', // unique ID registered with Navigation.registerScreen
          passProps: {
              name: this.props.name
          }, // Object that will be passed as props to the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
          animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
          backButtonHidden: false, // hide the back button altogether (optional)
          navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
          navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
    };
    /********************** Render functions section **********************/

    // renders name on profile page
    render_name = () => {
        return (
            <Text style={styles.name}>
                {this.props.name}
            </Text>
        );
    };

    // renders receptive value (emoji?)
    render_receptive = () => {
        return (
            <Text>
                Receptive: {this.get_receptive()}
            </Text>
        );
    };

    // renders last interacted
    render_interacted = () => {
        return (
            <Text>
                Last Interacted: <Timestamp time={this.profile_data.last_interacted} component={Text}/>
            </Text>
        );
    };

    // render description
    render_description = () => {
        return (
            <Text>
                {this.profile_data.description}
            </Text>
        );
    };

    // render notes
    render_notes = () => {
        let note_list = this.profile_data.notes;
        if(note_list) {
            return (
                <View style={styles.note_section}>
                    <Text style={styles.notes}>
                        Notes:
                    </Text>
                    <FlatList
                        data={note_list}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.note}
                                onPress={() => this.view_crud_note_page()}
                            />
                        )}
                        style={styles.note}
                        keyExtractor={item => item.note}
                    />
                </View>
            );
        }
    };

    /********************** Setup screen **********************/

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        style={styles.profile_image}
                        source={require("./dummy/default.jpg")}
                    />
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_receptive()}
                        {this.render_interacted()}
                        {this.render_description()}
                    </View>
                </View>
                {this.render_notes()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    top: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "nowrap",
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    note_section: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
        padding: 10,
    },
    note: {
        flex: 1,
        flexDirection: 'row',
    },
    notes: {
        fontSize: 22,
    },
    name: {
        fontSize: 22,
    },
    profile_image: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 35,
    },
    profile_info: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexDirection: 'column',
        paddingLeft: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});