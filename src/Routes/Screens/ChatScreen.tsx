import React, { useState, useEffect } from 'react'
import { View, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, KeyboardAvoidingView, LogBox, StatusBar, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from 'firebase';
import { MatchesStackNavProps } from '../MatchesStackNavigator/MatchesParamList';
import * as _ from 'lodash';
import { getUserPhoto, makeChatPath } from '../../utilities/functions';
import { useStateContext } from '../../context/state';
import { Message } from '../../models/Message';
import { renderBubble, renderInputToolbar } from '../../Components/ChatComponents';
import { Body, Button, Container, Header, Icon, Left, Right } from 'native-base';
import AppTheme from '../../res/colors';
import AppStyles from '../../res/styles';
import { material } from 'react-native-typography';
import ApiCalls from '../../network/ApiCalls';


export default function ChatScreen({ route, navigation }: MatchesStackNavProps<"Chat">) {
    var globalMessages: Message[] = [];
    const { context } = useStateContext();
    const [state, setState] = useState({
        messages: [] as Message[],
    });
    useEffect(() => {
        if (context.UserData === undefined) {
            return
        }
        var chatPath = makeChatPath(context.UserData, route.params.User)
        listenMessages(chatPath + "/Chat");
        return () => {
            removeUnreadMessages(chatPath);
            removeListener(chatPath + "/Chat");
        };
    }, []);

    const deQueue = () => {
        let msg: Message[] = [];
        globalMessages.forEach(message => {
            msg = GiftedChat.append(msg, [message]);
        });
        setState({ messages: msg });
    };
    const messageDeQueue = _.debounce(deQueue, 100);
    const listenMessages = (path: string) => {
        firebase
            .database()
            .ref(path)
            .orderByChild('createdAt')
            .limitToLast(100)
            .once('value', function (snapshot) {
                var childData = snapshot.val();
                var newMessage = childData;
                var messagesArr: Message[] = [];
                if (newMessage) {
                    Object.values(newMessage).forEach(element => {
                        let msg = element as Message;
                        msg.createdAt = new Date(msg.createdAt)
                        messagesArr.push(msg);
                    });
                    messagesArr = messagesArr.sort((a, b) => {
                        return a.timestamp! - b.timestamp!
                    });
                    messagesArr.forEach(element => { globalMessages.push(element); });

                    messageDeQueue();
                }
                listenNewMessages(path);

            });
    };
    const listenNewMessages = async (url: string) => {
        let firstMessage = true
        firebase
            .database()
            .ref(url)
            .orderByChild('createdAt')
            .limitToLast(1)
            .on('child_added', function (snapshot) {
                if (firstMessage) {
                    firstMessage = false
                    return
                }
                var newMessage = snapshot.val();
                if (newMessage) {
                    let msg = newMessage as Message;
                    msg.createdAt = new Date(msg.createdAt)
                    globalMessages.push(msg);
                    messageDeQueue();
                }
            });
    };
    const removeUnreadMessages = async (path: string) => {
        firebase
            .database()
            .ref(path)
            .update({ ["unread" + context.UserData?.id]: false });
    };
    const removeListener = async (path: string) => {
        firebase
            .database()
            .ref(path)
            .off('child_added');
    };

    const onSend = (messageToSend: Message[]) => {
        // TO DO IMPLEMENT MESSAGE URL
        var chatPath = makeChatPath(context.UserData!, route.params.User)

        var url = chatPath + "/Chat"
        var chatRef = firebase.database().ref(chatPath);

        var messageRef = firebase.database().ref(url);
        for (let i = 0; i < messageToSend.length; i++) {
            const { text, user, _id } = messageToSend[i];
            if (text === '') {
                return;
            }
            const messageForBackend = {
                text,
                _id,
                user,
                sent: true,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                timestamp: firebase.database.ServerValue.TIMESTAMP,

            };
            if (typeof (_id) === "string") {
                messageRef.child(_id).set(messageForBackend);
            }
            chatRef.update({ ["unread" + route.params.User.id]: true, lastMessage: messageForBackend });

            ApiCalls.NotifyMessage(route.params.User.id, text)
            return;
        }
    };

    return (
        <Container style={{ paddingBottom: 5 }}>
            <Header style={{ backgroundColor: AppTheme.Header }}>
                <StatusBar backgroundColor={AppTheme.Header} barStyle="light-content" animated />


                <Left>
                    <Button onPress={() => navigation.goBack()} transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("User", { User: route.params.User })}>
                        <Text style={[material.headlineWhiteObject]}>{route.params.User.handle}</Text>
                    </TouchableWithoutFeedback>
                </Body>
                <Right>
                </Right>

            </Header>
            <View style={{ flex: 1 }}>
                <GiftedChat
                    placeholder="Mesajınız"
                    messagesContainerStyle={{ backgroundColor: '#fff' }}

                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: linkStyle,
                        },
                    ]}
                    renderBubble={renderBubble}
                    renderInputToolbar={(props) => renderInputToolbar(props)}
                    messages={state.messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: context.UserData!.id,
                        name: context.UserData!.handle,
                        avatar: getUserPhoto(context.UserData!)
                    }}
                    textInputProps={{
                        autoCorrect: false,
                        returnKeyType: 'done',
                    }}
                />
                {Platform.OS === "ios" ?
                    (<KeyboardAvoidingView />)
                    :
                    (<KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={-230} />
                    )
                }


            </View>
        </Container>
    );


};

