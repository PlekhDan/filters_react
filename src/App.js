import './App.css';
import {Products} from "./components/Products";

const products = [
    {productId: 1, name: "Oleg", title: "Title 1", category: "01"},
    {productId: 2, name: "Mari", title: "Title 2", category: "01"},
    {productId: 3, name: "Oleg", title: "Title 3", category: "02"},
    {productId: 4, name: "Oleg", title: "Title 4", category: "02"},
    {productId: 5, name: "Mari", title: "Title 5", category: "01"},
    {productId: 6, name: "Mari", title: "Title 6", category: "01"},
    {productId: 7, name: "Oleg", title: "Title 7", category: "02"},
    {productId: 8, name: "Ann", title: "Title 8", category: "02"},
    {productId: 9, name: "Ann", title: "Title 9", category: "02"},
    {productId: 10, name: "Ann", title: "Title 10", category: "01"},
];

function App() {
    return (
        <div className="App">
            <h1>Hello!</h1>
            <Products products={products} />
        </div>
    );
}

export default App;
