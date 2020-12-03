import { Body, Button, Container, Header, Icon, Left, Text, ListItem, Right, List, Content } from 'native-base'
import React from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { material } from 'react-native-typography';
import PersonStack from '../../Components/PersonStack';
import { useStateContext } from '../../context/state';
import AppTheme from '../../res/colors';
import { HomeStackNavProps } from '../HomeStackNavigator/HomeParamList';
import { MatchesStackNavProps } from '../MatchesStackNavigator/MatchesParamList';

export default function UserScreenFeatured({ navigation, route }: HomeStackNavProps<"User">) {

    const { context, dispatch } = useStateContext();
    const User = route.params.User;
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
                    <Text style={[material.headlineWhiteObject]}>Profil</Text>
                </Body>
                <Right>
                </Right>
            </Header>
            <ScrollView>

                <View style={{ height: 300 }}>
                    <PersonStack User={route.params.User} key={route.params.User.id} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={material.display1}>Bio</Text>

                        <Text style={material.subheading} note>{User.bio}</Text>

                    </View>

                    {User.info &&

                        <List>
                            {User.info.look && (
                                <>
                                    <ListItem itemDivider>
                                        <Text style={material.display1}>Görünüş</Text>
                                    </ListItem>
                                    {User.info.look.bodyType && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Vücut</Text>
                                                <Text note>{User.info.look.bodyType}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.look.bodyType && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Height</Text>
                                                <Text note>{User.info.look.height}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                </>
                            )
                            }

                            {User.info.background ? (
                                <>
                                    <ListItem itemDivider>
                                        <Text style={material.display1}>Genel</Text>
                                    </ListItem>

                                    {User.info.background.education && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Eğitim</Text>
                                                <Text note>{User.info.background.education}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.background.employment && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>İş</Text>
                                                <Text note>{User.info.background.employment}</Text>
                                            </Body>
                                        </ListItem>
                                    )}

                                    {User.info.background.orientation && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Yönelim</Text>
                                                <Text note>{User.info.background.orientation}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.background.politics && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Politik görüş</Text>
                                                <Text note>{User.info.background.politics}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.background.relationType && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>İlişki tipi</Text>
                                                <Text note>{User.info.background.relationType}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.background.religion && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Din</Text>
                                                <Text note>{User.info.background.religion}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                </>
                            ) : null
                            }

                            {User.info.lifeStyle && (
                                <>
                                    <ListItem itemDivider>
                                        <Text style={material.display1}>Yaşam</Text>
                                    </ListItem>
                                    {User.info.lifeStyle.smoking && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Sigara</Text>
                                                <Text note>{User.info.lifeStyle.smoking}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.lifeStyle.alcohol && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Alkol</Text>
                                                <Text note>{User.info.lifeStyle.alcohol}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.lifeStyle.diet && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Diyet</Text>
                                                <Text note>{User.info.lifeStyle.diet}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                </>
                            )
                            }

                            {User.info.family && (
                                <>
                                    <ListItem itemDivider>
                                        <Text style={material.display1}>Aile</Text>
                                    </ListItem>
                                    {User.info.family.wantKids && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Çocuk istiyor muyum?</Text>
                                                <Text note>{User.info.family.wantKids}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.family.hasKids && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Çocuğum var mı?</Text>
                                                <Text note>{User.info.family.hasKids ? "Evet" : "Hayır"}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                    {User.info.family.pets && (
                                        <ListItem>
                                            <Body>
                                                <Text style={material.subheading}>Evcil hayvan</Text>
                                                <Text note>{User.info.family.pets}</Text>
                                            </Body>
                                        </ListItem>
                                    )}
                                </>
                            )
                            }

                        </List>
                    }

                </View>
            </ScrollView>
        </Container >
    )
}
