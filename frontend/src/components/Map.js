import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
  
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '30vh', width: '40%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyB9Sw55PDz5rad_FqiKbdwYqDMgWiSnhOo" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }

export default Map;