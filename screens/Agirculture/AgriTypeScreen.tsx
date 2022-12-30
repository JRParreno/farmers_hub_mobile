import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import AgriTypeCard from "../../components/AgriType/AgriTypeCard";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import AgriType from "../../models/AgriType";
import { fetchAgricultureTypes } from "../../repository/AgriRepository";
import { DrawerStackParamList } from "../../types";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { i18nContext } from "../../context/i18nContext";

type IType = {
  params: DrawerStackParamList["AgicultureTypes"];
};

enum i18nEnum {
  English,
  Tagalog
}

export default function AgriTypeScreen() {
  const route = useRoute<RouteProp<IType, "params">>();
  const agriculture = route.params.agriculture;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [agris, setAgris] = useState<Array<AgriType> | null>(null);
  const [numPage, setNumPage] = useState("1");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const i18n = useContext(i18nContext);

  const handleGetAgris = (page: number, q?: string) => {
    fetchAgricultureTypes({
      page,
      pk: agriculture.pk,
      query: q ? q : query,
    })
      .then((data: Array<AgriType>) => {
        if (data && data.length > 0) {
          if (page === 1) {
            setAgris(data);
          } else {
            if (agris) {
              setAgris(agris.concat(data));
            }
          }
          setNumPage(page.toString());
        } else {
          setAgris(data);
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
      <AgriTypeCard
        key={item.pk}
        data={item}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("RecommendationList", {
            agricultureType: item,
          });
        }}
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      handleGetAgris(1);
    }, [])
  );

  const handleSearch = (q?: string) => {
    setLoading(true);
    handleGetAgris(1, q ? q : query);
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
            handleSearch(query);
          }}
          onClear={() => {
            setQuery("");
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
          <View style={{ marginBottom: 20 }}>
            <PoppinText
              style={{
                textAlign: "center",
                fontFamily: "poppins-semibold",
                fontSize: 17,
              }}
            >
              {i18n.language === i18nEnum.Tagalog ? "Pumili ng " : "Please select "}
              <PoppinText
                style={{
                  color: DefaultColor.main,
                  fontFamily: "poppins-semibold",
                  fontSize: 17,
                }}
              >
                {agriculture.name}
              </PoppinText>
            </PoppinText>
          </View>

          <View
            style={{
              flex: 0,
              width: "100%",
            }}
          >
            <FlatList
              columnWrapperStyle={{
                flexWrap: "wrap",
                justifyContent: "space-around",
                marginBottom: 15,
              }}
              centerContent
              data={agris}
              scrollsToTop={true}
              showsVerticalScrollIndicator={false}
              renderItem={_renderItem}
              keyExtractor={(item) => item.pk}
              onEndReached={() => {
                let page = Number(numPage) + 1;
                handleGetAgris(page);
              }}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                handleGetAgris(1);
              }}
              numColumns={2}
            />
          </View>
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
