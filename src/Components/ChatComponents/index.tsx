import { Icon, Input, Item, Image } from "native-base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Bubble, InputToolbarProps } from "react-native-gifted-chat";
import AppTheme from "../../res/colors";


const renderCustomInputToolbar = (props: any) => {
    const { text, messageIdGenerator, user, onSend } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onSend(
                    [{ text: text, user: user, _id: messageIdGenerator() }],
                    true,
                );
            }}
            style={{
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 20,
                marginBottom: 0,
                marginTop: 5,
            }}>
            <Icon
                name="send"
                type="FontAwesome"
                style={{ color: AppTheme.Header, textAlign: 'center', fontSize: 25 }}
            />
        </TouchableOpacity>
    );
}

export const renderBubble = (props:any) => {
    return (<Bubble {...props}
        wrapperStyle={{
            left: {
                backgroundColor: "#efefef",
                color:"#fff"
            },
            right: {
                backgroundColor: AppTheme.Header
            }
        }} />
    )
}

export const renderInputToolbar = (props: any) => {
    const { text } = props

    return (
        <View {...props} style={{ zIndex: 999, flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Item rounded>
                        <Input
                            autoCorrect={false}
                            value={text}
                            onChangeText={props.onTextChanged}
                            style={{ color: '#333', height: 40 }}
                            placeholder="Mesajınız"
                        />
                    </Item>
                </View>
                {renderCustomInputToolbar(props)}
            </View>
        </View>
    );
};

