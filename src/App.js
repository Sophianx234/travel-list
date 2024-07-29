import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);
  const [sort , setSort] = useState('');
  function handleSort(){

    if(sort === "input"){
      const sorted = items.sort(item=>item.id-)

    }



  }
  function handleToggle(id){
    setItems(items=>items.map(item=>item.id===id ? {...item, packed: !item.packed}: item))
  }

  function handleDelete(id){
    setItems(items=>items.filter(item=>item.id !== id))
    
  }

  return (
    <div className="container">
      <Navbar />
      <FormItem setItems={setItems} items={items} />
      <PackagingList items={items} setItems={setItems} onHandleToggle={handleToggle} onDelete={handleDelete} sort={sort} setSort={setSort} />
      <Footer items={items} />
    </div>
  );
}

function Navbar() {
  return (
    <nav>
      <h1 className="heading-primary">🌴 Far Away🎒</h1>
    </nav>
  );
}

function FormItem({ items, setItems }) {
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!quantity) return
    if(!description) return

    const newItem = {
      description,
      quantity,
      id: Date.now(),
      packed: false,
    };
    setItems((items) => [...items, newItem]);
    setDescription("");
    setQuantity("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="question">What do you need for your 😍trip?</p>
      <select
        value={quantity}
        onChange={(e) => setQuantity((quantity) => +e.target.value)}
      >
        <option>select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input
        type="text"
        className="search"
        value={description}
        onChange={(e) => setDescription((description) => e.target.value)}
        placeholder="Search..."
      />
      <button className="btn">Add</button>
    </form>
  );
}

function PackagingList({ items, setItems, onHandleToggle, onDelete,sort, setSort }) {
  function handleClearList() {
    setItems((items) => []);
  }
  return (
    <section className="section-items">
      <ul className="package-list">
        {items.map((item) => (
          <Item item={item} onHandleToggle={onHandleToggle} key={item.id} onDelete={onDelete} />
        ))}
      </ul>

      <div className="sorting-items">
        <select value={sort} onChange={(e)=>setSort(sort=>e.target.value)}>
          <option value="input">Sort by Input order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button className="clear-all" onClick={handleClearList}>
          Clear List
        </button>
      </div>
    </section>
  );
}

function Item({ item, onHandleToggle, onDelete }) {

  return (
    <li className="list-item">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          value={item.packed} onChange={()=>onHandleToggle(item.id)}/>
        <p className={item.packed?"strike":null}>{item.quantity} {item.description}</p>
        
        <button onClick={()=>onDelete(item.id)}>❌</button>
      </label>
    </li>
  );
}

function Footer({ items }) {
  return (
    <footer>
      <p className="footer-text">
        {" "}
        {items.length
          ? "You have got everything Ready to go ✈️"
          : "Start adding some items to your packing list 🚀"}
      </p>
    </footer>
  );
}
