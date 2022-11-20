import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList } from "react-native";
import UniversitiesApi from "../connection/RandomJokesApi";

//import the picker
import CountryPicker from "react-native-country-picker-modal";

export default HomePage = () => {
    // States Values
    const [searchValue, setSearchValue] = useState("");
    const [universitiesList, setUniversitiesList] = useState([]);
    const [completeUniversitiesList, setCompleteUniversitiesList] = useState([]);

    // Using the country picker to change the country and using the country to load the universities from the API
    const [country, setCountry] = useState("");


    //Function to call api
    const makeApiCall = async (value) => {
        const { data } = await UniversitiesApi.SearchByCountry(value);
        if (data != null && data != []) {
            setUniversitiesList(data);
            setCompleteUniversitiesList(data);
        }
    };

    //Use Effect to call function when country is updated
    useEffect(() => {
        makeApiCall(country);
    }, [country]);

    //Render item
    const UniversityCardItem = ({ item }) => {
        return (
            <View style={styles.listRow}>
                <View style={styles.listRowItemOne}></View>
                <View style={styles.listRowItemTwo}>
                    <Text numberOfLines={1} style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text numberOfLines={1} style={{ fontWeight: "bold" }}>{item.web_pages}</Text>
                </View>
            </View>
        )
    }

    //Function to filter list by university name
    const filterByUniversity = (search_value) => {
        if(search_value.length >= 1){
            //filtering through the data in the universities list
            const filteredData = completeUniversitiesList.filter((item)=>{
                return item.name.toString().toLowerCase().includes(searchValue.toLowerCase());
            });
            setUniversitiesList(filteredData);
        } else{
            setUniversitiesList(completeUniversitiesList);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>The HomePage</Text>
            {/* CountryPicker */}
            <View>
                <CountryPicker onSelect={(value)=>setCountry(value.name)} />
                <Text style={{ marginVertical: 10 }}>---{country}---</Text>
            </View>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                {/* Text Input */}
                <TextInput style={styles.textInput} placeholder="Search By University" onChangeText={(text) => {
                    setSearchValue(text);
                    filterByUniversity(text);
                }} />
            </View>

            {/* The List */}
            <View style={{ flexGrow: 1, flexShrink: 1, paddingBottom: 10 }}>
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