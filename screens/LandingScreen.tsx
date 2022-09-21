import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import AgriItemCard from "../components/AgriItemCard";
import ViewWithLoading from "../components/ViewWithLoading";
import { DefaultColor } from "../constants/Colors";
import Agriculture from "../models/Agriculture";
import { fetchAgricultures } from "../repository/ArgiRepository";
import { ErrorMessage } from "../utils/ErrorMessage";

export default function LandingScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [agris, setAgris] = useState<Array<Agriculture> | null>(null);
  const [numPage, setNumPage] = useState("1");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleGetAgris = (page: number, q?: string) => {
    fetchAgricultures(page.toString())
      .then((data: Array<Agriculture>) => {
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
    return <AgriItemCard key={item.pk} data={item} />;
  };

  useFocusEffect(
    useCallback(() => {
      handleGetAgris(1);
    }, [])
  );

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
          onIconPress={() => {}}
          onEndEditing={() => {}}
          onClear={() => {}}
          editable={false}
          inputContainerStyle={{
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: DefaultColor.main,
            borderRadius: 10,
          }}
        />
        <View style={{ flex: 1, marginTop: 20 }}>
          <FlatList
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
          />
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

{
  /* <FlatList
          data={posts}
          ListHeaderComponent={_renderHeader}
          scrollsToTop={true}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          keyExtractor={(item) => item.pk}
          onEndReached={() => {
            let page = Number(numPage) + 1;
            handleGetPostList(page);
          }}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            handleGetPostList(1);
          }}
        /> */
}
