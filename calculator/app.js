function App() {
  const menuList = [
    { id: 1, name: "김치찌개", price: 8000 },
    { id: 2, name: "제육볶음", price: 9000 },
    { id: 3, name: "된장찌개", price: 7000 },
    { id: 4, name: "비빔밥", price: 7500 },
  ];

  const [cart, setCart] = React.useState({});

  // 메뉴 추가
  const addToCart = item => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: (prev[item.id]?.qty || 0) + 1,
      }
    }));
  };

  // 수량 감소
  const decrease = id => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id].qty > 1) {
        updated[id].qty -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  // 총합 계산
  const total = Object.values(cart)
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toLocaleString();

  return (
    <div className="container">

      {/* 좌측 메뉴 */}
      <div className="menu">
        <h2>메뉴</h2>
        {menuList.map(item => (
          <div key={item.id} className="menu-item">
            <span>{item.name} ({item.price.toLocaleString()}원)</span>
            <button onClick={() => addToCart(item)}>추가</button>
          </div>
        ))}
      </div>

      {/* 우측 장바구니 */}
      <div className="cart">
        <h2>선택한 메뉴</h2>
        {Object.values(cart).length === 0 && <p>아직 선택한 메뉴 없음</p>}

        {Object.values(cart).map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x {item.qty}</span>
            <div>
              <button onClick={() => addToCart(item)}>+</button>
              <button onClick={() => decrease(item.id)}>-</button>
            </div>
          </div>
        ))}

        <hr />
        <h3>총 합계: {total}원</h3>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
