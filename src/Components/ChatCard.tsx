import { StackNavigationProp } from '@react-navigation/stack'
import firebase from 'firebase'
import { ListItem, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, Image, TouchableWithoutFeedback } from 'react-native'
import { material } from 'react-native-typography'
import { useStateContext } from '../context/state'
import { User } from '../models'
import { Message } from '../models/Message'
import { MatchesParamList } from '../Routes/MatchesStackNavigator/MatchesParamList'
import { getAge, getUserPhoto, makeChatPath } from '../utilities/functions'
import LottieView from 'lottie-react-native';


interface IChatCard {
    User: User,
    Navigation: StackNavigationProp<MatchesParamList, "Matches">,
}
//navigation.navigation.n .navigate("ChatScreen", { item: User })
const ChatCard: React.FC<IChatCard> = ({ User, Navigation }) => {
    const { context } = useStateContext();
    const [state, setstate] = useState({ message: {} as Message })
    const [unread, setunread] = useState(false)
    useEffect(() => {
        if (context.UserData === undefined) {
            return
        }

        User.id = User._id;
        var chatPath = makeChatPath(User, context.UserData)
        listenUnreadMessagess(chatPath + "/unread" + context.UserData.id)
        chatNewMessageListener(chatPath + "/lastMessage")
        return () => {
            RemoveNewMessageListener(chatPath + "/lastMessage")
            if (context.UserData === undefined) {
                return
            }
            RemoveUnreadMessageListener(chatPath + "/unread" + context.UserData.id)
        }
    }, [])
    let animation: React.RefObject<LottieView> = React.createRef();

    const listenUnreadMessagess = (path: string) => {
        // TO DO IMPLEMENT IN APP MESSAGE
        firebase
            .database()
            .ref(path)
            .on('value', function (snapshot) {
                var unread = snapshot.val();
                if (unread) {
                    setunread(true)
                }
                else {
                    setunread(false)
                }
            });
    }

    const chatNewMessageListener = (path: string) => {
        // TO DO IMPLEMENT IN APP MESSAGE
        firebase
            .database()
            .ref(path)
            .on('value', function (snapshot) {
                var newMessage = snapshot.val();
                if (newMessage) {
                    let message = newMessage as Message;
                    message.createdAt = new Date(message.createdAt);
                    setstate({ message })
                }
            });
    }
    const RemoveNewMessageListener = (path: string) => {
        firebase
            .database()
            .ref(path)
            .off('value');
    }
    const RemoveUnreadMessageListener = (path: string) => {
        firebase
            .database()
            .ref(path)
            .off('value');
    }

    return (
        <ListItem >
            <TouchableWithoutFeedback onPress={() => Navigation.navigate("User", { User: User })}>

                <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: getUserPhoto(User) }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Navigation.navigate("Chat", { User: User })}>
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    {unread &&
                        <LottieView
                            autoPlay
                            loop={false}
                            style={{
                                position: "absolute",
                                right: -25,
                                top: -15,
                                width: 140,
                                height: 60,
                                backgroundColor: "transparent",
                            }}
                            source={require('../../assets/new3.json')}
                        />
                    }
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[material.headline, { flex: 1 }]} >{User.handle.substring(0, 10)}, {getAge(User.birthDate)} </Text>
                    </View>
                    <Text style={material.subheading}> {state.message.text}</Text>
                    <Text style={[material.caption, { textAlign: "right" }]}>{state.message.createdAt && typeof state.message.createdAt !== "number" && state.message.createdAt.toLocaleDateString("ar-EG") + " " + state.message.createdAt.toLocaleTimeString("tr-TR")}</Text>

                </View>
            </TouchableWithoutFeedback>
        </ListItem >
    )
}
export default ChatCard
