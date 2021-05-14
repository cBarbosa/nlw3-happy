import React from 'react';
import {Link} from  'react-router-dom';
import {FiPlus} from 'react-icons//fi';
import {MapContainer, TileLayer} from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';


function OrphanagesMap() {
  return (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="marker" />

                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas  crianças estão esperando sua visita :)</p>
            </header>

            <footer>
                <strong>Rio do sul</strong>
                <span>Santa  Catarina</span>
            </footer>
        </aside>

        <MapContainer
            center={[-15.8046, -47.7794]}
            zoom={15}
            style={{width: '100%', height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>

        <Link to="" className="create-orphanage" >
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default OrphanagesMap;