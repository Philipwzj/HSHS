import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';
import renderSeperator from "./UI/renderSeperator";
import renderLoader from "./UI/renderLoader";
import dupNavFix from "../dupNavFix";
import {List, ListItem, Icon} from "react-native-elements";
// The time from start of day until lottery release
const lotteryReleaseTimeInMillis = 77400000;

// Props:
// winners: string
// winnerEntered : true/false
class Lottery_module extends Component {
	constructor(props) {
		super(props);
    // timeIndex: 0 -> Countdown, 1 -> Winnder unentered, 2 -> winner entered
    this.state = { timeRemaining: "", seconds: 0 };
	}

  // TODO: check database and see if data has been entered, set timeIndex
  componentWillMount() {
    let secs = this.getTimeRemaining();
    this.setState ({ seconds: secs });
  }

  // Decrement counter every second
  componentDidMount() {
    this.interval = setInterval(() => {
      this.countDown();
    }, 1000);
  };

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  // Called once when dashboard is rendered
  getTimeRemaining = () => {
    let now              = new Date();
		let releaseDate      = new Date();

		releaseDate.setHours(0);
		releaseDate.setMinutes(0);
    releaseDate.setSeconds(0);

    let releaseTimestamp = releaseDate.getTime() + lotteryReleaseTimeInMillis;

    let seconds          = ((releaseTimestamp - now) / 1000).toFixed(0);

    return seconds;
  }

  // TODO: Check if page transition works smoothly
  countDown = () => {
      let secs     = this.state.seconds - 1;
      let timeLeft = this.milisecondsToTime(secs);

      this.setState({timeRemaining: timeLeft, seconds: secs});
  }

	milisecondsToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours   = "0";

    if (minutes > 59) {
      hours     = Math.floor(minutes / 60);
      minutes   = minutes - (hours * 60);
      minutes   = (minutes > 10) ? minutes : "0" + minutes;
    }
    seconds     = seconds % 60;

		return (hours >= 10 ? hours : ("0" + hours)) + ":" + minutes + ":" + ((seconds >= 10) ? seconds : "0" + seconds) ;
	}

  //TODO: change Logic to match time change
  //       <View>{(this.state.seconds > 0) ?
	render() {
		return (
      <View>{(this.state.seconds > 0) ?
        (<View style={styles.countDownBlock}>
          <View style={{margin: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: "5%"}}>Status: Countdown till lottery</Text>
    				<Text style={{fontSize: 18, textAlign: "center", letterSpacing: 1.5}}>{this.state.timeRemaining}</Text>
          </View>
        </View>) :
        <View>{(this.props.winnerEntered === false) ?
          (<View style={styles.lotteryBlock}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 20}}>
              <Icon name="phone" />
              <Text style={{marginLeft: 10}}>Please call for lottery winners</Text>
            </View>
            <Button
              color="#rgba(119, 11, 22, 1)"
              onPress={ () => {this.props.popupDialog.show()} }
              title="Enter Winner" />
          </View>) :
          (<View></View>)}
        </View>}
      </View>
		);
	}
}
// <View>
//   { this.state.timeIndex === 0 ?
//     (<View style={styles.countDownBlock}>
//       <View style={{margin: 30}}>
//         <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: "5%"}}>Status: Countdown till lottery</Text>
// 				<Text style={{fontSize: 18, textAlign: "center", letterSpacing: 1.5}}>{this.state.timeRemaining}</Text>
//       </View>
//     </View>) :
//     <View>
//       { this.state.timeIndex === 1 &&
//         <View>
//           <View style={{flexDirection: "row", justifyContent: "center"}}>
//             <Text>Same</Text>
//           </View>
//         </View>
//       }
//     </View>
//   }
// </View>
const styles = StyleSheet.create( {
    countDownBlock: {
      marginTop: "20%",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    lotteryBlock: {
      marginTop: "10%",
      flexDirection: 'column',
    }
});


// TODO: do we need DupNavFix here?
export default Lottery_module;