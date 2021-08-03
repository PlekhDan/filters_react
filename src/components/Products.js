import React, {PureComponent} from 'react';
import {Table} from "semantic-ui-react";


export class Products extends PureComponent {

    state = {
        products: this.props.products,
        optionsName: [],
        optionsCategory: [],
        filteredProducts: [],
        filterName: '',
        filterCategory: '',
    };

    componentDidMount() {
        const { products } = this.state;

        const allNames = products.map(product => product.name);
        const setOptionsName = new Set(allNames);
        const allCategory = products.map(product => product.category);
        const setOptionsCategory = new Set(allCategory);

        const filters = JSON.parse(localStorage.getItem('filters'));

        if (filters) {
            const keys = Object.keys(filters);
            this.setState({
                optionsName: Array.from(setOptionsName),
                optionsCategory: Array.from(setOptionsCategory),
                filteredProducts: products.filter(product => keys.every(key => product[key] === filters[key])),
                filterName: filters.name,
                filterCategory: filters.category,
            });
        } else {
            this.setState({
                optionsName: Array.from(setOptionsName),
                optionsCategory: Array.from(setOptionsCategory),
                filteredProducts: products,
            });
        }
    }

    handleChangeFilter = (event) => {
        const {products} = this.state;
        const selected = event.target.name;
        const value = event.target.value;

        let newFilteredProducts = [];
        let filters = JSON.parse(localStorage.getItem('filters'));

        if (value) {
            if (!filters) filters = {};
            filters[selected] = value;
        } else {
            delete filters[selected];
        }
        const strFilters = JSON.stringify(filters);
        localStorage.setItem('filters', strFilters);
        const keys = Object.keys(filters);
        newFilteredProducts = products.filter(product => keys.every(key => product[key] === filters[key]));
        this.setState({
            filteredProducts: newFilteredProducts,
            filterName: filters.name,
            filterCategory: filters.category,
        });
    }

    render() {
        const { optionsName, optionsCategory, filteredProducts, filterName, filterCategory } = this.state;
        return (
            <div>
                <div onChange={this.handleChangeFilter}>
                    <select value={filterName || undefined} name="name">
                        <option key={'name_empty'} value=""/>
                        {optionsName.map(option => (
                            <option key={option}  value={option}>{option}</option>
                        ))}
                    </select>
                    <select value={filterCategory || undefined} name="category">
                        <option key={'category_empty'} value=""/>
                        {optionsCategory.map(category => (
                            <option key={category}  value={category}>{category}</option>
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
