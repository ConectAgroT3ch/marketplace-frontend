import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tag, DollarSign, Package, Image as ImageIcon, 
  FileText, Sprout, Tractor, Apple, Wheat, CheckCircle, UploadCloud, X
} from "lucide-react";
import "../../styles/novo-produto-moderno.css";

export default function NovoProduto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    descricao: "",
    unidade: "un",
    categoria: "graos",
    imagemUrl: "" // Aqui guardaremos a URL (ou o blob local)
  });

  const [dragActive, setDragActive] = useState(false);

  const categories = [
    { id: "graos", nome: "Grãos", icon: <Wheat size={20} /> },
    { id: "horti", nome: "Hortifruti", icon: <Apple size={20} /> },
    { id: "insumos", nome: "Insumos", icon: <Sprout size={20} /> },
    { id: "maquinas", nome: "Máquinas", icon: <Tractor size={20} /> },
    { id: "outros", nome: "Outros", icon: <Package size={20} /> },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Lógica para Upload de Imagem (Simulado localmente)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setForm({ ...form, imagemUrl: objectUrl });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setForm({ ...form, imagemUrl: objectUrl });
    }
  };

  const removeImage = () => {
    setForm({ ...form, imagemUrl: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.preco) return alert("Preencha os campos obrigatórios");

    const novoProduto = {
      _id: Date.now().toString(),
      ...form,
      preco: parseFloat(form.preco),
      vendedor: "Você",
      rating: 5.0
    };

    const produtosSalvos = JSON.parse(localStorage.getItem("marketplace_produtos")) || [];
    localStorage.setItem("marketplace_produtos", JSON.stringify([novoProduto, ...produtosSalvos]));

    alert("✅ Produto anunciado com sucesso!");
    navigate("/produtos");
  };

  return (
    <div className="novo-produto-page">
      <div className="page-header">
        <h1>📢 Anunciar Produto</h1>
        <p>Preencha os dados e adicione uma boa foto para vender mais rápido.</p>
      </div>
      
      <div className="layout-grid">
        {/* ESQUERDA: FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="form-card-modern">
          
          {/* Seção 1: Upload de Imagem (Agora em destaque no topo) */}
          <section className="form-section">
            <h3><ImageIcon size={18} /> Mídia do Produto</h3>
            
            <div 
              className={`image-upload-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {form.imagemUrl ? (
                <div className="image-preview-box">
                  <img src={form.imagemUrl} alt="Preview" />
                  <button type="button" onClick={removeImage} className="btn-remove-image">
                    <X size={16} /> Remover
                  </button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="upload-label">
                  <UploadCloud size={40} color="#004E8A" />
                  <p><strong>Clique para enviar</strong> ou arraste a foto aqui</p>
                  <span>JPG, PNG ou WebP (Máx. 5MB)</span>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{display: 'none'}} 
                  />
                </label>
              )}
            </div>
          </section>

          {/* Seção 2: Dados Básicos */}
          <section className="form-section">
            <h3><Tag size={18} /> Dados do Produto</h3>
            <div className="input-group-modern">
              <label>O que você está vendendo?</label>
              <input 
                type="text" name="nome" 
                placeholder="Ex: Soja, Trator, Queijo..." 
                value={form.nome} onChange={handleChange} required
              />
            </div>

            <div className="input-group-modern">
              <label>Categoria</label>
              <div className="category-selector">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-btn ${form.categoria === cat.id ? 'active' : ''}`}
                    onClick={() => setForm({...form, categoria: cat.id})}
                  >
                    {cat.icon}
                    <span>{cat.nome}</span>
                    {form.categoria === cat.id && <CheckCircle size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Seção 3: Preço e Detalhes */}
          <section className="form-section">
            <h3><DollarSign size={18} /> Detalhes da Venda</h3>
            <div className="two-col-grid">
               <div className="input-group-modern">
                <label>Preço (R$)</label>
                <div className="input-with-icon">
                  <DollarSign size={16} className="field-icon" />
                  <input 
                    type="number" name="preco" placeholder="0.00" step="0.01"
                    value={form.preco} onChange={handleChange} required
                    style={{paddingLeft: '35px'}}
                  />
                </div>
              </div>

              <div className="input-group-modern">
                <label>Unidade</label>
                <div className="input-with-icon">
                  <Package size={16} className="field-icon" />
                  <select name="unidade" value={form.unidade} onChange={handleChange} style={{paddingLeft: '35px'}}>
                    <option value="un">Unidade (un)</option>
                    <option value="kg">Quilo (kg)</option>
                    <option value="saca">Saca (sc)</option>
                    <option value="ton">Tonelada (ton)</option>
                    <option value="arr">Arroba (@)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-group-modern" style={{marginTop: 20}}>
              <label>Descrição</label>
              <textarea 
                name="descricao" rows="4"
                placeholder="Conte mais sobre seu produto..." 
                value={form.descricao} onChange={handleChange} required
              />
            </div>
          </section>

          <button type="submit" className="btn-submit-modern">Publicar Anúncio</button>
        </form>

        {/* DIREITA: PREVIEW AO VIVO */}
        <div className="preview-section">
          <div className="sticky-preview">
            <h3>Pré-visualização</h3>
            <div className="produto-card preview-card">
              <div className="produto-img-wrapper">
                {form.imagemUrl ? (
                  <img src={form.imagemUrl} alt="Preview" className="produto-img" />
                ) : (
                  <div className="placeholder-preview">
                    <ImageIcon size={40} color="#ccc" />
                    <span>Sem imagem</span>
                  </div>
                )}
              </div>
              <div className="produto-info">
                <h3>{form.nome || "Título do Produto"}</h3>
                <p className="produto-preco">
                  R$ {form.preco ? parseFloat(form.preco).toFixed(2) : "0.00"} 
                  <span style={{ fontSize: "0.8em", color: "#666", fontWeight: "normal" }}> / {form.unidade}</span>
                </p>
                <div className="btn-detalhes" style={{textAlign: 'center', background: '#e3f2fd', color: '#004E8A', padding: '8px', borderRadius: '6px'}}>
                  Ver Detalhes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}