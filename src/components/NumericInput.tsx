import { useState, ChangeEvent } from "react";
import { Flex, Image, Input } from "@chakra-ui/react";

interface INumericInput {
  max?: number;
  min?: number;
  onChange: (val: number) => void;
  value?: number;
}

const NumericInput = (props: INumericInput) => {
  const { max = 9999, min = 0, value = 0, onChange: onChangeParent } = props;

  const [inputValue, setInputValue] = useState(value);

  const setValue = (val: Number) => {
    setInputValue(Number(val));
    onChangeParent(Number(val));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    debugger;
    if (val.match("d+")) return;
    if (max >= Number(val) && Number(val) >= min) {
      setValue(Number(val));
    }
  };

  const onPlusClicked = () => {
    if (inputValue + 1 > max) return;
    setValue(inputValue + 1);
  };

  const onMinusClicked = () => {
    if (inputValue - 1 < min) return;
    setValue(inputValue - 1);
  };

  return (
    <Flex
      bgColor={"#57467275"}
      border={"1px solid #A4A4BE"}
      borderRadius={12}
      p={2}
      px={4}
      gap={3}
      align={"center"}
      justifyContent={"space-between"}
    >
      <Image
        src="/icons/minus.png"
        alt="minus"
        w={5}
        h={5}
        cursor={"pointer"}
        onClick={onMinusClicked}
      />
      <Input
        w={20}
        p={0}
        bgColor={"unset"}
        textAlign={"center"}
        onChange={onChange}
        value={inputValue}
        _focus={{
          bgColor: "unset",
          textAlign: "center",
          border: "unset",
        }}
        _hover={{
          bgColor: "unset",
          textAlign: "center",
          border: "unset",
        }}
      />
      <Image
        src="/icons/plus.png"
        alt="plus"
        w={5}
        cursor={"pointer"}
        h={5}
        onClick={onPlusClicked}
      />
    </Flex>
  );
};

export default NumericInput;
