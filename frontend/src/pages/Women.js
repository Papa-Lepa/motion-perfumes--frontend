function Women() {
  const womenPerfumes = [
    {
      id: 1,
      name: "Miss Dior",
      price: "ksh 1300",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    },
    {
      id: 2,
      name: "Chanel No. 5",
      price: "ksh 2000",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f"
    },
    {
      id: 3,
      name: "YSL Black Opium",
      price: "ksh 1400",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
    }
  ];

  return (
    <>
    <div
  className="collection-banner"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('https://images.unsplash.com/photo-1496747611176-843222e1e57c')"
  }}
>
  Women's Collection
</div>
    <div className="products-page">
    

      <div className="product-grid">
        {womenPerfumes.map((perfume) => (
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
</>);
}

export default Women;