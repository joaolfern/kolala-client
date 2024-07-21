import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import CommonWrapper from "../../components/CommonWrapper/CommonWrapper";
import Label from "../../components/Label/Label";
import Select from "../../components/Select/Select";
import Span from "../../components/Span/Span";
import Text from "../../components/Text/Text";
import Textarea from "../../components/Textarea/Textarea";
import Colors from "../../constants/Colors";
import type { IReport } from "../../Models/Report";
import Report from "../../Models/Report";
import type { RootStackParamList } from "../../types";
import { showToast } from "../../utils/toast";
import { REPORT_CATEGORY_RESOURCE } from "../Report/constants";

function ReportForm() {
  const { navigate, goBack } = useNavigation();
  const { control, handleSubmit } =
    useForm<IReport.CreateReportConfig["body"]>();
  const { target } =
    useNavigationState(
      (state) =>
        state.routes.find((item) => item.name === "ReportForm")
          ?.params as RootStackParamList["ReportForm"],
    ) || {};

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function onSubmit(values: IReport.CreateReportConfig["body"]) {
    setLoadingSubmit(true);

    const body: IReport.CreateReportConfig["body"] = {
      ...values,
      targetId: target.id,
    };

    try {
      await Report.createReport({ body });
      goBack();
      navigate("Report");
    } catch (err: any) {
      showToast(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <CommonWrapper title="Criar dunúncia">
      <Span style={styles.UserCard}>
        <Avatar
          style={styles.UserAvatar}
          source={target?.picture ? { uri: target.picture } : undefined}
        />
        <Text style={styles.UserName}>{target.name}</Text>
      </Span>
      <Label>Motivo</Label>
      <Select
        name="category"
        control={control}
        items={REPORT_CATEGORY_RESOURCE}
      />
      <Label>Detalhes (opcional)</Label>
      <Textarea
        placeholder="ex: O usuário publicou mensagens ofensivas a um grupo específico de pessoas"
        name="description"
        control={control}
      />

      <Button
        loading={loadingSubmit}
        style={styles.Button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.ButtonText}>Enviar</Text>
      </Button>
    </CommonWrapper>
  );
}

export default ReportForm;

const styles = StyleSheet.create({
  Button: {
    alignSelf: "flex-end",
    paddingHorizontal: 24,
    marginTop: "auto",
  },
  ButtonText: {
    color: Colors.altText,
    fontWeight: "600",
  },
  UserCard: {
    backgroundColor: Colors.xLightBackground,
    padding: 20,
    borderRadius: 15,
    marginBottom: 14,
    flexDirection: "row",
  },
  UserAvatar: {
    marginRight: 16,
  },
  UserName: {
    fontWeight: "bold",
  },
});
