import React from "react";
import {   
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity 
} from 'react-native';
import { createAppContainer, NavigationScreenProp, NavigationRoute, NavigationScreenConfig, NavigationScreenOptionsGetter } from 'react-navigation';
import { createStackNavigator, NavigationStackScreenProps } from 'react-navigation-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import * as theme from "../Theme/Theme";


const { width, height } = Dimensions.get('window');

const mocks = [{
  id: 1,
  user: {
    name: 'Folkhälsomyndigheten',
    avatar: 'https://scontent.farn1-1.fna.fbcdn.net/v/t1.0-9/10649978_320342284800209_6027466966092260026_n.jpg?_nc_cat=1&_nc_sid=85a577&_nc_oc=AQlnASOm2frZcstMl5_5nRZAvKZiGRW9drLFWzs-53UqPFByDLIeqMqK9AhZZwmLg9Q&_nc_ht=scontent.farn1-1.fna&oh=1f7fd2d8394510d2898bc78171788067&oe=5EA6928A',
  },
  saved: true,
  location: 'Stockholm',
  temperature: 34,
  title: 'Vaccin kan komma tidigare än väntat',
  description: `Myndigheterna ger samlad information om läget när det gäller covid-19, och svarar på frågor.

Medverkar gör Johanna Sandwall, krisberedskapschef och Jenny Rehnman, avdelningschef, Socialstyrelsen, Mikael Tovfesson, chef för enheten för skydd mot informationspåverkan, Myndigheten för samhällsskydd och beredskap och Anders Wallensten, biträdande statsepidemiolog, Folkhälsomyndigheten.\
  
Tid: kl. 14.00
Adress: Lokal Strix, von Eulers väg 4 b, Solna.

Gruppen ska bestå av experter inom smittskydd, epidemiologi, virologi och klinisk infektionsmedicin. Gruppens uppgift blir att stödja myndigheten i det fortsatta arbetet med pandemin.

– Det är av största vikt att vi som expertmyndighet har snabb tillgång till råd från personer som är väl förankrade i det kliniska och vetenskapliga fältet och som tillsammans med våra egna experter kan diskutera läget och insatserna framåt. Därför har jag fattat beslut om att inrätta denna rådgivande referensgrupp, säger Johan Carlson, Folkhälsomyndighetens generaldirektör.

Några formella beslut kommer inte att fattas i samband med mötena, gruppen blir endast rådgivande. Gruppen formeras nu och de personer som kommer att ingå presenteras inom kort.
`,
  rating: 4.5,
  reviews: 3212,
  preview: 'https://www.folkhalsomyndigheten.se/contentassets/4a26a70681864606847f21db5da8c1c8/covid-19-23311-cdc.jpg?width=600&height=400&mode=crop',
  images: [
    'https://www.folkhalsomyndigheten.se/contentassets/4a26a70681864606847f21db5da8c1c8/covid-19-23311-cdc.jpg?width=600&height=400&mode=crop',
    'https://scontent.farn1-1.fna.fbcdn.net/v/t1.0-9/10649978_320342284800209_6027466966092260026_n.jpg?_nc_cat=1&_nc_sid=85a577&_nc_oc=AQlnASOm2frZcstMl5_5nRZAvKZiGRW9drLFWzs-53UqPFByDLIeqMqK9AhZZwmLg9Q&_nc_ht=scontent.farn1-1.fna&oh=1f7fd2d8394510d2898bc78171788067&oe=5EA6928A',
  ]
},
{
  id: 2,
  user: {
    name: 'Svenska Dagbladet',
    avatar: 'https://ocast-media-image.s3.amazonaws.com/0StpcodUGU5x7f7V_400x400.jpg',
  },
  saved: true,
  location: 'Stockholm',
  temperature: 133,
  title: 'Inga skolor stängs',
  description: '”Stänga skolor för tidigt har ingen effekt”',
  rating: 3.3,
  reviews: 3212,
  preview: 'https://images.svd.se/v2/images/84aa8bf2-7d93-490d-92aa-dd44e14447b4?fit=crop&h=1000&q=80&upscale=true&w=2000&s=f347911a25af142c3ea38e2f449c532fe37f4d5b',
  images: [
    'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
  ]
},
{
  id: 3,
  user: {
    name: 'WHO',
    avatar: 'https://www.visionuk.org.uk/wp-content/uploads/who-logo-768x994.jpg',
  },
  saved: true,
  location: 'Bryssel',
  temperature: 345,
  title: '200.000 smittade',
  description: 'Pandemin fortsätter att bre ut sig i världen, WHO varnar',
  rating: 3.3,
  reviews: 3212,
  preview: 'https://pbs.twimg.com/media/EPcxME_W4AAnV0z?format=png&name=900x900',
  images: [
    'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
  ]
}
];



const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articles: {
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: (width - (theme.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
    backgroundColor: theme.colors.white,
    width: width - (theme.sizes.padding * 4),
  },
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  }
});


export interface Props {
  destinations: any,
  navigation: any,
  navigationOptions: {
    header: any
  }
}

export class Feed extends React.Component<Props> {
  
  scrollX = new Animated.Value(0);
  constructor(props){
    super(props);
  }
  static state = {
    notificationsActive: false,
  }
  
  static onPress = () => {
    return Feed.state.notificationsActive = !Feed.state.notificationsActive
  }

  static navigationOptions:any = ({notificationsActive}) => {
    return {
      header: (
        <View style={[styles.flex, styles.row, styles.header]}>
        <View>
        <Text style={{ color: theme.colors.caption }}>
          <FontAwesome
            name="search"
            size={theme.sizes.font}
            color={theme.colors['gray']}
            /> Search for news</Text>
        <Text style={{ fontSize: theme.sizes.font * 2 }}>News</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => Feed.onPress()}>
            {notificationsActive ? 
              <FontAwesome
              name={"bell"}
              size={theme.sizes.title}
              color={theme.colors['gray']}/>
              :
              <FontAwesome
              name={"bell-slash"}
              size={theme.sizes.title}
              color={theme.colors['gray']}/>
            }
            {/* <Image style={styles.avatar} source={{ uri: 'http://joelmagner.com/images/portraitbw.png'}} /> */}
          </TouchableOpacity>
        </View>
      </View>
    
    ),
    title: null
  }
}


  static defaultProps = {
    destinations: mocks
  };
  
  render() {
    
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
      >
        {this.renderDestinations()}
        {this.renderRecommended()}
      </ScrollView>
    );
  }

  renderDots() {
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={[
        styles.flex, styles.row,
        { justifyContent: 'center', alignItems: 'center', marginTop: 10 }
      ]}>
        {this.props.destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index -1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, { borderWidth: borderWidth } ]}
            />
          )
        })}
      </View>
    )
  }

  renderRatings(rating) {
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
          />
        )
      })
    )
  }

  renderDestinations = () => {
    return (
      <View style={[ styles.column, styles.destinations ]}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow:'visible', height: 280 }}
          data={this.props.destinations}
          keyExtractor={(item:any, index:any) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }} }])}
          renderItem={({ item }) => this.renderDestination(item)}
        />
        {this.renderDots()}
      </View>
    );
  }

  renderDestination = item => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Article', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: item.preview }}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            </View>
            <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.user.name}</Text>
              <Text style={{ color: theme.colors.white }}>
                <Octicons
                  name="location"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location}</Text>
              </Text>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
              {/* TODO: <Text style={styles.rating}>{item.rating}</Text> */}
            </View>
          </View>
        </ImageBackground>
          <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
            <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
              {item.title}
            </Text>
            <View style={[ styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
              <Text style={{ color: theme.colors.caption }}>
                {item.description.split('').slice(0, 50)}...
              </Text>
              <FontAwesome
                name="chevron-right"
                size={theme.sizes.font * 0.75}
                color={theme.colors.caption}
              />
            </View>
          </View>
      </TouchableOpacity>
    )
  }

  renderRecommended = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended ]}>
        <View
          style={[
            styles.row,
            styles.recommendedHeader
          ]}
        >
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.caption }}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[ styles.shadow, { overflow: 'visible' }]}
            data={this.props.destinations}
            keyExtractor={(item:any, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderRecommendation(item, index)}
          />
        </View>
      </View>
    );
  }

  renderRecommendation = (item, index) => {
    const { destinations }:any = this.props;
    const isLastItem = index === destinations.length - 1;
    return (
      <View style={[
        styles.flex, styles.column, styles.recommendation, styles.shadow, 
        index === 0 ? { marginLeft: theme.sizes.margin } : null,
        isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
      ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
          <View style={[ styles.flex, styles.row, styles.recommendationOptions ]}>
            <Text style={styles.recommendationTemp}>
              {item.temperature} Views
            </Text>
            <FontAwesome
              name={item.saved ? 'bookmark' : 'bookmark-o'}
              color={theme.colors.white}
              size={theme.sizes.font * 1.25}
            />
          </View>
        </View>
        <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: theme.sizes.padding / 4.5, }}>{item.title}</Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View style={[
            styles.row,
            { alignItems: 'center', justifyContent: 'space-between', marginTop: theme.sizes.margin }
          ]}>
            {this.renderRatings(item.rating)}
            <Text style={{ color: theme.colors.active }}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    )
  }

}


const AppNavigator = createStackNavigator({Feed});

export default createAppContainer(AppNavigator);
