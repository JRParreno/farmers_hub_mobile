import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import Infestation from "../../models/Infestation";
import { MainStackParamLst } from "../../types";
import { i18nContext } from "../../context/i18nContext";

type IType = {
    params: MainStackParamLst["InfestationList"];
};

enum i18nEnum {
    English,
    Tagalog
}

export default function InfestationListScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const route = useRoute<RouteProp<IType, "params">>();
    const recommendation = route.params.recommendation;
    const insect_stage = route.params.insect_stage;
    const i18n = useContext(i18nContext);

    return <ViewWithLoading loading={loading}>
        <View style={styles.container}>
            <PoppinText style={{ margin: 10, fontFamily: "poppins-semibold", fontSize: 18 }}>
                {i18n.language === i18nEnum.Tagalog ?
                    insect_stage.toLowerCase() === "flowering" ? "Pamumulaklak" : "Pag aani" :
                    insect_stage
                }
            </PoppinText>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.contentContainer}>
                    {recommendation.infestations.length > 0 &&
                        recommendation.infestations.map(
                            (data: Infestation, index: number) => {
                                if (data.insect_stage === insect_stage) {
                                    return <ListItem
                                        key={index}
                                        bottomDivider
                                        hasTVPreferredFocus={undefined}
                                        tvParallaxProperties={undefined}
                                        topDivider={index == 0}
                                        onPress={() => {
                                            // @ts-ignore
                                            navigation.navigate("Infestation", {
                                                infestation: data,
                                                recommendation: recommendation,
                                            });
                                        }}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>{data.insect.name}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron tvParallaxProperties />
                                    </ListItem>;
                                }
                                return <View />
                            }
                        )}
                </View>
            </ScrollView>
        </View>
    </ViewWithLoading>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    contentContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: DefaultColor.lightGreen,
    },
});
