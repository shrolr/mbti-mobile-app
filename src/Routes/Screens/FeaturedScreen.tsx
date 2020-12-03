import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform } from "react-native";
import { HomeStackNavProps } from "../HomeStackNavigator/HomeParamList";
import Swiper from 'react-native-deck-swiper';
import Modal from 'react-native-modal';
import PersonStack from "../../Components/PersonStack";
import { User } from "../../models/User";
import ApiCalls from "../../network/ApiCalls";
import { AXIOS_OK } from "../../utilities/constants";
import { ListEmptyComponent } from "../../Components";
import ActionHelper from "../../context/ActionHelper";
import { useStateContext } from "../../context/state";

function HomeScreen({ navigation }: HomeStackNavProps<"Home">) {
  const { context, dispatch } = useStateContext();

  useEffect(() => {
    // TO DO FETCH FEATURED USERS
    if (dispatch) {
      ActionHelper.FetchMyProfile(dispatch)
    }
    getFeaturedUsers()
    return () => {
      // TO DO CLEAN UP
    }
  }, [])
  const [modalVisible, setModalVisible] = useState(false)
  const [featuredUsers, setFeaturedUsers] = useState({ Users: [] as User[] })
  const getFeaturedUsers = async () => {
    let result = await ApiCalls.getFeaturedUsers();
    if (result?.status === AXIOS_OK) {
      if (result?.data) {
        let Users = result.data as [User]
        setFeaturedUsers({ Users })
      }
    }
    else {
      //  console.log("Can not fetch data", result)
    }
  }
  const chatNow = () => {

  }
  const onLike = (index: number) => {
    let User = featuredUsers.Users[index]
    ApiCalls.like(User.id)
  }
  const onDissLike = (index: number) => {
    let User = featuredUsers.Users[index]
    ApiCalls.disslike(User.id)
  }
  return (
    featuredUsers.Users.length > 0 ? (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Modal style={{ margin: 0, flex: 1 }} isVisible={modalVisible}>
            {/* <LinearGradient
              colors={['#e74c3c', '#fd79a8',]}
              style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ color: "white", fontSize: 40, marginBottom: 20 }}>{"state.person.fullname"} ile Eşleştin</Text>
                <Image style={{ alignSelf: "center", backgroundColor: "blue", borderRadius: 75, height: 150, width: 150 }} source={{ uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }} />
                <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: 10 }}>Ayşeye Merhaba De </Text>
                <Button onPress={() => chatNow()} style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center", borderColor: "white", borderWidth: 1, marginTop: 20 }}>
                  <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Kaydırmaya Devam Et </Text>
                </Button>
              </View>
            </LinearGradient> */}
          </Modal>
        </View>
        <Swiper
          cards={featuredUsers.Users}
          renderCard={(User) => {
            return (
              <PersonStack navigation={navigation} User={User} key={User.id} />
            )
          }}
          onSwipedAll={() => { console.log('onSwipedAll') }}
          cardIndex={0}
          useViewOverflow={Platform.OS === 'ios'}
          backgroundColor={'#fff'}
          showSecondCard={true}
          stackSize={2}
          stackSeparation={0}
          onSwipedLeft={(index) => onDissLike(index)}
          onSwipedRight={(index) => onLike(index)}
          overlayLabels={{
            left: {

              title: 'IIHH',
              style: {
                label: {
                  color: '#e74c3c',
                  borderWidth: 5,
                  borderColor: "#e74c3c",
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 40,
                  marginLeft: -40
                }
              }
            },
            right: {
              title: 'MMMH',
              style: {
                label: {
                  color: '#2ecc71',
                  borderWidth: 5,
                  borderColor: "#2ecc71"
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 40,
                  marginLeft: 40
                }
              }
            },
          }}
        >
        </Swiper>
      </View>
    ) : <ListEmptyComponent icon="staro" text="uygun match yok" type="AntDesign" />



  );
}

export default HomeScreen;
