(function () {
  'use strict';

  var Recording = React.createClass({
    propTypes: {
      created_at: React.PropTypes.instanceOf(Date).isRequired,
      guid: React.PropTypes.string.isRequired,
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    },

    render: function () {
      return (
        <tr>
          <td>
            <a href={this.props.url}>
              {this.props.guid}
            </a>
          </td>
          <td>{this.props.created_at.toISOString()}</td>
          <td>
            <a href={"https://www.openstreetmap.org/#map=13/" + this.props.latitude + "/" + this.props.longitude}>
              {this.props.latitude}, {this.props.longitude}
            </a>
          </td>
        </tr>
      );
    }
  });

  var Recordings = React.createClass({
    getInitialState: function () {
      return {
        recordings: [
          {
            created_at: new Date(),
            guid: '12341234-1234-1234-1234-123412341234',
            latitude: 48.8613854,
            longitude: 2.3346815,
            url: 'https://www.google.com'
          }
        ]
      };
    },

    componentDidMount: function () {},

    render: function () {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Created at</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      );
    },

    renderRows: function () {
      return this.state.recordings.map(function (recording) {
        return <Recording key={recording.guid} {...recording} />;
      });
    }
  });

  var Component = React.createClass({
    render: function () {
      return (
        <div>
          <h1>AmbiFX</h1>
          <Recordings />
        </div>
      );
    }
  });

  ReactDOM.render(
    <Component />,
    document.getElementById('component')
  );
}());
