import { Button, Card, CardItem, Container, Icon, Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, Dimensions, FlatList, ImageBackground, Platform, View } from 'react-native'
import { AuthNavProps } from './AuthParamList';
import ImagePicker from 'react-native-image-crop-picker';
import { Photo } from '../../models';
import AppTheme from '../../res/colors';
import NetworkDataHelper from '../../network/NetworkDataHelper';
import ApiCalls from '../../network/ApiCalls';
import { ServerLink } from '../../utilities/constants';
import { useStateContext } from '../../context/state';
import { ActionType } from '../../context/reducer';
import { GetItem, setItem } from '../../utilities/functions';
const width = Dimensions.get("screen").width

let images: Photo[] = [];
for (let index = 0; index < 6; index++) {
    let photo = new Photo("", "");
    images.push(photo)
}
export default function RegisterPhotoScreen({ navigation }: AuthNavProps<"RegisterPhotoScreen">) {
    const { dispatch } = useStateContext();

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

    const completeRegistration = async () => {
        // TO DO call end point to user 
        dispatch!({ type: ActionType.SET_COMPLETED, payload: { completed: true } })
        let tempAuth = await GetItem("tempAuth")
        if (tempAuth) {
            setItem("auth", tempAuth)
        }
        ApiCalls.completeRegistration();
    }
    const removeItem = (id: string) => {
        ApiCalls.deleteImage(id);
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
        let result = images.find(e => e.id !== "")
        if (result) { setDisabled(false) }
        else {
            setDisabled(true)
        }
    }
    const _pickImage = async (index: number) => {
        let uploading = state.uploading;
        uploading[index] = true
        setstate(prev => {
            return { ...prev, uploading, extraData: state.extraData + 1 };
        });

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
                    <Icon onPress={() => removeItem(item.id)} style={{ position: "absolute", color: AppTheme.Header, bottom: -20, right: -20, fontSize: 40 }} name="close-circle" type="MaterialCommunityIcons" />
                </Card>
            )
        }
        else {
            return (
                <Card style={{ height: width / 2, flex: 1, marginRight: 15, marginLeft: 15, marginBottom: 20 }}>
                    <CardItem style={{ flex: 1, alignItems: "center" }} button onPress={() => _pickImage(index)}>
                        <Spinner style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }} animating={state.uploading[index]} color={AppTheme.Primary} />
                    </CardItem>
                    <Icon onPress={() => _pickImage(index)} style={{ position: "absolute", color: "#3498db", bottom: -20, right: -20, fontSize: 40 }} name="plus-circle" type="MaterialCommunityIcons" />
                </Card>
            )
        }
    }
    return (
        <Container style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 10 }}>
            <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
                <Icon onPress={() => navigation.goBack()} type='Ionicons' style={{ color: '#ee5253', marginLeft: 10, marginRight: 10, fontSize: 30, }} name={'ios-arrow-back'} />
                <Text style={{ fontSize: 35, color: "#ee5253" }}>Fotoğraf</Text>
            </View>
            <FlatList extraData={state.extraData} numColumns={2} data={photoState.images}
                renderItem={({ item, index }) =>
                    renderItem(item, index)
                }
                keyExtractor={(item, index) => item.id + index}

            />
            <Button full disabled={disabled} onPress={() => completeRegistration()} style={{ height: 50, backgroundColor: disabled === false ? AppTheme.Button : AppTheme.ButtonDisabled }}>
                <Text style={{ color: "white" }}>Devam Et</Text>
            </Button>
        </Container >
    )
}
