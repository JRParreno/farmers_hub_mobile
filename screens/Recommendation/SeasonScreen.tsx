import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { SeasonCard } from "../../components/Season";
import { PoppinText, PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { RecommendationSeason } from "../../models/Season";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["Season"];
};

export default function SeasonScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const recommendation = route.params.recommendation;
  const [seasonInfo, setSeasonInfo] = useState<RecommendationSeason | null>(
    null
  );
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ["50%"], []);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

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

                bottomSheetRef.current?.close;
                handleOpenPress();
              }}
            />
          )
        )}
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
