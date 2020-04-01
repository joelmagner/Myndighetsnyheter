import React from 'react';
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as theme from '../Theme/Theme';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from "../screens/Feed";
const { width, height } = Dimensions.get('window');

export interface Props {
  destinations: any,
  navigation: any,
  article:any,
  onPress,
  expandArticle:false,
  navigationOptions: {
    header: any
  }
}

export class Article extends React.Component<Props> {
  scrollY = new Animated.Value(0);
  changeScreen = () => {
    //Function to navigate to the next screen
    this.props.navigation.navigate('Feed');
  };

  
  article = this.props.navigation.getParam('article');
  
  state = {
    animationValue : new Animated.Value(180),
    expandText: false
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack(null)}>
            <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-horiz" color={theme.colors.white} size={theme.sizes.font * 1.5} />
          </TouchableOpacity>
        </View>
      ),
      headerTransparent: true,
    }
  }

  onPress = () => {
    this.setState({
      articleText: this.article.description
    }),
    this.setState({
      expandText: true
    })
  }

  animatedStyle = {
    width : this.state.animationValue,
    height : this.state.animationValue
  }

  renderDots = () => {
    const article = this.props.navigation.getParam('article');
    const dotPosition = Animated.divide(this.scrollY, width);

    return (
      <View style={[ styles.flex, styles.row, styles.dotsContainer ]}>
        {article.images.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item}-${index}`}
              style={[styles.dots, { opacity }]}
            />
          )
        })}
      </View>
    )
  }

  renderRatings = (rating) => {
    const stars = new Array(5).fill(0);
    return (
      stars.map((_, index) => {
        const activeStar = Math.floor(rating) >= (index + 1);
        return (
          <FontAwesome
            name="star"
            key={`star-${index}`}
            size={theme.sizes.font}
            color={theme.colors[activeStar ? 'active' : 'gray']}
            style={{ marginRight: 4 }}
          />
        )
      })
    )
  }



  render() {
    const article = this.props.navigation.getParam('article');
    return (
      <View style={styles.flex}>
        <View style={[styles.flex]}>
          <ScrollView
            horizontal
            pagingEnabled={true}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={400}
            snapToAlignment="center"
            
          >
            {
              article.images.map((img, index) => 
                <Image
                  key={`${index}-${img}`}
                  source={{ uri: img }}
                  resizeMode='cover'
                  style={{ width, height: width }}
                />
              )
            }
          </ScrollView>
          {this.renderDots()}
        </View>
        <Animated.View style={[styles.flex, this.state.expandText ? styles.contentExpand : styles.content ]}>
          <View style={[styles.flex, styles.contentHeader]}>
            <Image style={[styles.avatar, styles.shadow]} source={{ uri: article.user.avatar }} />
              <ScrollView
              pagingEnabled={true}
              scrollEnabled
              showsVerticalScrollIndicator={true}
              snapToAlignment="center"
              decelerationRate={0}
              scrollEventThrottle={400}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollY } } }])}
              >
              <Text style={styles.title}>{article.title}</Text>
              <View style={[
                styles.row,
                { alignItems: 'center', marginVertical: theme.sizes.margin / 2 }
              ]}>
                {this.renderRatings(article.rating)}
                <Text style={{ color: theme.colors.active }}>
                  {article.rating} 
                </Text>
                <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
                  ({article.reviews} Views)
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.description} onPress={() => this.onPress()}>
                  {this.state.expandText ? this.article.description : this.article.description.slice(0, 180)+"..."}
                <Text style={{color: theme.colors.active}}>{this.state.expandText ? "" : "Läs mer"}</Text>
              </Text>
              </TouchableOpacity>
              </ScrollView>
          </View>
        </Animated.View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentExpand: {
    flex: 3
  },
  contentHeader: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: 'bold'
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption
  }
});

const AppNavigator = createStackNavigator({Article});
  
export default createAppContainer(AppNavigator);