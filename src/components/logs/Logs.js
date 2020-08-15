import React, { useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
};

// log key is the key that will be used in here
// State.log pertains to the key name for the logReducer that we had called in rootReducer ( index.js  )
const mapStateToProps = (state) => ({
  log: state.log,
});

// Second parameter is the object of actions that we wish to run in here
export default connect(mapStateToProps, { getLogs })(Logs);
