import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { getData, storeData } from "../../database/StoreData";
import Recommendation from "../../models/Recommendation";
import { fetchRecommendation } from "../../repository/AgriRepository";
import { ErrorMessage } from "../../utils/ErrorMessage";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [recommendation, setRecommendation] =
    useState<Array<Recommendation> | null>(null);
  const [numPage, setNumPage] = useState("1");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleGetRecommendation = (page: number, q?: string) => {
    fetchRecommendation({
      page,
      pk: "",
      query: q ? q : query,
    })
      .then((data: Array<Recommendation>) => {
        if (data && data.length > 0) {
          if (page === 1) {
            setRecommendation(data);
          } else {
            if (recommendation) {
              setRecommendation(recommendation.concat(data));
            }
          }
          setNumPage(page.toString());
        } else {
          setRecommendation(data);
        }
      })
      .catch((error: any) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          return true;
        }
        ErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const _renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        bottomDivider
        hasTVPreferredFocus={undefined}
        tvParallaxProperties={undefined}
        topDivider={index == 0}
        onPress={() => {
          navigation.navigate("Season", { recommendation: item });
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          {/* <ListItem.Subtitle>{item.author.user.name}</ListItem.Subtitle> */}
        </ListItem.Content>
        <ListItem.Chevron tvParallaxProperties />
      </ListItem>
    );
  };

  // const _renderRecentSearches = () => {
  //   // const recentSearches = await getData('recent_seaches');
  //   return <React.Fragment>
  //     {!isInitialized ? <View style={{ flex: 0, }}>
  //       <PoppinText style={{ fontFamily: 'poppins-semibold', fontSize: 18 }}>Recent Searches</PoppinText>
  //       <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
  //         <ListItem.Content>
  //           <ListItem.Title>Recent 1</ListItem.Title>
  //         </ListItem.Content>
  //       </ListItem>
  //     </View> : <View />}
  //   </React.Fragment>;
  // }

  useFocusEffect(
    useCallback(() => {
      handleGetRecommendation(1);
    }, [])
  );

  const handleSearch = async (q?: string) => {
    setLoading(true);
    const seaches = []
    await storeData("recent_seaches", q ? q : query);
    setIsInitialized(true);
    handleGetRecommendation(1, q ? q : query);
  };

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <SearchBar
          autoCompleteType
          round
          platform="android"
          lightTheme
          placeholder="Search"
          onChangeText={(text: string) => {
            setQuery(text);
          }}
          value={query}
          onIconPress={() => {
            handleSearch();
          }}
          onEndEditing={() => {
            handleSearch();
          }}
          onClear={() => {
            handleSearch("");
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: DefaultColor.main,
            borderRadius: 10,
          }}
        />
        <View style={{ flex: 1, marginTop: 20 }}>
          {recommendation && recommendation.length > 0 ? (
            <FlatList
              // ListHeaderComponent={_renderRecentSearches}
              data={recommendation}
              scrollsToTop={true}
              showsVerticalScrollIndicator={false}
              renderItem={_renderItem}
              keyExtractor={(item) => item.pk}
              onEndReached={() => {
                let page = Number(numPage) + 1;
                handleGetRecommendation(page);
              }}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                handleGetRecommendation(1);
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PoppinText>NO RESULTS FOUND</PoppinText>
            </View>
          )}
        </View>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
