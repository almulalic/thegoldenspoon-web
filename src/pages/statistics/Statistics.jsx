import React, { useState, useEffect } from "react";
import { Page } from "./../../elements/page/Page";
import { Chart } from "primereact/chart";
import statistics from "../../api/statistics";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "../../elements/card/Card";
import { Stack } from "../../elements/stack/Stack";
import { BorderCard } from "./../../elements/borderCard/BorderCard";

export const Statistics = (props) => {
  const [statisticsData, setStatisticsData] = useState();
  const [usersCategoriesStats, setUsersCategoriesStats] = useState();
  const [usersSubcategoriesStats, setUsersSubcategoriesStats] = useState();
  const [usersStatusStats, setUsersStatusStats] = useState();

  const [isLoadingStatisticsData, setLoadingStatisticsData] = useState(false);

  const categoriesNames = JSON.parse(
    localStorage.getItem("restaurantCategories")
  ).map((category) => {
    return category.name;
  });

  const subcategoriesNames = JSON.parse(
    localStorage.getItem("restaurantSubcategories")
  ).map((subcategory) => {
    return subcategory.name;
  });

  const NormalizeCategoriesData = (_statisticsData) => {
    return {
      labels: categoriesNames,
      datasets: [
        {
          data: _statisticsData.categoryTotal,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FFCE56",
            "#FFCE56",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FFCE56",
            "#FFCE56",
          ],
        },
      ],
    };
  };

  const NormalizeSubcategoriesData = (_statisticsData) => {
    return {
      labels: subcategoriesNames,
      datasets: [
        {
          data: _statisticsData.subcategoryTotals,
          backgroundColor: [
            "#46d5e9",
            "#c66efd",
            "#25a207",
            "#4cc6e7",
            "#7616ca",
            "#31e1ff",
            "#c8fcb3",
            "#f1ba99",
            "#ff43ba",
            "#19ec2c",
            "#9e4509",
            "#5fa529",
            "#c47687",
            "#0c629a",
            "#dd51f1",
            "#c7b852",
            "#c68d35",
            "#bda39c",
            "#f2e8e7",
            "#c32b3c",
            "#7c3fe4",
            "#19ec68",
            "#64ecdd",
            "#64fc9c",
            "#90bdfb",
            "#952908",
            "#2acda0",
            "#6707e2",
            "#5af1a8",
            "#4d8335",
            "#9d2186",
            "#187b7a",
            "#c2d67a",
            "#94de2d",
            "#022f91",
            "#887907",
            "#083719",
            "#86d498",
            "#9725be",
          ],
          hoverBackgroundColor: [
            "#46d5e9",
            "#c66efd",
            "#25a207",
            "#4cc6e7",
            "#7616ca",
            "#31e1ff",
            "#c8fcb3",
            "#f1ba99",
            "#ff43ba",
            "#19ec2c",
            "#9e4509",
            "#5fa529",
            "#c47687",
            "#0c629a",
            "#dd51f1",
            "#c7b852",
            "#c68d35",
            "#bda39c",
            "#f2e8e7",
            "#c32b3c",
            "#7c3fe4",
            "#19ec68",
            "#64ecdd",
            "#64fc9c",
            "#90bdfb",
            "#952908",
            "#2acda0",
            "#6707e2",
            "#5af1a8",
            "#4d8335",
            "#9d2186",
            "#187b7a",
            "#c2d67a",
            "#94de2d",
            "#022f91",
            "#887907",
            "#083719",
            "#86d498",
            "#9725be",
          ],
        },
      ],
    };
  };

  const NormalizeStatus = (_statisticsData) => {
    return {
      labels: ["Not visited", "Booked for next trip", "Visited"],
      datasets: [
        {
          data: _statisticsData.statusTotals,
          backgroundColor: ["#FFCCCB", "#F0E68C", "#7FFF00"],
          hoverBackgroundColor: ["#FFCCCB", "#F0E68C", "#7FFF00"],
        },
      ],
    };
  };

  const GetStatisticsData = () => {
    statistics
      .fetchUserStatistics("andsnyder")
      .then((statisticsResponse) => {
        setStatisticsData(statisticsResponse.data);
        setUsersCategoriesStats(
          NormalizeCategoriesData(statisticsResponse.data)
        );
        setUsersSubcategoriesStats(
          NormalizeSubcategoriesData(statisticsResponse.data)
        );
        setUsersStatusStats(NormalizeStatus(statisticsResponse.data));

        setLoadingStatisticsData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatisticsData(false);
      });
  };

  useEffect(() => {
    setLoadingStatisticsData(true);
    GetStatisticsData();
  }, []);

  return (
    <Page padding="none">
      {isLoadingStatisticsData ? (
        <ProgressSpinner />
      ) : (
        <Stack vertical>
          <Stack alignment="center" distribution="center">
            <BorderCard title="Total visited">
              {statisticsData?.total}
            </BorderCard>
            <BorderCard title="Total Booked">
              {statisticsData?.statusTotals[1]}
            </BorderCard>
          </Stack>
          <Stack alignment="center" distribution="center">
            <BorderCard title="Progress by categories">
              <Chart
                height="300px"
                width="300px"
                type="pie"
                data={usersCategoriesStats}
              />
            </BorderCard>
            <BorderCard title="Progress by subcategories">
              <Chart
                height="300px"
                width="300px"
                type="pie"
                data={usersSubcategoriesStats}
                options={{
                  legend: {
                    display: false,
                  },
                }}
              />
            </BorderCard>
            <BorderCard title="Progress by status">
              <Chart
                height="300px"
                width="300px"
                type="pie"
                data={usersStatusStats}
              />
            </BorderCard>
          </Stack>
        </Stack>
      )}
    </Page>
  );
};
