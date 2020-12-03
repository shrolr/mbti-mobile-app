import { StackNavigationProp } from '@react-navigation/stack'
import { Card, Thumbnail } from 'native-base'
import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { User } from '../models'
import { MatchesParamList } from '../Routes/MatchesStackNavigator/MatchesParamList'
import { getAge, getUserPhoto } from '../utilities/functions'


interface IUserCard {
    User: User,
    Navigation: StackNavigationProp<MatchesParamList, "Matches">,

}
const UserCard: React.FC<IUserCard> = ({ User, Navigation }) => {
    return (
        <TouchableOpacity style={{marginRight:10,marginTop:5,marginBottom:5}} onPress={() => Navigation.navigate("Chat", { User: User })}>
            <Thumbnail source={{ uri: getUserPhoto(User) }} ></Thumbnail>
        </TouchableOpacity>
    )
}
export default UserCard


/*
  --- Old Component ---
  <Card style={{ marginLeft: 10, marginRight: 10, marginBottom: 20, borderRadius: 10, overflow: "hidden" }}>
            <TouchableOpacity onPress={() => Navigation.navigate("Chat", { User: User })}>
                <Thumbnail source={{ uri: getUserPhoto(User) }} ></Thumbnail>
                <Image style={{ height: 150, width: 150 }} source={{ uri: getUserPhoto(User) }} />
                <Text style={{ marginTop: 10, textAlign: "center", fontSize: 16, fontWeight: "500" }}>{User.handle}, {getAge(User.birthDate)}</Text>
                <Text style={{ marginTop: 5, marginBottom: 10, textAlign: "center", fontSize: 12, color: "gray" }}>{User.city.name}</Text>
            </TouchableOpacity>
    </Card>

*/