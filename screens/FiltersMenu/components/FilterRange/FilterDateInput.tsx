import { MaterialIcons } from "@expo/vector-icons";
import type { UseFormReturn } from "react-hook-form";
import { StyleSheet } from "react-native";

import Button from "@//components/Button/Button";
import ButtonLookingRadio from "@//components/ButtonLookingRadio/ButtonLookingRadio";
import DateInput from "@//components/DateInput/DateInput";
import Label from "@//components/Label/Label";
import Span from "@//components/Span/Span";
import Colors from "@//constants/Colors";
import { useAppDispatch } from "@//store/hooks";
import { setFilter } from "@//store/mapFilterSlice";
import type { _filterDatetype, IFilters } from "../../FiltersMenu";
import DividerAlternative from "./DividerAlternative";

const DATE_OPTIONS = [
  { label: "Semana/fds", value: "week" },
  { label: "Este mês", value: "month" },
];

interface IProps {
  form: UseFormReturn<IFilters>;
}

const INCLUDE_DAY_FORMAT = "YYYY-MM-DD [23:59:00]";
function FilterDateInput({ form }: IProps) {
  const dispatch = useAppDispatch();

  const { setValue, control } = form;

  function clearRange() {
    setValue("maxDateRange", null);
    setValue("minDateRange", null);
    dispatch(
      setFilter({
        minDateRange: null,
        maxDateRange: null,
      })
    );
  }

  return (
    <>
      <Label>Quando</Label>
      <FilterButtonLookingRadio
        form={form}
        onChangeEventful={(value) => {
          dispatch(setFilter({ datetype: value as _filterDatetype }));
        }}
      />
      <DividerAlternative />
      <Span style={styles.RangeWrapper}>
        <Span style={styles.RangeGroup}>
          <Span style={[styles.RangeItem, styles.RangeItemMargin]}>
            <DateInput
              format={INCLUDE_DAY_FORMAT}
              mode="date"
              displayMode="short"
              control={control}
              name="minDateRange"
              placeholder="De"
              onChangeEventful={(minDateRange) => {
                dispatch(setFilter({ minDateRange }));
              }}
            />
          </Span>
          <Span style={styles.RangeItem}>
            <DateInput
              format={INCLUDE_DAY_FORMAT}
              mode="date"
              displayMode="short"
              control={control}
              name="maxDateRange"
              placeholder="Até"
              onChangeEventful={(maxDateRange) => {
                dispatch(setFilter({ maxDateRange }));
              }}
            />
          </Span>
        </Span>
        <Button style={styles.ClearRangeButton} onPress={clearRange}>
          <MaterialIcons
            name="delete-outline"
            size={30}
            color={Colors.secondaryColor}
          />
        </Button>
      </Span>
    </>
  );
}

export default FilterDateInput;

interface IFilterButtonLookingRadio extends IProps {
  onChangeEventful: (value: string) => void;
}

function FilterButtonLookingRadio({
  form,
  onChangeEventful,
}: IFilterButtonLookingRadio) {
  const { watch, control } = form;

  const maxDateRange = watch("maxDateRange");
  const minDateRange = watch("minDateRange");

  const disabled = !!maxDateRange || !!minDateRange;

  return (
    <ButtonLookingRadio
      options={DATE_OPTIONS}
      control={control}
      name="datetype"
      disabled={disabled}
      onChangeEventful={onChangeEventful}
    />
  );
}

const styles = StyleSheet.create({
  ClearRangeButton: {
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    marginLeft: 16,
  },
  RangeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  RangeGroup: {
    flexDirection: "row",
    flex: 1,
  },
  RangeItem: {
    flex: 1,
  },
  RangeItemMargin: {
    marginRight: 16,
  },
});
