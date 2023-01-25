function swatch(color) {
    console.log('swatch', color);
    return (`$watch ${color}`);
}
// swatch('red');
// swatch('blue');

 // react memo example

 const createSwatch = () => {
    return (color) =>  {
        if(color === prev.color) {
            return prev.result;
        }
        prev.color = color;
        prev.result = swatch(color);
        return prev.result;
     }
 }
 const prev = {
    color: null,
    result: null
 };

 function rnSwatch(color) {
    if(color === prev.color) {
        return prev.result;
    }
    prev.color = color;
    prev.result = swatch(color);
    return prev.result;
 }
 const swatch1 = createSwatch();
 const swatch2 = createSwatch();

 swatch1('red');
 swatch1('blue');
 swatch2('red');
 swatch2('blue');
