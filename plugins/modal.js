Element.prototype.appendAfter = function (element){
    element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []){
 if(buttons.length == 0){
   return document.createElement('div')
 }
 let wrap = document.createElement('div');
 wrap.classList.add('modal-footer');
 buttons.forEach(btn => {
   const $btn = document.createElement('button');
   $btn.textContent = btn.text;
   $btn.classList.add('btn');
   $btn.classList.add(`btn-${btn.type||'secondary'}`);
   $btn.onclick = btn.handler || noop;
   
   wrap.appendChild($btn)
 })

 return wrap
}

function _createModal(options){
    let modal = document.createElement('div');
    Default_Width =' 300 px';
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML("afterbegin",`
      <div class="modal-overlay" data-close = "true">
        <div class="modal-window" style =" width: ${options.width||Default_Width}">
          <div class="modal-header">
            <span class="modal-title">
             ${options.title|| 'Window'}
            </span>
            ${options.closable == true ? '<span class="modal-close" data-close = "true"> &times;</span>' : ''}
          </div>
          <div class="modal-body" data-content>
            ${options.content || ''}
          </div>
          
        </div>
      </div>
    `);
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));

    document.body.appendChild(modal);


    return modal;
}
$.modal = function (options){
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;
  const modal = {  
    open(){
      if(destroyed){
        return console.log('Modal is destroyed') ///Doesnt work
      }
      !closing && $modal.classList.add('open')
    },
    close(){
      closing = true; 
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(()=>{$modal.classList.remove('hide'); closing = false},ANIMATION_SPEED);
      if(typeof options.onClose === 'function'){
        options.onClose()
      }
    }
  }  	
  const listener = event => {
    console.log(event.target, event.target.dataset.close)
    if(event.target.dataset.close){ modal.close()}
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal,{
      destroy(){
        $modal.remove()
        $modal.removeEventListener('click', listener)
        let destroyed = true;
      },
      setContant(html){
        $modal.querySelector('[data-content]').innerHTML = html; 
      }
    })
}




