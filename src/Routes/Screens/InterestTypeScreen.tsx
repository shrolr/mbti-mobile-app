import React, { useEffect } from 'react'
import { FlatList, BackHandler, SafeAreaView, StatusBar, Alert } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, ListItem, Switch, Text } from 'native-base';
import { SettingsStackNavProps } from '../SettingsStackNavigator/SettingsParamList'
import AppStyles from '../../res/styles';
import AppTheme from '../../res/colors';
import { useStateContext } from '../../context/state';
import { ActionType } from '../../context/reducer';
import { MbtiTypes, mbtiTypes } from '../../res/mbti-types';
import ApiCalls from '../../network/ApiCalls';



export default function InterestTypesScreen({ navigation, route }: SettingsStackNavProps<"InterestTypes">) {

    const { context, dispatch } = useStateContext();
    const onInterestChange = (checked: boolean, SelectedType: MbtiTypes) => {
        let UserData = Object.assign({}, context.UserData);
        if (checked) {
            UserData.lookingForType.push(SelectedType.title)
        }
        else {
            if (UserData.lookingForType.length === 1) {
                Alert.alert(
                    'Uyarı',
                    SelectedType.title + ' Kaldırılamıyor.\nUyuglamayı kullanabilmek için en az 1 seçiminiz olması gerekiyor.',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                );
                return
            }
            UserData.lookingForType = UserData.lookingForType.filter((val) => val !== SelectedType.title)
        }
        dispatch!({ type: ActionType.SET_USER_DATA, payload: { UserData } })
        ApiCalls.updateInterestedTypes( UserData.lookingForType)
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
                    <Text style={AppStyles.title}>İlgilendiğim Tipler</Text>
                </Body>

            </Header>
            <FlatList data={mbtiTypes} renderItem={({ item }) =>
                <ListItem  >
                    <Body>
                        <Text style={{ fontSize: 16 }}>{item.title}</Text>
                        <Text note>{item.detail}</Text>
                    </Body>
                    <Right>
                        <Switch value={context.UserData?.lookingForType.includes(item.title)} onValueChange={(value) => onInterestChange(value, item)} />
                    </Right>
                </ListItem>
            }
                keyExtractor={item => item.title}
            />
        </Container>


    );
}
