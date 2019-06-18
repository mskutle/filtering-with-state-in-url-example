import React from "react";
import qs from "query-string";

let history = {};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: qs.parse(window.location.search) || {
        city: "all",
        country: "all"
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filters.city !== prevState.filters.city) {
      this.updateUrl();
    } else if (this.state.filters.country !== prevState.filters.country) {
      this.updateUrl();
    }
  }

  updateUrl = () => {
    window.history.replaceState(
      history,
      null,
      `?${qs.stringify(this.state.filters)}`
    );
  };

  handleCityChange = e => {
    const city = e.target.value;
    this.setState({
      filters: {
        ...this.state.filters,
        city
      }
    });
  };

  handleCountryChange = e => {
    const country = e.target.value;
    this.setState({
      filters: {
        ...this.state.filters,
        country
      }
    });
  };

  render() {
    return (
      <>
        <h1>Diverse filtre</h1>
        <h2>Velg et land</h2>
        <select
          onChange={this.handleCountryChange}
          defaultValue={this.state.filters.country}
        >
          <option value="all">Alle</option>
          <option value="norway">Norge</option>
          <option value="sweden">Sverige</option>
        </select>
        <h2>Velg en by</h2>
        <select
          onChange={this.handleCityChange}
          defaultValue={this.state.filters.city}
        >
          <option value="all">Alle</option>
          <option value="bergen">Bergen</option>
          <option value="oslo">Oslo</option>
        </select>
      </>
    );
  }
}
