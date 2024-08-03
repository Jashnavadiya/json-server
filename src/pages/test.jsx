import React, { useEffect } from 'react'
import './test.css'
const Test = () => {
   // external js: isotope.pkgd.js

// init Isotope
useEffect(()=>{
    var iso = new Isotope( '.grid', {
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
      });
      
      // filter functions
      var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function( itemElem ) {
          var number = itemElem.querySelector('.number').textContent;
          return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function( itemElem ) {
          var name = itemElem.querySelector('.name').textContent;
          return name.match( /ium$/ );
        }
      };
      
      // bind filter button click
      var filtersElem = document.querySelector('.filters-button-group');
      filtersElem.addEventListener( 'click', function( event ) {
        // only work with buttons
        if ( !matchesSelector( event.target, 'button' ) ) {
          return;
        }
        var filterValue = event.target.getAttribute('data-filter');
        // use matching filter function
        filterValue = filterFns[ filterValue ] || filterValue;
        iso.arrange({ filter: filterValue });
      });
      
      // change is-checked class on buttons
      var buttonGroups = document.querySelectorAll('.button-group');
      for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
        var buttonGroup = buttonGroups[i];
        radioButtonGroup( buttonGroup );
      }
      
      function radioButtonGroup( buttonGroup ) {
        buttonGroup.addEventListener( 'click', function( event ) {
          // only work with buttons
          if ( !matchesSelector( event.target, 'button' ) ) {
            return;
          }
          buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
          event.target.classList.add('is-checked');
        });
      }
},[])
  
  
    return (<>
        <h1>Isotope - filtering</h1>

<div className="button-group filters-button-group">
  <button className="button is-checked" data-filter="*">show all</button>
  <button className="button" data-filter=".metal">metal</button>
  <button className="button" data-filter=".transition">transition</button>
  <button className="button" data-filter=".alkali, .alkaline-earth">alkali and alkaline-earth</button>
  <button className="button" data-filter=":not(.transition)">not transition</button>
  <button className="button" data-filter=".metal:not(.transition)">metal but not transition</button>
  <button className="button" data-filter="numberGreaterThan50">number  50</button>
  <button className="button" data-filter="ium">name ends with &ndash;ium</button>
</div>

<div className="grid">
  <div className="element-item transition metal " data-category="transition">
    <h3 className="name">Mercury</h3>
    <p className="symbol">Hg</p>
    <p className="number">80</p>
    <p className="weight">200.59</p>
  </div>
 
</div>

    </>)
}

export default Test