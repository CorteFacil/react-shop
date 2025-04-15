import supabase from './supabase';

const productService = {
  // Obter produtos com paginação
  async getProducts(page = 1, limit = 8) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // Buscar produtos com paginação
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
    
    return { 
      products: data, 
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  },
  
  // Obter um produto pelo ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
    
    return data;
  },
  
  // Criar um novo produto
  async createProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Atualizar um produto existente
  async updateProduct(id, product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
    
    return data[0];
  },
  
  // Deletar um produto
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
    
    return true;
  }
};

export default productService;