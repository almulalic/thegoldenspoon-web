import React, { useState, useEffect } from "react";
import { Page } from "./../../elements/page/Page";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import leaderboard from "../../api/leaderboard";
import countries from "../../shared/json/countriesList.json";
import "./Leaderboards.scss";

export const Leaderboards = () => {
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState();
  const [leaderboardData, setLeaderboardData] = useState();

  const LoadLeaderboardData = () => {
    leaderboard
      .fetchOverallLeaderbord()
      .then((leaderboardData) => {
        setLeaderboardData(leaderboardData.data);
        setIsLoadingLeaderboard(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingLeaderboard(false);
      });
  };

  useEffect(() => {
    LoadLeaderboardData();
    setIsLoadingLeaderboard(true);
  }, []);

  const [selectedStatus, setStelectedStatus] = useState();
  const onStatusChange = (newStatus) => {
    setStelectedStatus(newStatus);
  };

  const statuses = ["not visited", "booked for next trip", "visited"];

  const statusFilter = (
    <Dropdown
      value={selectedStatus}
      options={statuses}
      onChange={onStatusChange}
      // itemTemplate={this.statusItemTemplate}
      showClear={true}
      placeholder="Select a Status"
      className="p-column-filter"
    />
  );

  const dateFilter = (
    <div></div>
    // <Calendar
    //   value={this.state.dateFilter}
    //   onChange={this.onDateFilterChange}
    //   placeholder="Registration Date"
    //   dateFormat="yy-mm-dd"
    //   className="p-column-filter"
    // />
  );

  const representativeFilter = (
    // <MultiSelect
    //   className="p-column-filter"
    //   value={this.state.selectedRepresentatives}
    //   options={this.state.representatives}
    //   onChange={this.onRepresentativeFilterChange}
    //   itemTemplate={this.representativeItemTemplate}
    //   placeholder="All"
    //   optionLabel="name"
    //   optionValue="name"
    // />
    <div></div>
  );

  const header = (
    <div>
      LEADERBOARDS
      <div className="p-datatable-globalfilter-container">
        {/* <InputText
          type="search"
          onInput={(e) => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
        /> */}
      </div>
    </div>
  );

  const renderIndex = (rowData, row) => {
    return (
      <div
        className={`Leaderboard-Index-${
          row.rowIndex + 1 === 1
            ? "1"
            : row.rowIndex + 1 === 2
            ? "2"
            : row.rowIndex + 1 === 3
            ? "3"
            : "0"
        }`}
      >
        {row.rowIndex + 1}
      </div>
    );
  };

  const renderFlag = (rowData) => {
    return (
      <div className="Leaderboard-Country">
        <img
          className="Leaderboard-Flag"
          src={require(`../../assets/flags/${rowData.country.code}.png`)}
        />
        <p>{rowData.country.name}</p>
      </div>
    );
  };

  return (
    <Page padding="none">
      {" "}
      <div className="content-section implementation">
        <DataTable
          // ref={(el) => (this.dt = el)}
          value={leaderboardData}
          header={header}
          responsive
          className="Leaderboard-Table"
          dataKey="id"
          loadingBody={isLoadingLeaderboard}
          rowHover
          // globalFilter={this.state.globalFilter}
          // selection={this.state.selectedCustomers}
          // onSelectionChange={(e) =>
          //   this.setState({ selectedCustomers: e.value })
          // }
          paginator
          rows={10}
          emptyMessage="No users found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column body={renderIndex} className="Leaderboard-Index" />
          <Column
            field="username"
            header="Username"
            sortable
            filter
            filterPlaceholder="Search by username"
          />
          <Column
            field="fullName"
            header="Full Name"
            sortable
            filter
            filterPlaceholder="Search by full name"
          />
          <Column
            sortField="country.name"
            filterField="country.name"
            field="country"
            header="Country"
            body={renderFlag}
            sortable
            filter
            filterMatchMode="contains"
            filterPlaceholder="Search by country"
          />

          <Column
            field="progress"
            header="Progress"
            sortable
            filter
            filterPlaceholder="Search by progress"
          />
        </DataTable>
      </div>
    </Page>
  );
};
