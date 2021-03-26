const TogglePhrases = { 
    Collapse: 'Свернуть', 
    Expand: 'Развернуть' 
}; 

class ExpandableText { 
  constructor(elem, maxLength = 150) { 
    this.maxLength = maxLength; 
    this.elem = elem;  
    this.elemParent = elem.parentElement;
    this.originalText = elem.textContent;
    this.elemInnerHtml = elem.innerHTML;  
     
    this.isToggle = false; 
     
    this.toggleBtn = document.createElement('a'); 
    this.toggleBtn.textContent = TogglePhrases.Expand; 
    this.toggleBtn.addEventListener('click', () => this.toggle()); 
     
    this.elem.textContent = this._getShortText(); 
    this.elemParent.append(this.toggleBtn); 
  } 
   
  toggle() { 
    this.isToggle = !this.isToggle; 
     
    this.toggleBtn.textContent = this.isToggle 
      ? TogglePhrases.Collapse 
      : TogglePhrases.Expand; 
     
    this.elem.innerHTML = this.isToggle 
      ? this.elemInnerHtml 
      : this._getShortText(); 
     
      this.elemParent.append(this.toggleBtn); 
  } 
   
  _getShortText() { 
    return (this.originalText.slice(0, this.maxLength)) + '...'; 
  } 
} 