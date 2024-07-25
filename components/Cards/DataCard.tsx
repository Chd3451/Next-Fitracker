import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import React from "react";

type Props = {
  name: string;
  amount: number;
};

const DataCard = (props: Props) => {
  const { name, amount } = props;
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            <Metric> {amount}</Metric>
          </div>
          <BadgeDelta deltaType="moderateIncrease">15%</BadgeDelta>
        </Flex>
        <Flex className="mt-4">
          <Text className="truncate">14.5% ( 145)</Text>
          <Text> 1,000</Text>
        </Flex>
        <ProgressBar value={15.9} className="mt-2" />
      </Card>
    </div>
  );
};

export default DataCard;
