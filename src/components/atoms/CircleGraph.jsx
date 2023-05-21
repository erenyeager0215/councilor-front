import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export let data = {
  labels: [],
  datasets: [
    {
      label: "利用ユーザ数",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const CircleGraph = (props) => {
  const userData = props;
  const setsData = data.datasets[0].data;
  const setsLabel = data.labels;
  setsData.length = 0;
  setsLabel.length = 0;
  for (let i = 0; i < userData.props.length; i++) {
    let labelname = userData.props[i].group_age;
    switch (labelname) {
      case "19s":
        setsLabel.push("19歳以下");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "20s":
        setsLabel.push("20代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "30s":
        setsLabel.push("30代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "40s":
        setsLabel.push("40代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "50s":
        setsLabel.push("50代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "60s":
        setsLabel.push("60代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "70s":
        setsLabel.push("70代");
        setsData.push(userData.props[i].num_of_people);
        break;
      case "80~":
        setsLabel.push("80歳以上");
        setsData.push(userData.props[i].num_of_people);
        break;
    }
  }
  return (
    <div style={{ width: "375px", height: "375px" }}>
      <Pie data={data} optins={{ aspectRatio: 1 }} />;
    </div>
  );
};
