import React, {PureComponent} from 'react';
import {Table} from "semantic-ui-react";

export class ProductsOld extends PureComponent {

    state = {
        products: this.props.products,
        optionsName: [],
        filteredProducts: [],
        filterName: '',
    };

    componentDidMount() {
        const { products } = this.state;
        const allNames = products.map(product => product.name);
        const NewOptionsName = new Set(allNames);
        const filterName = localStorage.getItem('name');
        if (!filterName) {
            this.setState({optionsName: Array.from(NewOptionsName), filteredProducts: products});
        } else {
            this.setState({
                optionsName: Array.from(NewOptionsName),
                filteredProducts: products.filter(product => product.name === localStorage.name),
                filterName: localStorage.name,
            });
        }
    }

    handleChangeFilter = (event) => {
        const { products } = this.state;
        const value = event.target.value;
        let newFilteredProducts = [];
        if (!value) {
            localStorage.removeItem('name');
            newFilteredProducts = products;
        } else {
            localStorage.setItem('name', value);
            newFilteredProducts = products.filter(product => product.name === value);
        }
        this.setState({filteredProducts: newFilteredProducts, filterName: value});
    }

    render() {
        const { optionsName, filteredProducts, filterName } = this.state;
        return (
            <div>
                <div>
                    <select value={filterName || undefined} onChange={this.handleChangeFilter}>
                        <option key={'empty'} value=""/>
                        {optionsName.map(option => (
                            <option key={option}  value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <Table>
                    <tbody>
                        {filteredProducts.map(product => (
                            <Table.Row key={String(product.productId)}>
                                <Table.Cell>{product.productId}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.title}</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                            </Table.Row>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
