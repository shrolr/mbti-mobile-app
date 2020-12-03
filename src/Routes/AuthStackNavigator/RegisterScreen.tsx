import { Body, Button, Card, Container, Text, Icon, ListItem, Spinner, Content } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, FlatList, Platform, TouchableOpacity, Text as RNText, ScrollView } from 'react-native'
import ActionHelper from '../../context/ActionHelper';
import { useStateContext } from '../../context/state';
import { AuthNavProps } from './AuthParamList';
import DateTimePicker from '@react-native-community/datetimepicker'
import { material } from 'react-native-typography'
import AppTheme from '../../res/colors';
import { getAge } from '../../utilities/functions';
import { mbtiTypes } from '../../res/mbti-types';
import { Makiko } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';



export default function RegisterScreen({ navigation }: AuthNavProps<"Register">) {
    const { dispatch } = useStateContext();
    useEffect(() => {
        getLocationAsync()
        return () => {
            // TO DO CLEAN UP
        }
    }, [])
    const [registerState, setregisterState] = useState({
        dataSource: ["Kadın", "Erkek"],
        dataSourceForInterest: ["Kadın", "Erkek", "Hepsi"],
        phase: 0,
        multiSliderValue: [18, 25],
        looking_forTypes: ["ESTP"],
        gender: 0,
        age: 18,
        handle: "",
        myType: "",
        ageGap: { minAge: 20, maxAge: 30 },
        interest: 0,
        looking_for: 1,
        chosenDate: new Date(1996, 0, 1, 10, 33, 30, 0),
        distance: 100,
    })
    const [location, setLocation] = useState({});
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        setShow(Platform.OS === 'ios');

        if (selectedDate) {

            const currentDate = selectedDate;
            setregisterState(prevregisterState => {
                return { ...prevregisterState, chosenDate: currentDate };
            });
        }
    };

    const showMode = (currentMode: any) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const getLocationAsync = async () => {
        Geolocation.getCurrentPosition(info => {
            setLocation(info)
        });
        // RNLocation.configure({
        //     distanceFilter: 5.0
        // })

        // RNLocation.requestPermission({
        //     ios: "whenInUse",
        //     android: {
        //         detail: "coarse"
        //     }
        // }).then(granted => {
        //     if (granted) {
        //         // this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
        //         //   /* Example location returned
        //         //   {
        //         //     speed: -1,
        //         //     longitude: -0.1337,
        //         //     latitude: 51.50998,
        //         //     accuracy: 5,
        //         //     heading: -1,
        //         //     altitude: 0,
        //         //     altitudeAccuracy: -1
        //         //     floor: 0
        //         //     timestamp: 1446007304457.029,
        //         //     fromMockProvider: false
        //         //   }
        //         //   */
        //         // })
        //     }
        // })

    };


    const updateUser = () => {
        let age = registerState.chosenDate.toLocaleString().split(",", 1)[0].replace("/", "-").replace("/", "-")
        age = registerState.chosenDate.getFullYear() + "-" + registerState.chosenDate.getMonth() + "-" + registerState.chosenDate.getDate()
        ActionHelper.completeRegister(registerState.handle, registerState.myType, registerState.chosenDate.toLocaleString(), registerState.gender, registerState.interest, location, registerState.looking_forTypes, registerState.distance, 0, registerState.ageGap, dispatch!, navigation)
    }
    const setGender = (index: number) => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, gender: index, phase: 2 };
        });
    }
    const prevPhase = () => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, phase: registerState.phase - 1 };
        });
    }
    const setInterest = (index: number) => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, interest: index, phase: 3 };
        });

    }
    const onHandleChange = (handle: string) => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, handle };
        });
    }
    const setMyTypes = (myType: string) => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, myType, phase: 4 };
        });
        showDatepicker()
    }

    const nextPhase = () => {
        setregisterState(prevregisterState => {
            return { ...prevregisterState, phase: 1 };
        });
    }
    if (registerState.phase == 0) {
        return (
            <View style={{ flex: 1 }}>


                <ScrollView style={{ backgroundColor: "#fff", paddingTop: 30 }}   >
                    <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                        <Icon onPress={() => navigation.goBack()} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                        <Text style={{ fontSize: 35, color: "#ee5253" }}>İsminiz</Text>
                    </View>
                    <View>
                        <Makiko
                            label={'İsminiz'}
                            value={registerState.handle}
                            onChangeText={onHandleChange}
                            iconClass={FontAwesomeIcon}
                            iconName={'heart'}
                            iconColor={'white'}
                            inputPadding={16}
                            inputStyle={{ color: '#db786d' }}
                        />
                    </View>

                </ScrollView>
                <Button style={{ backgroundColor: AppTheme.Button }} full onPress={nextPhase}>
                    <RNText style={material.titleWhite}>Devam Et</RNText>
                </Button>
            </View>
        )
    }

    if (registerState.phase == 1) {
        return (
            <Container style={{ paddingTop: 30 }}   >
                <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                    <Icon onPress={prevPhase} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                    <Text style={{ fontSize: 35, color: "#ee5253" }}>Cinsiyetiniz</Text>
                </View>
                <View>
                    <FlatList data={registerState.dataSource} renderItem={({ item, index }) =>
                        <ListItem onPress={() => setGender(index)} style={{ flexDirection: 'row', flex: 1, flexWrap: 'nowrap', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{item}</Text>
                        </ListItem>
                    }
                        keyExtractor={item => item}
                    />
                </View>
            </Container>
        )
    }
    if (registerState.phase == 2) {
        return (
            <Container style={{ paddingTop: 30 }}   >
                <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                    <Icon onPress={prevPhase} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                    <Text style={{ fontSize: 35, color: "#ee5253" }}>İlgilendikleriniz</Text>
                </View>
                <View>
                    <FlatList data={registerState.dataSourceForInterest} renderItem={({ item, index }) =>
                        <ListItem onPress={() => setInterest(index)} style={{ flexDirection: 'row', flex: 1, flexWrap: 'nowrap', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{item}</Text>
                        </ListItem>
                    }
                        keyExtractor={item => item}
                    />
                </View>
            </Container>
        )
    }
    if (registerState.phase == 3) {
        return (
            <Container style={{ paddingTop: 30, }}   >
                <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                    <Icon onPress={prevPhase} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                    <Text style={{ fontSize: 35, color: "#ee5253" }}>Karakter Tipiniz</Text>
                </View>

                <FlatList data={mbtiTypes} renderItem={({ item }) =>
                    <ListItem onPress={() => setMyTypes(item.title)}  >
                        <Body>
                            <Text style={{ fontSize: 16 }}>{item.title}</Text>
                            <Text note>{item.detail}</Text>
                        </Body>

                    </ListItem>
                }
                    keyExtractor={item => item.title}
                />

            </Container>

        )
    }
    if (registerState.phase == 4) {
        return (
            <Container style={{ paddingTop: 30 }}   >
                <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
                    <Icon onPress={prevPhase} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                    <Text style={{ fontSize: 35, color: "#ee5253" }}>Doğum Tarihi</Text>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={registerState.chosenDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}


                <View style={{ flex: 1, justifyContent: "center", }}>
                    <Card style={{ height: 200, marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                        <TouchableOpacity style={{ flex: 1, }} onPress={() => setShow(true)}>
                            <View style={{ flex: 1, alignContent: "center", marginTop: 10 }}>
                                <RNText style={[material.title, { textAlign: "center", color: AppTheme.Primary, }]}>Yaşınız</RNText>
                                <RNText style={[material.display4, { textAlign: "center", }]}>{getAge(registerState.chosenDate)}</RNText>
                            </View>
                        </TouchableOpacity>
                    </Card>


                </View>


                <Button style={{ backgroundColor: AppTheme.Button }} full onPress={updateUser}>
                    <RNText style={material.titleWhite}>Devam Et</RNText>
                </Button>
            </Container>
        )
    }
    return <Spinner />

}
