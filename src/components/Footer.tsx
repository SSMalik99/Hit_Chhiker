import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const AppFooter = () => {
    return (
        <SafeAreaView style={stuyles.foot}>
            <Text>
                Code Hunter 
            </Text>
            <Text>
                {new Date().getFullYear()}
            </Text>
        </SafeAreaView>
    );
}
const stuyles = StyleSheet.create({
    foot:{
        flexDirection:"row"
    }
})
export default AppFooter