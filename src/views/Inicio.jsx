import { useEffect, useState } from 'react';
import useSWR from 'swr'
import Producto from "../components/Producto";
import { Spinner } from '../components/Spinner';
import clienteAxios from '../config/axios';
import useQuiosco from "../hooks/useQuiosco";

export default function Inicio() {
  const [productos, setProductos] = useState([])
  const { categoriaActual } = useQuiosco()

  //Consulta SWR
  const fetcher = () => clienteAxios('/api/productos').then( data => data.data)
  const { data, error, isLoading, isValidating } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })

  useEffect(() => {
    if(!isLoading || !isValidating)
      setProductos(data.data.filter(producto => producto.categoria_id === categoriaActual.id))
  }, [isLoading, categoriaActual, isValidating])

  return (
    <>
      <h1 className="text-4xl font-black">{ categoriaActual.nombre }</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        { isLoading 
          ? (<Spinner
              isLoading
          />)
          : productos.map(producto => (
              <Producto
                key = {  producto.imagen }
                producto = { producto }
              />
            )) }
      </div>
    </>
  )
}