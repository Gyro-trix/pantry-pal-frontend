import Quill from 'quill';

function RTRecipeTest(){
    const options = {
        debug: 'info',
        modules: {
          toolbar: true,
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      }
    const quill = new Quill('#editor',options);

    return (
    <div id = "editor"></div>
)
}
export default RTRecipeTest