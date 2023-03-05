import { Timeline } from "react-twitter-widgets";

export const TwitterEmb = () => {
  return (
    <>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "tsumagari1977",
        }}
        options={{
          height: "200",
        }}
      />
    </>
  );
};
