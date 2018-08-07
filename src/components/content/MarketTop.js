import React, { Component } from 'react';
import ChartsController from './ChartsController';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { project_kinds, project_platforms } from '../../game/knowledge';

class MarketTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_kind: 'all',
      selected_platform: 'all',
    };

    //  this.embark = this.embark.bind(this);
  }

  render() {
    const data = this.props.data;

    let filtered_reports = [];
    let put = report => {
      filtered_reports.push(report);
    };

    data.simplified_reports.forEach(report => {
      if (
        this.state.selected_kind === 'all' &&
        this.state.selected_platform === 'all'
      ) {
        put(report);
      } else if (this.state.selected_kind === 'all') {
        if (this.state.selected_platform === report.platform) {
          put(report);
        }
      } else if (this.state.selected_platform === 'all') {
        if (this.state.selected_kind === report.kind) {
          put(report);
        }
      } else {
        if (
          this.state.selected_platform === report.platform &&
          this.state.selected_kind === report.kind
        ) {
          put(report);
        }
      }
    });

    let table_data_full = _.sortBy(filtered_reports, 'total');
    let category_count = table_data_full.length;
    let table_data = table_data_full.slice(-10);
    table_data.forEach((val, key) => {
      table_data[key].top = table_data.length - key;
    });

    table_data = table_data.reverse();

    let no_data = false;

    let platform_options = _.keys(project_platforms).map(platform => {
      return { value: platform, label: project_platforms[platform].name };
    });
    platform_options.push({ value: 'all', label: 'All' });

    let kind_options = _.keys(project_kinds).map(platform => {
      return { value: platform, label: project_kinds[platform].name };
    });
    kind_options.push({ value: 'all', label: 'All' });

    return (
      <div>
        <div className="">
          <span className="">
            <Select
              name="form-field-name"
              value={this.state.selected_platform}
              options={platform_options}
              onChange={e => {
                this.setState({ selected_platform: e.value });
              }}
            />
          </span>
          <span className="">
            <Select
              name="form-field-name"
              value={this.state.selected_kind}
              options={kind_options}
              onChange={e => {
                this.setState({ selected_kind: e.value });
              }}
            />
          </span>
          <span className="">Project in category: {category_count}</span>
        </div>
        <ChartsController
          chart={{
            name: 'Market statistics',
            type: 'Market',
            table_data: table_data,
          }}
        />
        <div className="text-center">
          {no_data ? (
            <div style={{ padding: 100 }}>
              <h2>Such programs have not yet been written.</h2>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr key="head">
                  <th>Top</th>
                  <th>Name</th>
                  <th>design</th>
                  <th>manage</th>
                  <th>program</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {table_data.map(row => (
                  <tr
                    key={row.id}
                    className={row.is_player ? 'table-success' : ''}
                  >
                    <th
                      scope="row"
                      className={row.is_player ? 'table-success' : ''}
                    >
                      {row.top}
                    </th>
                    <td className={row.is_player ? 'table-success' : ''}>
                      {row.name}
                    </td>
                    <td className={row.is_player ? 'table-success' : ''}>
                      {row.design}
                    </td>
                    <td className={row.is_player ? 'table-success' : ''}>
                      {row.manage}
                    </td>
                    <td className={row.is_player ? 'table-success' : ''}>
                      {row.program}
                    </td>
                    <td className={row.is_player ? 'table-success' : ''}>
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default MarketTop;
