import { useCallback, useMemo, useRef, useState } from 'react'
import logo from '../assets/PLANeTlogo.png';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from "leaflet";

export const icon = new Icon({
    iconUrl: logo,
    iconSize: [30, 30]
});

const DraggableMarker = ({ setPosition, position }) => {

  const [draggable, setDraggable] = useState(false)
  const markerRef = useRef(null);

  // const map = useMapEvents({
  //   click() {
  //     map.locate()
  //   },
  //   locationfound(e) {
  //     setPosition(e.latlng)
  //     map.flyTo(e.latlng, map.getZoom())
  //   },
  // })

  const eventHandlers = useMemo(() => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(position)
        }
      },
    }),[]);

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  },[]);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}>
        
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker