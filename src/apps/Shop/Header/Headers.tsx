import { Input, Text } from "@mantine/core";
import FilterBy from "./FilterBy";

function Headers({text}: any) {
  return (
    <div className="bg-slate-800 border-b-2 border-gray-700 sm:min-h-24  top-0 left-0 right-0 z-20 sticky md:top-0 p-3">
      <Text className="text-center" component="h1">
        {text}
      </Text>

      <div className="flex justify-center">
        <FilterBy />
        <Input placeholder="search" />
      </div>
    </div>
  );
}

export default Headers;
