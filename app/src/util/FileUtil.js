import {Platform} from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export const getFilePathLocal = (uri) => {
    if (Platform.OS === 'ios') {
        let arr = uri.split('/')
        const dirs = RNFetchBlob.fs.dirs
        uri = `${dirs.DocumentDir}/${arr[arr.length - 1]}`
    }
    return uri
}