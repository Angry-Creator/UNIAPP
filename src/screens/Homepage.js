import { useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList } from "react-native";
import UniversitiesApi from "../connection/UniversitiesApi";

export default HomePage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [universitiesList, setUniversitiesList] = useState([]);

    //Function to call api
    const makeApiCall = async (value) => {
        const { data } = await UniversitiesApi.SearchByCountry(value);
        if (data != null && data != []) {
            setUniversitiesList(data);
        }
    };

    //Render item
    const UniversityCardItem = ({ item }) => {
        
        return(
        <View style={styles.listRow}>
            <View style={styles.listRowItemOne}></View>
            <View style={styles.listRowItemTwo}>
                <Text numberOfLines={1} style={{fontWeight: "bold"}}>{item.name}</Text>
                <Text numberOfLines={1} style={{fontWeight: "bold"}}>{item.web_pages}</Text>
            </View>
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>The HomePage</Text>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                {/* Text Input */}
                <TextInput style={styles.textInput} placeholder="Type Country" onChangeText={(text) => {
                    setSearchValue(text);
                    makeApiCall(text);
                }} />
            </View>

            {/* The List */}
            <View style={{flexGrow: 1, flexShrink: 1, paddingBottom: 10}}>
                {/* A FlatList */}
                <FlatList data={universitiesList} renderItem={UniversityCardItem} showsVerticalScrollIndicator={false} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        paddingTop: 45,
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "orange",
    },
    searchBar: {
        height: 60,
        borderRadius: 15,
        backgroundColor: "grey",
        justifyContent: "center",
        marginBottom: 10,
    },
    textInput: {
        fontWeight: "bold",
        fontSize: 15,
        paddingHorizontal: 20,
    },
    listRow: {
        height: 58,
        backgroundColor: "grey",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    listRowItemOne: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: "orange",
        marginRight: 10,
    },
    listRowItemTwo: {
        flexGrow: 1,
        flexShrink: 1,

    }
});