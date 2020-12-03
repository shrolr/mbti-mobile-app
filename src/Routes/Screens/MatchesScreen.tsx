import { Content } from 'native-base';
import React, { useEffect } from 'react'
import { View, Text, ScrollView, FlatList, Platform, SafeAreaView } from 'react-native'
import { material } from 'react-native-typography';
import { ListEmptyComponent } from '../../Components';
import ChatCard from '../../Components/ChatCard';
import UserCard from '../../Components/UserCard';
import ActionHelper from '../../context/ActionHelper';
import { useStateContext } from '../../context/state';
import AppTheme from '../../res/colors';
import { MatchesStackNavProps } from '../MatchesStackNavigator/MatchesParamList';


export default function MatchesScreen({ navigation }: MatchesStackNavProps<"Matches">) {
    const { context, dispatch } = useStateContext();
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // The screen is focused
            // Call any action
            if (dispatch) {
                ActionHelper.FetchMatches(dispatch)
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (dispatch) {
            ActionHelper.FetchMatches(dispatch!)
        }
    }, []);
    if (context.Matches) {
        // TO DO This block is never called?
        if (context.Matches.length <= 0) {
            return (
                <ListEmptyComponent type="Feather" icon="message-circle" text={"Yeni eşleşmeler için kaydır"} />
            )
        }
    } else {
        return (
            <ListEmptyComponent type="Feather" icon="message-circle" text={"Yeni eşleşmeler için kaydır"} />
        )
    }
    const dumbComponent = () => {
        console.log(JSON.stringify(context.Matches))

        return null
        // return (
        //     <Text style={[material.display1, { marginLeft: 20, marginTop: Platform.OS === "android" ? 20 : 0, marginBottom: 10, color: AppTheme.Primary }]}>Eşleşmeler</Text>
        //     <ScrollView horizontal style={{ marginLeft: 20, flexDirection: "row" }}>

        //         {
        //             context.Matches!.map((User) => {
        //                 return null
        //                 return (
        //                     <UserCard Navigation={navigation} key={User.id} User={User} />
        //                 )
        //             })
        //         }
        //     </ScrollView>
        // )
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
            <View>
                {dumbComponent()}

            </View>
            <Text style={[material.display1, { marginLeft: 20, marginTop: 0, marginBottom: 10, color: AppTheme.Primary }]}>Mesajlar</Text>
            {/* TO DO  UPDATE _ID WİTH ID */}
            <FlatList style={{ flex: 1 }}
                keyExtractor={item => item._id}
                data={context.Matches}
                renderItem={({ item }) => (
                    <ChatCard User={item} Navigation={navigation} />
                )}
            />
        </SafeAreaView>
    )
}
