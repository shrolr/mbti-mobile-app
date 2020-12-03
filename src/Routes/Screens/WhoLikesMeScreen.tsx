import React, { useEffect, useContext, useState } from 'react'
import { FlatList, Image, SafeAreaView, Dimensions } from 'react-native';
import { Card } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { ListEmptyComponent } from '../../Components';
import { PersonStackAlt } from '../../Components';
import { User } from '../../models';
import { getUserPhoto } from '../../utilities/functions';
import ActionHelper from '../../context/ActionHelper';
import { useStateContext } from '../../context/state';
import ApiCalls from '../../network/ApiCalls';
import { ScreenWidth } from '../../utilities/constants';
import { WhoLikesMetackNavProps } from '../LeaderBoardStackNavigator/WhoLikesMeParamList';

const width = Dimensions.get("window").width

const PeopleWhoLikeMe = ({ navigation }: WhoLikesMetackNavProps<"WhoLikesMe">) => {
    const [state, setstate] = useState({ User: {} as User, modalVisible: false })
    const { context, dispatch } = useStateContext();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            if (dispatch) {
                ActionHelper.FetchWhoLikesMe(dispatch)
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    const handleClick = async (User: User) => {
        rewardUser(User)
    }

    const rewardUser = (User: User) => {
        setstate(prevState => {
            return {
                ...prevState,
                User,
                modalVisible: true
            };
        });
    }
    const onAction = (result: boolean) => {
        if (result) {
            ApiCalls.like(state.User.id).then((response) => {
                ActionHelper.FetchMatches(dispatch!)
                ActionHelper.FetchWhoLikesMe(dispatch!)
            })
        }
        else {
            // To Remove From List Add extra apicall
        }
        setstate(prevState => {
            return {
                ...prevState,
                modalVisible: false
            };
        });
    }
    const renderItem = (User: User) => {
        return (
            <Card style={{ width: ScreenWidth / 2 - 1 }}>
                <TouchableOpacity onPress={() => handleClick(User)}>
                    <Image blurRadius={25} style={{ height: 200, flex: 1 }} source={{ uri: getUserPhoto(User) }} />
                </TouchableOpacity>
            </Card>
        )
    }
    if (context.WhoLikesMe) {
        if (context.WhoLikesMe.length <= 0) {
            return (
                <ListEmptyComponent icon="database" type="Octicons" text={"Sizi beğenen kimse yok"} />
            )
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
            <Modal onBackButtonPress={() => setstate(prevState => { return { ...prevState, modalVisible: false } })} style={{ marginTop: 40, borderRadius: 30, overflow: "hidden", flex: 1 }} isVisible={state.modalVisible}>
                <PersonStackAlt onAction={onAction} key={state.User.id} User={state.User} />
            </Modal>
            {/* TO-DO Implement list Empty Component */}
            <FlatList
                numColumns={2}
                data={context.WhoLikesMe!}
                renderItem={({ item }) => (
                    renderItem(item)
                )
                }
            />

        </SafeAreaView>
    )
}


PeopleWhoLikeMe.navigationOptions = () => ({
    header: null
});

export default PeopleWhoLikeMe
