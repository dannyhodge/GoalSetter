import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface HeaderProps {
  title: string;
  navigation: any;
}

export class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps){
    super(props);
  }
  openMenu = () => {
    this.props.navigation.navigation.toggleDrawer();
  }

  render() {
  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={this.openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
   
  },
  icon: {
    position: 'absolute',
    left: 2,
    color: 'white',
  }
});


export default Header;

