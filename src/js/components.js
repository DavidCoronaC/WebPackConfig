import '../css/components.css';
import webPackImg from '../assets/img/img.jpeg';

export const saludar = (nombre) => {

    console.log('Hola desde js');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}!!!`;

    document.body.append(h1);


    const img = document.createElement('img');
    img.src = webPackImg;
    document.body.append(img);


}