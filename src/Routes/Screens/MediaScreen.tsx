import React, { useEffect, useState } from 'react'
import { View, Text, Platform, ImageBackground, FlatList, Dimensions, StatusBar, Alert, TouchableOpacity } from 'react-native'
import { Photo } from '../../models';
import ApiCalls from '../../network/ApiCalls';
import NetworkDataHelper from '../../network/NetworkDataHelper'
import { SettingsStackNavProps } from '../SettingsStackNavigator/SettingsParamList'
import ImagePicker from 'react-native-image-crop-picker';

import { Body, Button, Card, CardItem, Container, Header, Icon, Left, Spinner } from 'native-base';
import { ServerLink } from '../../utilities/constants';
import AppTheme from '../../res/colors';
import AppStyles from '../../res/styles';


let images: Photo[] = [];
for (let index = 0; index < 6; index++) {
    let photo = new Photo("", "");
    images.push(photo)
}
const width = Dimensions.get("screen").width

export default function MediaScreen({ navigation }: SettingsStackNavProps<"Media">) {

    const [state, setstate] = useState({
        uploading: [false, false, false, false, false, false],
        extraData: 1,
    })
    const [disabled, setDisabled] = useState(true)
    const [photoState, setPhotostate] = useState({ images })

    useEffect(() => {

        setPhotostate({ images })
        fetchUserImages()
    }, [])
    const fetchUserImages = () => {
        NetworkDataHelper.getMyImages(UserImagesCallBack);
    }
    const UserImagesCallBack = (images: [Photo]) => {

        let _Images = images;
        for (let index = _Images.length; index < 6; index++) {
            let photo = new Photo("", "");
            _Images.push(photo)
        }
        setPhotostate({ images: _Images })

        let result = _Images.find(e => e.id !== "")
        if (result) { setDisabled(false) }
        else {
            setDisabled(true)
        }
    }
    const couldAbleToDelete = () => {
        let counter = 0;
        let images = photoState.images
        images.forEach(image => {
            if (image.id !== "") {
                counter++;
            }
        })
        return counter > 1
    }
    const removeItem = (id: string) => {

        if (couldAbleToDelete()) {
            ApiCalls.deleteImage(id)
            let images = photoState.images
            images.forEach(image => {
                if (image.id === id) {
                    image.id = "";
                    image.path = "";
                }
            })
            images.sort((a, b) => {
                if (a.id > b.id) {
                    return -1
                }
                return 1
            })
            setPhotostate({ images })
        }
        else {
            Alert.alert(
                'Uyarı',
                ' Seçili fotoğraf Kaldırılamıyor.\nUyuglamayı kullanabilmek için en az 1 fotoğrafınız olması gerekiyor.',
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        }
    }
    const _pickImage = async (index: number) => {
        let uploading = state.uploading;
        uploading[index] = true
        setstate(prev => {
            return { ...prev, uploading, extraData: state.extraData + 1 };
        });
        if (Platform.OS === "ios") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return
            }
        }

        let photo = await ImagePicker.openPicker({
            width: 300,
            includeBase64: true,
            height: 400,
            cropping: true,
            mediaType: "photo",
        })


        if (photo) {
            uploading[index] = false
            setstate(prev => {
                return { ...prev, uploading, extraData: state.extraData + 1 };
            });
        }
        if (photo) {
            let base64 = `data:image/jpg;base64,${photo.data}`;
            setstate(prev => {
                return { ...prev, image: `data:image/jpg;base64,${base64}` };
            });

            ApiCalls.uploadImage(base64)
                .then(responseJson => {
                    uploading[index] = false
                    setstate(prev => {
                        return { ...prev, uploading, extraData: state.extraData + 1 };
                    });
                    fetchUserImages()
                }).catch((error) => {
                    // TO DO GİVE WARNİNG TO USER 
                    uploading[index] = true
                    setstate(prev => {
                        return { ...prev, uploading, extraData: state.extraData + 1 };
                    });
                });


        }
    };
    const renderItem = (item: Photo, index: number) => {
        if (item.path) {
            let image = ServerLink + item.path
            return (
                <Card style={{ height: width / 2, flex: 1, marginRight: 15, marginLeft: 15, marginBottom: 20 }}>
                    <ImageBackground source={{ uri: image }} style={{ flex: 1 }} >
                    </ImageBackground>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={{ position: "absolute", bottom: -20, right: -10 }}>
                        <Icon style={{ color: AppTheme.Danger, fontSize: 40 }} name="close-circle" type="MaterialCommunityIcons" />
                    </TouchableOpacity>
                </Card>
            )
        }
        else {
            return (
                <Card style={{ height: width / 2, flex: 1, marginRight: 15, marginLeft: 15, marginBottom: 20 }}>
                    <CardItem style={{ flex: 1, justifyContent: "center", }} button onPress={() => _pickImage(index)}>
                        {state.uploading[index] ? (<Spinner style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }} animating={state.uploading[index]} color={AppTheme.Primary} />
                        ) : (<Icon onPress={() => _pickImage(index)} style={{ color: AppTheme.Header, textAlign: "center", justifyContent: "center", flex: 1, alignSelf: "center", fontSize: 40 }} name="add-a-photo" type="MaterialIcons" />
                            )}

                    </CardItem>
                </Card>
            )
        }
    }
    return (
        <Container >
            <Header style={{ backgroundColor: AppTheme.Header }}>
                <StatusBar backgroundColor={AppTheme.Header} barStyle="light-content" animated />

                <Left>
                    <Button onPress={() => navigation.goBack()} transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Text style={AppStyles.title}>Fotoğraflarım</Text>
                </Body>

            </Header>
            <FlatList extraData={state.extraData} numColumns={2} data={photoState.images}
                renderItem={({ item, index }) =>
                    renderItem(item, index)
                }
                keyExtractor={(item, index) => item.id + index}

            />

        </Container >
    )
}
