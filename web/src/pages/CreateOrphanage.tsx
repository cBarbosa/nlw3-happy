import React, { FormEvent, useState, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-orphanage.css';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router";

export default function CreateOrphanage() {

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        console.log(e);
        //  map.locate();
        setPosition({latitude: e.latlng.lat, longitude: e.latlng.lng});
      },
      locationfound(e) {
        // setPosition({latitude: e.latlng.lat, longitude: e.latlng.lng});
        map.flyTo(e.latlng, map.getZoom());
      },
    })
  
    return position === null ? null : (
      // <Marker position={position}>
      //   <Popup>You are here</Popup>
      // </Marker>
      position.latitude !== 0 ? 
      <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
      : null
    )
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const  {latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Salvo com sucesso');

    history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    
    if(!event.target.files){
      return;
    }

    const images = Array.from(event.target.files);

    setImages(images);

    const selectedImagesPreview = images.map(img => {
      return URL.createObjectURL(img);
    });

    setPreviewImages(selectedImagesPreview);
  }

  const [position, setPosition] = useState({latitude:0, longitude:0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const history = useHistory();

  return (
    <div id="page-create-orphanage">

      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              {/* <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}
              <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} /> */}
              <LocationMarker />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>M??ximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <img key={index} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
              />
              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visita????o</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instru????es</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Hor??rio de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={()=>setOpenOnWeekends(true)}
                >
                    Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={()=>setOpenOnWeekends(false)}
                >
                  N??o
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
