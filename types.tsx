/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Agriculture from "./models/Agriculture";
import AgriType from "./models/AgriType";
import Infestation, {
  ChemicalControls,
  PreventMeasure,
} from "./models/Infestation";
import Post from "./models/Post";
import Recommendation from "./models/Recommendation";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Agriculture: undefined;
  NotFound: undefined;
  Landing: undefined;
  PrivacyPolicy: undefined;
  TermCondition: undefined;
  Help: undefined;
};

export type DrawerStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Community: undefined;
  ProfileDrawer: undefined;
};

export type ProfileStackParamLst = {
  Profile: undefined;
  Info: undefined;
  Password: undefined;
};


export type CommunityStackParamLst = {
  PostList: undefined;
  Post: {
    post: Post;
  };
  PostCreate: undefined;
  PostEdit: {
    post: Post;
  };
}

export type MainStackParamLst = {
  HomeMain: undefined;
  Agriculture: undefined;
  GeneralSearch: undefined;
  AgicultureTypes: {
    agriculture: Agriculture;
  };
  AgicultureTypeDetail: {
    agricultureType: AgriType;
  };
  RecommendationList: {
    agricultureType: AgriType;
  };
  Season: {
    recommendation: Recommendation;
  };
  Infestation: {
    infestation: Infestation;
    recommendation: Recommendation;
  };
  InfestationList: {
    insect_stage: String;
    recommendation: Recommendation;
  };
  Treat: {
    infestation: Infestation;
    recommendation: Recommendation;
  };
  Instruction: {
    instruction: ChemicalControls;
    recommendation: Recommendation;
  };
  PreventMeasures: {
    infestation: Infestation;
    recommendation: Recommendation;
  };
}


export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
