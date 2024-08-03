import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddProduct = () => {
    const [product, setPRoduct] = useState({ title: '', img: '', desc: '', price: '',cate:'' });
    const [products, setPRoducts] = useState([]);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setPRoduct({ ...product, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log([...products]);
        if (product.title !== "" && product.img !== "" && product.desc !== "" && product.price !== "") {
            setPRoducts([...products, product])
            let res = await axios.post("http://localhost:3000/products", product)
        }
    }
    const getData = async () => {
        let res = await axios.get('http://localhost:3000/products');
        if (res) setPRoducts(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className='w-full flex justify-center align-middle' style={{ height: "80vh" }}>
                <form className='w-1/3 m-auto ' onSubmit={handleSubmit}>
                    <h1 className='text-center mb-5'>Add Products</h1>

                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <input type="text" value={product.title} name='title' onChange={handleInput} className="grow" placeholder="Title of the product" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <input type="url" value={product.img} name='img' onChange={handleInput} className="grow" placeholder="Image of the product" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <input type="text" value={product.desc} name='desc' onChange={handleInput} className="grow" placeholder="Description of the product" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <input type="number" value={product.price} name='price' onChange={handleInput} className="grow" placeholder="Price of the product" />
                    </label>
                    <select name='cate'defaultValue="none" onChange={handleInput} className="select select-bordered w-full max-w-xs">
                        <option disabled value="none">Select Category</option>
                        <option value="tech">Technology</option>
                        <option value="Grocery">Grocery</option>
                        <option value="toys">toys</option>
                    </select>
                    <input type="submit" value="Add Product" className='btn w-full' />
                </form>
            </div>
        </>
    )
}

export default AddProduct