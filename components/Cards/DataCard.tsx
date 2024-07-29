// components/Cards/DataCard.tsx

import React from "react";
import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text } from "@tremor/react";

type Props = {
  name: string;
  amount: number;
  percentageChange: number;
  currentValue: number;
  totalValue: number;
  progress: number;
};

const DataCard: React.FC<Props> = ({
  name,
  amount,
  percentageChange,
  currentValue,
  totalValue,
  progress
}) => {
  return (
    <Card className="mx-auto max-w-lg">
      <Flex alignItems="start">
        <div>
          <Text>{name}</Text>
          <Metric>{amount}</Metric>
        </div>
        <BadgeDelta deltaType={percentageChange >= 0 ? "moderateIncrease" : "moderateDecrease"}>
          {percentageChange}%
        </BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">{currentValue}% ({totalValue})</Text>
        <Text>{amount}</Text>
      </Flex>
      <ProgressBar value={progress} className="mt-2" />
    </Card>
  );
};

export default DataCard;
