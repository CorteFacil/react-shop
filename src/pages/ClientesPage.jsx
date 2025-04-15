import { useEffect, useState } from 'react';
import supabase from '../services/supabase'; 


function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      const { data, error } = await supabase
        .from('clientes') // nome da sua tabela no Supabase
        .select('*');

      if (error) {
        console.error('Erro ao buscar clientes:', error.message);
      } else {
        setClientes(data);
      }
      setLoading(false);
    }

    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Listagem de Clientes</h1>
      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        <table className="table table-striped">
          <thead>
  <tr>
    <th>ID</th>
    <th>Nome</th>
    <th>Nascimento</th>
    <th>Telefone</th>
    <th>Email</th>
    <th>Foto</th>
  </tr>
</thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.data_nascimento}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.url_foto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesPage;
