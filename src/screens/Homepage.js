import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { GetAllBreeds, GetByBreed } from "../connection/DogsApi";

export default HomePage = () => {

    //State Variables
    const [imageRangeValue, setImageRangeValue] = useState("");
    const [allBreeds, setAllBreeds] = useState([]);
    const [dogImages, setDogImages] = useState([]);
    const [dogBreed, setdogBreed] = useState([]);

    //Store all the breeds name when the person loads the app
    const storeAllbreedsName = async () => {
        const { data } = await GetAllBreeds();
        setAllBreeds(Object.keys(data.message));
    }

    //Function to call api
    const makeApiCall = async () => {
        //Using the Math.floor (Math.random() * (maxValue - minValue) + minValue) to get a range of random numbers
        const randomBreedIndex = Math.floor(Math.random() * (allBreeds.length - 1) + 1);
        if (allBreeds.length >= 1) {
            setdogBreed(allBreeds[randomBreedIndex]);
            const { data } = await GetByBreed(allBreeds[randomBreedIndex]);
            const links = data.message;
            if (links != null && links != []) {
                setDogImages(links.slice(0, imageRangeValue));
            }
        }

        if (imageRangeValue >= 50) {
            alert(`Please Note: You're generating ${imageRangeValue} amount of dog images to display.`);
        }
    };

    //Load all breeds
    useEffect(() => {
        storeAllbreedsName();
    }, []);

    //Render item
    const RandomDogImageCardItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => alert(`The breed of dogs displayed is "${dogBreed}"`)} style={styles.imageContainer}>
                <Image source={{ uri: item, width: "100%", height: 300 }} resizeMode="cover" />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>RANDOM DOG IMAGES</Text>
                <TextInput keyboardType="numeric" style={styles.randInput} placeholder=" Amount of Random Image " onChangeText={(number) => setImageRangeValue(number)} />
                <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => makeApiCall()}>
                    <Text style={styles.getImagesText}>Get Random images</Text>
                </TouchableOpacity>
            </View>

            {/* Body */}

            {/* The List */}
            <View style={{ flexGrow: 1, flexShrink: 1, paddingBottom: 10 }}>
                {/* A FlatList */}
                <FlatList data={dogImages} renderItem={RandomDogImageCardItem} showsVerticalScrollIndicator={false} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingTop: 45,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    randInput: {
        width: "100%",
        borderColor: "black",
        textAlign: "center",
        borderWidth: 1,
        paddingHorizontal: 2,
        marginVertical: 10,
    },
    getImagesText: {
        width: 150,
        height: 35,
        textAlign: "center",
        borderColor: "black",
        borderWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
    },
    imageContainer: {
        borderColor: "black",
        borderWidth: 1,
        marginVertical: 5,
        overflow: "hidden",
        borderRadius: 5,
    }
});