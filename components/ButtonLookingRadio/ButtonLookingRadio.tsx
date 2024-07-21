import type { ReactNode } from "react";
import type { Control } from "react-hook-form";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import type { IFilters } from "../../screens/FiltersMenu/FiltersMenu";
import Button from "../Button/Button";
import Span from "../Span/Span";
import Text from "../Text/Text";

interface IOptionItem {
  label: ReactNode;
  value: any;
}

interface IProps {
  options: IOptionItem[];
  control: Control<IFilters>;
  name: keyof IFilters;
  disabled?: boolean;
  onChangeEventful?: (option: IOptionItem["value"]) => void;
}

function ButtonLookingRadio({
  options,
  name,
  control,
  disabled,
  onChangeEventful,
}: IProps) {
  const { field } = useController({
    name,
    control,
  });

  const { onChange, value: selectedOption } = field;

  const getOptionStyles = (option: IOptionItem, idx: number) => {
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;

    return [
      styles.OptionItem,
      ...(isFirst
        ? [styles.OptionItemFirst]
        : isLast
          ? [styles.OptionItemLast]
          : []),
      ...(disabled ? [styles.OptionItemDisabled] : []),
    ];
  };

  function handleChange(option: IOptionItem["value"]) {
    onChange(option);
    onChangeEventful?.(option);
  }

  return (
    <Span>
      <Span style={[styles.Group]}>
        {options.map((option, idx) => {
          const optionStyles = getOptionStyles(option, idx);
          return (
            <Button
              disabled={disabled}
              key={option.value + idx}
              onPress={() => !disabled && handleChange(option.value)}
              style={[
                optionStyles,
                ...(option.value === selectedOption
                  ? [
                      styles.SelectedItem,
                      ...(disabled ? [styles.SelectedItemDisabled] : []),
                    ]
                  : []),
              ]}
            >
              <Text
                style={[
                  styles.PrimaryButtonText,
                  ...(option.value === selectedOption
                    ? [
                        styles.SelectedItemText,
                        ...(disabled ? [styles.SelectedItemDisabled] : []),
                      ]
                    : []),
                ]}
              >
                {option.label}
              </Text>
            </Button>
          );
        })}
      </Span>
    </Span>
  );
}

export default ButtonLookingRadio;

const styles = StyleSheet.create({
  GroupsWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  Group: {
    flexDirection: "row",
  },
  OptionItem: {
    flex: 1,
    borderRadius: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  OptionItemDisabled: {
    borderColor: Colors.gray,
  },
  OptionItemFirst: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderLeftWidth: 2,
  },
  OptionItemLast: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderRightWidth: 2,
  },
  SelectedItem: {
    backgroundColor: Colors.primaryColor,
  },
  SelectedItemDisabled: {
    backgroundColor: Colors.gray,
  },
  SelectedItemText: {
    color: Colors.altText,
  },
  SelectedItemDisabledDisabled: {
    color: Colors.gray,
  },
  PrimaryButtonText: {
    fontWeight: "bold",
  },
});
