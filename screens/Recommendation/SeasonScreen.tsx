import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { InfestationCard } from "../../components/Insect";
import { SeasonCard } from "../../components/Season";
import { PoppinText, PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import Infestation from "../../models/Infestation";
import { RecommendationSeason } from "../../models/Season";
import { DrawerStackParamList } from "../../types";

type IType = {
  params: DrawerStackParamList["Season"];
};

export default function SeasonScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const recommendation = route.params.recommendation;
  const [seasonInfo, setSeasonInfo] = useState<RecommendationSeason | null>(
    null
  );
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insectSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);
  const handleInsectOpenPress = useCallback(() => {
    insectSheetRef.current?.snapToIndex(1);
  }, []);

  const handleClosePress = () => insectSheetRef.current!.close();
  const handleCloseSeasonPress = () => bottomSheetRef.current!.close();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <PoppinTextBold>{recommendation.title}</PoppinTextBold>
        {recommendation.seasons.map(
          (season: RecommendationSeason, index: number) => (
            <SeasonCard
              key={season.pk}
              season={season}
              index={index}
              onPress={(data: RecommendationSeason) => {
                setSeasonInfo(data);
                handleCloseSeasonPress();
                handleOpenPress();
              }}
            />
          )
        )}
        <InfestationCard
          onPress={() => {
            handleInsectOpenPress();
          }}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <BottomSheetScrollView>
            <View style={styles.contentContainer}>
              {seasonInfo && (
                <React.Fragment>
                  <PoppinTextBold>
                    {seasonInfo.season.name} SEASON
                  </PoppinTextBold>
                  <PoppinText>{seasonInfo.description}</PoppinText>
                </React.Fragment>
              )}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
        <BottomSheet
          ref={insectSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <BottomSheetScrollView>
            <View style={styles.contentContainer}>
              {recommendation.infestations.length > 0 &&
                recommendation.infestations.map(
                  (data: Infestation, index: number) => (
                    <ListItem
                      key={data.pk}
                      bottomDivider
                      hasTVPreferredFocus={undefined}
                      tvParallaxProperties={undefined}
                      topDivider={index == 0}
                      onPress={() => {
                        handleClosePress();
                        navigation.navigate("Infestation", {
                          infestation: data,
                          recommendation: recommendation,
                        });
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title>{data.insect.name}</ListItem.Title>
                        {/* <ListItem.Subtitle>{item.author.user.name}</ListItem.Subtitle> */}
                      </ListItem.Content>
                      <ListItem.Chevron tvParallaxProperties />
                    </ListItem>
                  )
                )}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 0,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: DefaultColor.lightGreen,
  },
});
