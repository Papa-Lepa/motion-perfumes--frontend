function Men() {
  const menPerfumes = [
    {
      id: 1,
      name: "Dior Sauvage",
      price: "ksh 1200",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
    },
    {
      id: 2,
      name: "Bleu de Chanel",
      price: "ksh 1500 ",
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d"
    },
    {
      id: 3,
      name: "Versace Eros",
      price: "ksh 1300",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
    }
  ];

  return ( 
  <><div
  className="collection-banner"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f')"
  }}
>
  Men's Collection
</div>
    
    <div className="products-page">
      

      <div className="product-grid">
        {menPerfumes.map((perfume) => (
          <div className="product-card" key={perfume.id}>
            <img src={perfume.image} alt={perfume.name} />

            <div className="product-info">
              <h3>{perfume.name}</h3>
              <p>{perfume.price}</p>

              <button>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
</>  );
}

export default Men;