const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFileNames = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = ['eyes','storm','flower','egypt','butterfly'];
/* Looping through images */
for(let i = 0;i<imageFileNames.length;i++){
const newImage = document.createElement('img');
newImage.setAttribute('src', `images/${imageFileNames[i]}`);
newImage.setAttribute('alt', altText[i]);
thumbBar.appendChild(newImage);
newImage.addEventListener('click',function (){
    displayedImage.setAttribute('src',`images/${imageFileNames[i]}`);
    displayedImage.setAttribute('alt',altText[i]);
});
}
// thumbBar.addEventListener('click', myFunction);
// function myFunction(evt){
//     displayedImage.setAttribute('src',`images/${}`);
// }
/* Wiring up the Darken/Lighten button */
btn.addEventListener('click',function(e){
    const attribute = btn.getAttribute('class');
    if(btn.getAttribute('class') === 'dark'){
        btn.setAttribute('class','light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }else{
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});