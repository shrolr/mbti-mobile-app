import React, { createRef, useCallback, useEffect, useState } from 'react'
import { StatusBar, View, TouchableOpacity, FlatList, } from 'react-native'
import { Container, Header, Left, Body, Button, Icon, Content, List, ListItem, Text, Right, Input, Label, Item, Switch, Textarea } from 'native-base';
import { SettingsStackNavProps } from '../SettingsStackNavigator/SettingsParamList'
import AppStyles from '../../res/styles';
import AppTheme from '../../res/colors';
import { material } from 'react-native-typography'

import ActionSheet from 'react-native-actions-sheet';
import { useStateContext } from '../../context/state';
import InfoOptions from '../../res/InfoOptions';
import { ActionType } from '../../context/reducer';
import { User } from '../../models';
import ApiCalls from '../../network/ApiCalls';
import _ from 'lodash';


type InfoParent = "look" | "family" | "background" | "lifeStyle";

export default function EditProfileScreen({ navigation, route }: SettingsStackNavProps<"EditProfile">) {
    let actionSheetRef: React.RefObject<ActionSheet> = createRef();
    const { context, dispatch } = useStateContext();
    const User = context.UserData!;
    const [state, setstate] = useState({ data: [] as string[] })
    const [selected, setSelected] = useState({ parent: "look" as InfoParent, key: "" })
    const [bio, setBio] = useState(context.UserData?.bio)
    const showData = (options: string[], parent: InfoParent, key: string) => {
        // setstate data 
        setSelected({ parent, key })
        setstate({ data: options })
        actionSheetRef.current?.setModalVisible()
    }
    const saveUserData = (UserData: User) => {
        dispatch!({ type: ActionType.SET_USER_DATA, payload: { UserData } })
        ApiCalls.updateUserInfo(UserData.info)
        // TO-DO api call to save update user
    }
    const setUserData = (parent: InfoParent, key: string, data: string | boolean) => {
        let UserData = Object.assign({}, context.UserData!);
        if (UserData) {
            if (UserData.info) {
                if (UserData.info[parent]) {
                    UserData.info[parent][key] = data;
                    saveUserData(UserData)
                }
                else {
                    UserData.info[parent] = {}
                    UserData.info[parent][key] = data;
                    saveUserData(UserData)
                }
            }
            else {
                UserData.info = {}
                if (UserData.info[parent]) {
                    UserData.info[parent][key] = data;
                    saveUserData(UserData)
                }
                else {
                    UserData.info[parent] = {}
                    UserData.info[parent][key] = data;
                    saveUserData(UserData)
                }
            }
        } else {
            //sconsole.log("user data can not be found")
        }
        actionSheetRef.current?.setModalVisible(false)

    }
    const updateBio = (bio: string) => {
        ApiCalls.updateUserBio(bio)
        let UserData = Object.assign({}, context.UserData!);
        UserData.bio = bio;
        dispatch!({ type: ActionType.SET_USER_DATA, payload: { UserData } })

    }

    const updateUser = useCallback(
        _.debounce(updateBio, 2000),
        [],
    )
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
                    <Text style={AppStyles.title}>Profil Bilgilerim</Text>
                </Body>
            </Header>
            <Content>


                <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 10, paddingBottom: 10 }}>
                        <Text style={[[material.display1, { fontSize: 30 }], { fontSize: 30 }]}>Bio</Text>

                        <Textarea style={[material.subheading, { minHeight: 80 }]} onChangeText={(val) => {
                            setBio(val)
                            updateUser(val)
                        }} underline={false} rowSpan={-1} bordered placeholder="Hakkınızda yazmak istediğiniz bir şey var mı?" value={bio} />

                    </View>
                    <List>


                        <ListItem itemDivider>
                            <Text style={[material.display1, { fontSize: 30 }]}>Görünüş</Text>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.bodyType, "look", "bodyType")}>
                            <Body>
                                <Text style={material.subheading}>Vücut</Text>
                                <Text note>{User.info?.look?.bodyType}</Text>
                            </Body>
                        </ListItem>

                        <ListItem>

                            <Item style={{ marginLeft: 10 }} inlineLabel>
                                <Label style={material.subheading}>Height</Label>
                                <Input keyboardType="number-pad" style={{ textAlign: "right" }} onChangeText={(text) => setUserData("look", "height", text)} value={User.info?.look?.height} />
                            </Item>

                        </ListItem>




                        <ListItem itemDivider>
                            <Text style={[material.display1, { fontSize: 30 }]}>Genel</Text>
                        </ListItem>


                        <ListItem onPress={() => showData(InfoOptions.Education, "background", "education")}>
                            <Body>
                                <Text style={material.subheading}>Eğitim</Text>
                                <Text note>{User.info?.background?.education}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Work, "background", "employment")}>
                            <Body>
                                <Text style={material.subheading}>İş</Text>
                                <Text note>{User.info?.background?.employment}</Text>
                            </Body>
                        </ListItem>



                        <ListItem onPress={() => showData(InfoOptions.Orientation, "background", "orientation")}>
                            <Body>
                                <Text style={material.subheading}>Yönelim</Text>
                                <Text note>{User.info?.background?.orientation}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Politics, "background", "politics")}>
                            <Body>
                                <Text style={material.subheading}>Politik görüş</Text>
                                <Text note>{User.info?.background?.politics}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.relationType, "background", "relationType")}>
                            <Body>
                                <Text style={material.subheading}>İlişki tipi</Text>
                                <Text note>{User.info?.background?.relationType}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Religion, "background", "religion")}>
                            <Body>
                                <Text style={material.subheading}>Din</Text>
                                <Text note>{User.info?.background?.religion}</Text>
                            </Body>
                        </ListItem>


                        <ListItem itemDivider>
                            <Text style={[material.display1, { fontSize: 30 }]}>Yaşam</Text>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Smoking, "lifeStyle", "smoking")}>
                            <Body>
                                <Text style={material.subheading}>Sigara</Text>
                                <Text note>{User.info?.lifeStyle?.smoking}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Alchol, "lifeStyle", "alcohol")}>
                            <Body>
                                <Text style={material.subheading}>Alkol</Text>
                                <Text note>{User.info?.lifeStyle?.alcohol}</Text>
                            </Body>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Diet, "lifeStyle", "diet")}>
                            <Body>
                                <Text style={material.subheading}>Diyet</Text>
                                <Text note>{User.info?.lifeStyle?.diet}</Text>
                            </Body>
                        </ListItem>



                        <ListItem itemDivider>
                            <Text style={[material.display1, { fontSize: 30 }]} >Aile</Text>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Kids, "family", "wantKids")}>
                            <Body>
                                <Text style={material.subheading}>Çocuk istiyor musun?</Text>
                                <Text note>{User.info?.family?.wantKids}</Text>
                            </Body>

                        </ListItem>

                        <ListItem>
                            <Body>
                                <Text style={material.subheading}>Çocuğun var mı?</Text>
                                <Text note>{User.info?.family?.hasKids ? "Evet" : "Hayır"}</Text>
                            </Body>
                            <Right>
                                <Switch onValueChange={(val) => setUserData("family", "hasKids", val)} value={User.info?.family?.hasKids} />
                            </Right>
                        </ListItem>

                        <ListItem onPress={() => showData(InfoOptions.Pets, "family", "pets")}>
                            <Body>
                                <Text style={material.subheading}>Evcil hayvan</Text>
                                <Text note>{User.info?.family?.pets}</Text>
                            </Body>
                        </ListItem>


                    </List>

                </View>

            </Content>
            <ActionSheet ref={actionSheetRef}>

                <FlatList data={state.data} renderItem={({ item, index }) =>
                    <ListItem onPress={() => setUserData(selected.parent, selected.key, item)} style={{ flexDirection: 'row', flex: 1, flexWrap: 'nowrap', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{item}</Text>

                    </ListItem>
                }
                    keyExtractor={item => item}
                />

            </ActionSheet>
        </Container>


    );
}
