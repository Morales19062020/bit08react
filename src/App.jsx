import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Modal,ModalHeader,ModalBody,ModalFooter,} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

function App() {
  
  
  const dataArt = [
    { id: 1, nombre: "Vinicius Jurnior", equipo: 'Real Madrid' },
    { id: 2, nombre: "Cristiano Ronaldo", equipo: 'Al Nassar FC' },
    { id: 3, nombre: "Lionel Messi", equipo: 'PSG' },
    { id: 4, nombre: "Karin Benzema", equipo: 'Real Madrid' },
    { id: 5, nombre: "Carlos Casemiro", equipo: 'Manchester United' },
    { id: 6, nombre: "Kylian Mbappe", equipo: 'PSG' },
  ];
  const [data, setData] = useState(dataArt);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [artSeleccionado, setArtSeleccionado] = useState({
    id: '',
    nombre: '',
    equipo: ''
  });
  const seleccionarPersonaje=(elemento, caso)=>{
    setArtSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }
  const handleChange=e=>{
    const {name, value}=e.target;
    setArtSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }
  //Const de Editacion//
  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(personaje=>{
      if(personaje.id===artSeleccionado.id){
        personaje.nombre=artSeleccionado.nombre;
        personaje.equipo=artSeleccionado.equipo;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }
  //Const de Eliminacion//
  const eliminar =()=>{
    setData(data.filter(personaje=>personaje.id!==artSeleccionado.id));
    setModalEliminar(false);
  }
  const abrirModalInsertar=()=>{
    setArtSeleccionado(null);
    setModalInsertar(true);
  }
  //Const de Insertar// 
  const insertar =()=>{
    var valorInsertar=artSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }
  // Creando la tabla en el HTML//
  return (
    
    
    <div className="App">
    <div class= "tabla">
      <h2>Escribe tu jugador de Futbol favorito</h2>
      <br />
    <button type="button" class="btn btn-outline-danger" onClick={()=>abrirModalInsertar()}>Agrega tu Jugador</button>
    <br /><br /><br />
      <Table className="table table-bordered">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NOMBRE</Th>
            <Th>EQUIPO</Th>
            <Th>ACCIÓN</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.equipo}</td>
              <td><button type="button" class="btn btn-warning" onClick={()=>seleccionarPersonaje(elemento, 'Editar')}>Editar</button> {"   "} 
              <button type="button" class="btn btn-danger" onClick={()=>seleccionarPersonaje(elemento, 'Eliminar')}>Eliminar</button>
              </td>
            </tr>
          ))
          }
        </Tbody>
      </Table>
      </div>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Jugador</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id</label>
            <input
              className="form-control"
              readOnly
              type="number"
              name="id"
              value={artSeleccionado && artSeleccionado.id}
            />
            <br />
            <label>Jugador</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={artSeleccionado && artSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
            <label>Equipo</label>
            <input
              className="form-control"
              type="text"
              name="equipo"
              value={artSeleccionado && artSeleccionado.equipo}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-warning" onClick={()=>editar()}>Actualizar</button>
          <button type="button" class="btn btn-outline-danger" onClick={()=>setModalEditar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el jugador {artSeleccionado && artSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-warning" onClick={()=>eliminar()}>
            Aceptar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEliminar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Agrega un nuevo Jugador</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />
            <label>Jugador</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={artSeleccionado ? artSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
            <label>Equipo</label>
            <input
              className="form-control"
              type="text"
              name="equipo"
              value={artSeleccionado ? artSeleccionado.equipo: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-warning" onClick={()=>insertar()}>Insertar</button>
          <button type="button" class="btn btn-outline-danger" onClick={()=>setModalInsertar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;