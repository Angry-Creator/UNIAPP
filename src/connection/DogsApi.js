import axios from "axios";

//It return two data, one message and second status
// {
//     "message": "https://images.dog.ceo/breeds/pembroke/n02113023_11103.jpg",
//     "status": "success"
// }

const BackendInstance = axios.create({
    baseURL: "https://dog.ceo/api/",
});

// List all breeds
// https://dog.ceo/api/breeds/list/all
const GetAllBreeds = async () => {
    try{
        const result = await BackendInstance.get("breeds/list/all");
        return result;
    } catch (er){
        return er;
    }
}

// By breed
// https://dog.ceo/api/breed/hound/images
const GetByBreed = async (breed) => {
    try{
        const result = await BackendInstance.get(`breed/${breed}/images`);
        return result;
    } catch (er){
        return er;
    }
}

// Display single random image from all dogs collection
// https://dog.ceo/api/breeds/image/random
const GetRandomImage = async () => {
    try{
        const result = await BackendInstance.get("breeds/image/random");
        return result;
    } catch (er){
        return er;
    }
}

// Single Random Image by breed
// https://dog.ceo/api/breed/hound/images/random 
const GetRandomByBreed = async (breed) => {
    try{
        const result = await BackendInstance.get(`breed/${breed}/images/random`);
        return result;
    } catch (er){
        return er;
    }
}



export { GetAllBreeds, GetByBreed, GetRandomImage, GetRandomByBreed };