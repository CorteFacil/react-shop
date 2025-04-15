// Salve como populate-db.js e execute com Node.js
import { createClient } from '@supabase/supabase-js';

// Substitua com suas credenciais do Supabase
const supabaseUrl = 'https://htuuzmkqxjlwuaqjeugs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dXV6bWtxeGpsd3VhcWpldWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTk4MDcsImV4cCI6MjA2MDI5NTgwN30.aNTknbIXRRxG9VOkA_vWIVzi8sPk-lfgs__OQhZwsp8';
const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    title: 'Smartphone XS Pro',
    description: 'Smartphone de última geração com câmera de 108MP e tela AMOLED de 6.7".',
    price: 2499.90,
    image: 'https://picsum.photos/300/200?random=1'
  },
  // ... adicione os outros 23 produtos aqui
];

async function insertProducts() {
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);
    
    if (error) {
      console.error('Erro ao inserir produto:', product.title, error);
    } else {
      console.log('Produto inserido com sucesso:', product.title);
    }
  }
}

insertProducts()
  .then(() => console.log('Todos os produtos foram inseridos!'))
  .catch(err => console.error('Erro:', err));