import React, { useEffect } from 'react'
import { Text, FlatList, BackHandler, SafeAreaView, StatusBar } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, ListItem } from 'native-base';
import { SettingsStackNavProps } from '../SettingsStackNavigator/SettingsParamList'
import AppStyles from '../../res/styles';
import AppTheme from '../../res/colors';
import { useStateContext } from '../../context/state';
import { ActionType } from '../../context/reducer';
import { material } from 'react-native-typography';


const genderData = ["Kadın", "Erkek", "Hepsi"]

export default function InterestScreen({ navigation, route }: SettingsStackNavProps<"Interest">) {

    const { context, dispatch } = useStateContext();

    const setGender = (index: number) => {
        route.params.setGender(index)
        let UserData = Object.assign({}, context.UserData);
        UserData.lookingForGender = index;
        dispatch!({ type: ActionType.SET_USER_DATA, payload: { UserData } })

        navigation.goBack()
    }
    return (
        <Container>
            <Header style={{ backgroundColor: AppTheme.Header }}>
                <StatusBar backgroundColor={AppTheme.Header} barStyle="light-content" animated />

                <Left>
                    <Button onPress={() => navigation.goBack()} transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Text style={[material.headlineWhiteObject]}>İlgilendiğim</Text>

          
                </Body>
             
            </Header>
            <FlatList data={genderData} renderItem={({ item, index }) =>
                <ListItem onPress={() => setGender(index)} style={{ flexDirection: 'row', flex: 1, flexWrap: 'nowrap', alignItems: 'center' }}>
                    <Text style={material.subheading}>{item}</Text>
                    {
                        index === context.UserData?.lookingForGender && <Icon type='Entypo' style={{ color: AppTheme.Primary, fontSize: 20, position: 'absolute', right: 20, marginRight: 0 }} name={'check'} />
                    }
                </ListItem>
            }
                keyExtractor={item => item}
            />
        </Container>


    );
}
