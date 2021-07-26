import {useState,useEffect} from "react";

import Row from "./Row";

const TOTAL_PAGES = 4;

const Table = (props) => {
    const [data, setData] = useState([]);
    const [filas, setFilas] = useState([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        setData(props.data)
    }, [props.data]);

    useEffect(() => {
        if(data.length){
            setFilas(data.map((el,i) => {
                const min = Math.floor(data.length / TOTAL_PAGES * page);
                const max = Math.floor(data.length / TOTAL_PAGES * page + data.length / TOTAL_PAGES);
                if(i >= min && i <= max)
                    return <Row key={el.id} data={el}></Row>
            }
            ))
        }
    }, [data,page]);

    if(!data.length) return "SIN DATOS";
    
    const sortBy = (header) => {
        const newData = data.sort( (el1, el2) =>{
            if(typeof(el1[header]) =="number") 
                return el1[header] - el2[header];
            if(typeof(el1[header]) =="string")
                return el1[header].localeCompare(el2[header]);
        })
        setData([...newData]);
    }

    // const encabezado = Object.keys(data[0]).map(el =>(
    //     <th key={el} onClick={() => sortBy(el)}>{el}</th>
    // ))

    const encabezadoMin = <tr>
        <th onClick={() => sortBy("id")}>{"id"}</th>
        <th onClick={() => sortBy("name")}>{"name"}</th>
        <th onClick={() => sortBy("username")}>{"username"}</th>
        <th onClick={() => sortBy("email")}>{"email"}</th>
    </tr>

    return (
        <>
        <h1 className="text-center">Prueba GEDESCO</h1>
        <div className="p-5">
        <table className="table">
            <tbody>
                {encabezadoMin}
                {filas}
            </tbody>
        </table>
        </div>
        <div className="text-center mb-5">
            { page >0 && 
                <button className="btn btn-primaty text-center" onClick={() => setPage(page - 1)}>Anterior</button>}
            { page < TOTAL_PAGES -1 && 
                <button className="btn btn-primaty text-center" onClick={() => setPage(page +1)}>Siguiente</button>}
            
            
        </div>
        </>
    )
}


export default Table;