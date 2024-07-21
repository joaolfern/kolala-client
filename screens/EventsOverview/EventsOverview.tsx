import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

import CreateEventButton from "../../components/CreateEventButton/CreateEventButton";
import Header from "../../components/Header/Header";
import SafeAreaView from "../../components/SafeAreaView/SafeAreaView";
import Span from "../../components/Span/Span";
import Text from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import type { IEvent } from "../../Models/Event";
import { MAP_ICONS } from "../EventForm/constants";
import NoResultMessage from "../Events/components/NoResultMessage/NoResultMessage";
import useMarkers from "../Home/hooks/useMarkers";

function EventsOverview() {
  const { goBack, navigate } = useNavigation();
  const { markers } = useMarkers();

  function navigateToEvent(preview: IEvent.IMarkers) {
    goBack();
    navigate("EventDetails", {
      preview,
    });
  }

  function navigateToReports() {
    navigate("Report");
  }

  return (
    <FlatList
      ListHeaderComponent={
        <SafeAreaView>
          <Header>
            <Header.Title>Eventos encontrados</Header.Title>
          </Header>
          <Span style={styles.HeaderRow}>
            <CreateEventButton />

            <TouchableOpacity
              onPress={navigateToReports}
              style={[styles.MyReportsButton, styles.Row]}
            >
              <MaterialIcons
                style={styles.DescriptionIcon}
                name="campaign"
                color={Colors.orangeColor}
                size={24}
              />
              <Text style={styles.MyReportsText}>Minhas denúncias</Text>
            </TouchableOpacity>
          </Span>
        </SafeAreaView>
      }
      style={styles.Container}
      data={markers}
      ListEmptyComponent={NoResultMessage}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.Card}
            onPress={() => navigateToEvent(item)}
          >
            <Image style={styles.CardIcon} source={MAP_ICONS[item.icon]} />
            <Span style={styles.CardContent}>
              <Text style={styles.CardTitle}>{item.title}</Text>
              <Span style={[styles.Row, styles.AddressRow]}>
                <MaterialIcons
                  style={styles.DescriptionIcon}
                  name="location-pin"
                  size={24}
                  color={Colors.primaryColor}
                />
                <Text style={styles.CardAddress} numberOfLines={1}>
                  {item.address}
                </Text>
              </Span>
              <Span style={styles.Row}>
                <MaterialIcons
                  style={styles.DescriptionIcon}
                  name="timer"
                  size={24}
                  color={Colors.secondaryColor}
                />
                <Text>{dayjs(item.datetime).fromNow()}</Text>
              </Span>
            </Span>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default EventsOverview;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.background,
    height: "100%",
    padding: 16,
  },
  ContainerTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  HeaderRow: {
    flexDirection: "column-reverse",
    marginBottom: 24,
  },
  MyReportsButton: {
    marginBottom: 18,
    marginLeft: "auto",
  },
  MyReportsText: {
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  Card: {
    backgroundColor: Colors.xLightBackground,
    borderRadius: 20,
    marginBottom: 16,
    padding: 14,
    flexDirection: "row",
  },
  CardTitle: {
    fontWeight: "bold",
  },
  CardAddress: {
    flex: 1,
  },
  CardContent: {
    flex: 1,
  },
  CardIcon: {
    margin: 14,
    height: 40,
    width: 40,
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
  },
  AddressRow: {
    marginBottom: 4,
  },
  DescriptionIcon: {
    marginRight: 4,
    width: 24,
  },
});
