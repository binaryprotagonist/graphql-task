import { Launch, Rocket } from 'models/common';
import './LaunchItem.scss';

const renderRocket = (rocket: Rocket) => {
  return (
    <div className="rocket">
      <h4>Rocket</h4>
      <p>Rocket : {rocket.rocket_name}</p>
      <p>Rocket Type : {rocket.rocket_type}</p>
      <p>First State : </p>
    </div>
  );
};

const LaunchItem = ({ launch }: { launch: Launch }) => {
  return (
    <div className="launch-item">
      <div className="mission">
        <h4>Mission</h4>
        <p>Name : {launch.mission_name}</p>
        <p>Date : {new Date(launch.launch_date_local).toDateString()}</p>
        <p>Link : {launch.links.wikipedia?.toString()}</p>
      </div>
      <div className="divider"></div>
      <div className="link">
        <h4>Site Name</h4>
        <p>{launch.launch_site.site_name_long}</p>
      </div>
      <div className="divider"></div>
      <div className="rocket">{renderRocket(launch.rocket)}</div>
    </div>
  );
};

export default LaunchItem;
