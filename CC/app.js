var React = require('react')
var ReactDOM = require('react-dom')

var Shows = React.createClass({
getInitialState: function() {
  return {
    showName: '',
    startTime: '',
    endTime: '',
    wheretoWatch: ''
  };
},

componentDidMount: function() {
  this.serverRequest = $.get(this.props.source, function (result) {
    var lastShow = result[0];
    this.setState({
      showName: lastShow.Name,
      startTime: lastShow.Start,
      endTime: lastShow.End,
      wheretoWatch: lastShow.Where
    });
  }.bind(this));
},

componentWillUnmount: function() {
  this.serverRequest.abort();
},

render: function() {
  return (
      <div>{this.state.lastShow}</div>
  );
}
});

ReactDOM.render(
<Shows source="http://127.0.0.1:8888/getCurrentShows" />,
mountNode
);