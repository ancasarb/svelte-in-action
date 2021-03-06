import _ from 'lodash';
import './style.css';
import xmlData from './data.xml';
import csvData from './data.csv';
import printMe from './print.js';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
  
    element.appendChild(btn);

    console.log(xmlData);
    console.log(csvData);

    return element;
}

document.body.appendChild(component());
