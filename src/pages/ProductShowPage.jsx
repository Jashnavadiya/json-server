import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ProductShow.css'
const ProductShowPage = () => {
    const [products, setPRoducts] = useState([]);
    const getData = async () => {
        let res = await axios.get('http://localhost:3000/products');
        if (res) setPRoducts(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {

        var iso = new Isotope('.gridd', {
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function (itemElem) {
                var number = itemElem.querySelector('.number').textContent;
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function (itemElem) {
                var name = itemElem.querySelector('.name').textContent;
                return name.match(/ium$/);
            }
        };

        // bind filter button click
        var filtersElem = document.querySelector('.filters-button-group');
        filtersElem.addEventListener('click', function (event) {
            // only work with buttons
            if (!matchesSelector(event.target, 'button')) {
                return;
            }
            var filterValue = event.target.getAttribute('data-filter');
            // use matching filter function
            filterValue = filterFns[filterValue] || filterValue;
            iso.arrange({ filter: filterValue });
        });

        // change is-checked class on buttons
        var buttonGroups = document.querySelectorAll('.button-group');
        for (var i = 0, len = buttonGroups.length; i < len; i++) {
            var buttonGroup = buttonGroups[i];
            radioButtonGroup(buttonGroup);
        }

        function radioButtonGroup(buttonGroup) {
            buttonGroup.addEventListener('click', function (event) {
                // only work with buttons
                if (!matchesSelector(event.target, 'button')) {
                    return;
                }
                buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                event.target.classList.add('is-checked');
            });
        }


    }, [products])

    return (
        <>
            <div className='flex'>
                <div className='w-2/12'>
                    <div className="button-group filters-button-group">
                        <button className="button is-checked" data-filter="*">show all</button>
                        <button className="button" data-filter=".tech">tech</button>
                        <button className="button" data-filter=".Grocery">Grocery</button>
                        <button className="button" data-filter=".toys">toys</button>

                    </div>
                </div>


                <div className='w-10/12 gridd ' style={{alignItems:"stretch",display:"flex"}}>
                    {
                        products.map((ele, i) => (
                            <div key={i} className={`element-item ${ele.cate} card bg-base-100 shadow-xl `} data-category={ele.cate}>
                                
                                    <figure>
                                        <img
                                            src={ele.img}
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{ele.title}</h2>
                                        <p>{ele.desc}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                
                            </div>
                            
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductShowPage